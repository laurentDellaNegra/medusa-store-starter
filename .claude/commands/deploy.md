# Production Deployment

You are helping with production deployment of the Medusa Store Starter. This is a fully dockerized stack managed by `docker-compose.prod.yml` at the repo root.

## Architecture

5 services: Postgres, Redis, Medusa backend, Astro storefront, Caddy (reverse proxy with auto HTTPS).

```
              :80/:443  Caddy (reverse proxy)
                         |
            +------------+------------+
            |                         |
  /admin, /admin-app,          everything else
  /store, /auth,
  /hooks, /health
            |                         |
   Medusa backend :9000    Astro storefront :8001
            |
   Postgres + Redis
```

- Container prefix: `medusa-prod-*`
- Volume prefix: `medusa_prod_*`
- Network: `medusa-prod`

## Key files

- `docker-compose.prod.yml` — service definitions
- `docker/Caddyfile` — Caddy reverse proxy routes
- `apps/backend/Dockerfile` — multi-stage Medusa build (uses `.medusa/server/` standalone output)
- `apps/storefront-astro/Dockerfile` — multi-stage Astro SSR build (`node dist/server/entry.mjs`)
- `.env.production` — production secrets (gitignored), see `.env.production.example`
- `deploy.sh` — interactive deployment script

## Deploy commands

```bash
# Interactive first-time deploy (prompts for domain, credentials, secrets)
./deploy.sh

# Rebuild images and restart (after code changes)
./deploy.sh --rebuild

# Destroy everything and redeploy from scratch (DESTRUCTIVE — removes all data)
./deploy.sh --nuke
```

### Manual docker compose commands

All prod commands use this prefix:
```bash
docker compose -f docker-compose.prod.yml --env-file .env.production
```

```bash
# Build all images
docker compose -f docker-compose.prod.yml --env-file .env.production build

# Start all services
docker compose -f docker-compose.prod.yml --env-file .env.production up -d

# Seed database (first time only)
docker compose -f docker-compose.prod.yml --env-file .env.production exec backend npx medusa exec ./src/scripts/seed.js

# Get publishable API key
docker compose -f docker-compose.prod.yml --env-file .env.production exec backend npx medusa exec ./src/scripts/get-publishable-key.js

# Rebuild only storefront (after updating publishable key)
docker compose -f docker-compose.prod.yml --env-file .env.production build storefront
docker compose -f docker-compose.prod.yml --env-file .env.production up -d storefront

# Create admin user
docker compose -f docker-compose.prod.yml --env-file .env.production exec backend npx medusa user -e admin@example.com -p your-password

# Stop everything
docker compose -f docker-compose.prod.yml --env-file .env.production down
```

## Caddy routing

All these paths route to `backend:9000`:
- `/admin*` — Medusa admin API routes
- `/admin-app*` — Admin dashboard SPA
- `/store*` — Store API
- `/auth*` — Auth API
- `/hooks*` — Webhooks
- `/health*` — Health check
- `/.well-known*` — ACME challenge (Let's Encrypt)

Everything else routes to `storefront:8001`.

## Environment variables (.env.production)

| Variable | Type | Description |
|---|---|---|
| `DOMAIN` | runtime | Domain name or `localhost` for IP-only |
| `POSTGRES_USER` / `POSTGRES_PASSWORD` | runtime | Database credentials |
| `JWT_SECRET` / `COOKIE_SECRET` | runtime | Auth secrets (generate with `openssl rand -hex 32`) |
| `STORE_CORS` / `ADMIN_CORS` / `AUTH_CORS` | runtime | CORS origins (your domain with protocol) |
| `MEDUSA_BACKEND_URL` | **build-time** | Baked into admin SPA during `medusa build` |
| `PUBLIC_MEDUSA_PUBLISHABLE_KEY` | **build-time** | Baked into storefront during Astro build |
| `PUBLIC_BASE_URL` | **build-time** | Public storefront URL |
| `PUBLIC_DEFAULT_REGION` | **build-time** | Default region code |
| `PUBLIC_STRIPE_KEY` | **build-time** | Stripe publishable key (optional) |

## Critical gotchas (learned from real deployments)

1. **Admin path**: Dashboard is at `/admin-app` (configured in medusa-config.ts). `/admin` is reserved for API routes and CANNOT be used for the dashboard.

2. **`MEDUSA_BACKEND_URL` is build-time**: It gets baked into the admin SPA during `medusa build`. If you change the domain, you MUST rebuild the backend image.

3. **Health endpoint**: Returns `OK` (uppercase). Use `grep -qi` not `grep -q "ok"` for case-insensitive matching in scripts.

4. **Nuke mode**: `docker system prune` only removes **stopped** containers. You must `docker stop $(docker ps -q)` first to catch running containers from previous deploys.

5. **Postgres password persistence**: `POSTGRES_PASSWORD` env var only takes effect on **first initialization** of the volume. If the volume persists with an old password, the new password won't work. Must `docker compose down -v` to remove the volume first.

6. **Port 80 conflicts**: After nuke, check `sudo lsof -i :80` — Docker proxy processes from previous runs may still hold the port.

7. **Caddy routing completeness**: All Medusa backend paths must be explicitly listed in the Caddyfile. If you add a new API prefix, add it to Caddy too.

8. **Seed data countries**: Default countries list is in `seed.ts`. Add countries before deploying (e.g., `ch` for Switzerland). A missing country causes redirect to the first available region.

## Verification checklist

After deployment, verify:
- [ ] `https://yourdomain.com` — storefront loads
- [ ] `https://yourdomain.com/admin-app` — admin dashboard loads
- [ ] `https://yourdomain.com/health` — returns `OK`
- [ ] Admin login works with created credentials
- [ ] Products visible on storefront (publishable key is correct)
