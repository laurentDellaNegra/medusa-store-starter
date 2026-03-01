# Production Debugging & Logs

You are helping debug the production Docker deployment. All commands use the `docker-compose.prod.yml` compose file.

## Command prefix

All production docker compose commands use:
```bash
docker compose -f docker-compose.prod.yml --env-file .env.production
```

## Service names

| Service | Container | Internal port |
|---|---|---|
| `postgres` | `medusa-prod-postgres` | 5432 |
| `redis` | `medusa-prod-redis` | 6379 |
| `backend` | `medusa-prod-backend` | 9000 |
| `storefront` | `medusa-prod-storefront` | 8001 |
| `caddy` | `medusa-prod-caddy` | 80, 443 |

## Viewing logs

```bash
# Follow all service logs
docker compose -f docker-compose.prod.yml --env-file .env.production logs -f

# Follow a specific service
docker compose -f docker-compose.prod.yml --env-file .env.production logs -f backend
docker compose -f docker-compose.prod.yml --env-file .env.production logs -f storefront
docker compose -f docker-compose.prod.yml --env-file .env.production logs -f caddy
docker compose -f docker-compose.prod.yml --env-file .env.production logs -f postgres

# Last N lines
docker compose -f docker-compose.prod.yml --env-file .env.production logs --tail 100 backend

# Since a specific time
docker compose -f docker-compose.prod.yml --env-file .env.production logs --since 1h backend
```

## Health checks

```bash
# Check service status
docker compose -f docker-compose.prod.yml --env-file .env.production ps

# Medusa health endpoint (returns "OK" uppercase)
curl -s http://localhost/health
# Or from outside: curl -s https://yourdomain.com/health

# Postgres health
docker exec medusa-prod-postgres pg_isready -U postgres -d medusa-store

# Redis health
docker exec medusa-prod-redis redis-cli ping
```

## Restarting services

```bash
# Restart a single service
docker compose -f docker-compose.prod.yml --env-file .env.production restart backend
docker compose -f docker-compose.prod.yml --env-file .env.production restart storefront

# Stop and start (full cycle)
docker compose -f docker-compose.prod.yml --env-file .env.production stop backend
docker compose -f docker-compose.prod.yml --env-file .env.production start backend

# Stop everything
docker compose -f docker-compose.prod.yml --env-file .env.production down

# Stop and remove volumes (DESTRUCTIVE — deletes all data)
docker compose -f docker-compose.prod.yml --env-file .env.production down -v
```

## Inspecting containers

```bash
# Shell into backend container
docker exec -it medusa-prod-backend sh

# Shell into storefront container
docker exec -it medusa-prod-storefront sh

# Connect to Postgres
docker exec -it medusa-prod-postgres psql -U postgres -d medusa-store

# Redis CLI
docker exec -it medusa-prod-redis redis-cli

# Check container resource usage
docker stats medusa-prod-backend medusa-prod-storefront medusa-prod-postgres medusa-prod-redis medusa-prod-caddy
```

## Running Medusa commands in production

```bash
# Run database migrations
docker compose -f docker-compose.prod.yml --env-file .env.production exec backend npx medusa db:migrate

# Create admin user
docker compose -f docker-compose.prod.yml --env-file .env.production exec backend npx medusa user -e admin@example.com -p your-password

# Run seed script
docker compose -f docker-compose.prod.yml --env-file .env.production exec backend npx medusa exec ./src/scripts/seed.js

# Get publishable API key
docker compose -f docker-compose.prod.yml --env-file .env.production exec backend npx medusa exec ./src/scripts/get-publishable-key.js
```

## Common issues

### Backend not starting
1. Check logs: `docker compose -f docker-compose.prod.yml --env-file .env.production logs backend`
2. Verify Postgres and Redis are healthy: `docker compose -f docker-compose.prod.yml --env-file .env.production ps`
3. Check `.env.production` has all required variables (JWT_SECRET, COOKIE_SECRET, POSTGRES_PASSWORD)

### Storefront showing errors
1. Check if `PUBLIC_MEDUSA_PUBLISHABLE_KEY` is set correctly in `.env.production`
2. Remember this is a **build-time** variable — must rebuild storefront image after changing it
3. Check storefront logs for SSR errors

### Caddy / HTTPS issues
1. Check Caddy logs: `docker compose -f docker-compose.prod.yml --env-file .env.production logs caddy`
2. Verify `DOMAIN` in `.env.production` matches your actual domain
3. For Let's Encrypt: ensure ports 80 and 443 are open and DNS points to the server
4. Check `docker/Caddyfile` for routing rules

### Admin dashboard not loading
1. Verify `MEDUSA_BACKEND_URL` was set correctly at **build time**
2. This value is baked into the admin SPA — must rebuild backend image to change it
3. Dashboard is at `/admin-app`, NOT `/admin` (which is reserved for API routes)
