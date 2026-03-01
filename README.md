# Medusa Store Starter

E-commerce platform built with [Medusa](https://medusajs.com) (backend), [Next.js](https://nextjs.org) and [Astro](https://astro.build) (storefronts), managed as an [Nx](https://nx.dev) monorepo.

## Architecture

```
medusa-store-starter/
├── apps/
│   ├── backend/          # Medusa v2 backend + admin dashboard
│   ├── storefront-next/  # Next.js 15 storefront
│   ├── storefront-astro/  # Astro 5 storefront (Medusa-connected)
│   └── storefront2-astro/ # Astro 5 storefront (standalone demo)
├── package.json          # Root workspace config
├── pnpm-workspace.yaml   # pnpm workspace config
└── nx.json               # Nx configuration
```

- **Package manager**: pnpm with workspaces (`apps/*`)
- **Orchestration**: Nx for task running and caching
- **Backend**: Medusa v2.13.1 — runs natively on the host
- **Storefront (Next.js)**: Next.js 15 with React 19, Tailwind CSS, Medusa JS SDK
- **Storefront (Astro)**: Astro 5 with React 19, Panda CSS, Park UI, Medusa JS SDK
- **Storefront 2 (Astro)**: Astro 5, minimal standalone demo (no backend, localStorage cart)
- **Infrastructure**: Postgres and Redis run in Docker via docker-compose

## Prerequisites

- [Node.js](https://nodejs.org) >= 20
- [pnpm](https://pnpm.io) >= 9 (install with `npm install -g pnpm` or `corepack enable`)
- [Docker](https://www.docker.com) & Docker Compose (for Postgres + Redis)

## Getting started

### 1. Clone and install dependencies

```bash
git clone <your-repo-url> medusa-store-starter
cd medusa-store-starter
pnpm install
```

### 2. Configure environment variables

**Backend** — copy and edit `apps/backend/.env`:

```bash
cp apps/backend/.env.example apps/backend/.env
```

```env
STORE_CORS=http://localhost:8000,https://docs.medusajs.com
ADMIN_CORS=http://localhost:5173,http://localhost:9000,https://docs.medusajs.com
AUTH_CORS=http://localhost:5173,http://localhost:9000,https://docs.medusajs.com
REDIS_URL=redis://localhost:6379
JWT_SECRET=supersecret
COOKIE_SECRET=supersecret
DATABASE_URL=postgres://postgres:postgres@localhost:5432/medusa-store
```

**Storefront (Next.js)** — copy and edit `apps/storefront-next/.env.local`:

```bash
cp apps/storefront-next/.env.local.example apps/storefront-next/.env.local
```

```env
MEDUSA_BACKEND_URL=http://localhost:9000
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=<your-publishable-key>
NEXT_PUBLIC_BASE_URL=http://localhost:8000
NEXT_PUBLIC_DEFAULT_REGION=us
```

**Storefront (Astro)** — copy and edit `apps/storefront-astro/.env.local`:

```bash
cp apps/storefront-astro/.env.local.example apps/storefront-astro/.env.local
```

```env
MEDUSA_BACKEND_URL=http://localhost:9000
PUBLIC_MEDUSA_PUBLISHABLE_KEY=<your-publishable-key>
PUBLIC_BASE_URL=http://localhost:8001
PUBLIC_DEFAULT_REGION=us
```

> You'll get the publishable key from the Medusa admin dashboard after setup (Settings > API Key Management > Publishable Keys).

### 3. Start infrastructure

Start Postgres and Redis containers:

```bash
pnpm nx run @medusa-store-starter/backend:infra:up
```

### 4. Run database migrations

```bash
pnpm nx run @medusa-store-starter/backend:db:migrate
```

### 5. Create an admin user

```bash
cd apps/backend && npx medusa user -e admin@medusajs.com -p supersecret
```

### 6. Seed the database

This populates the store with demo data: a region (Europe), products (T-shirt, Sweatshirt, Sweatpants, Shorts), sales channel, publishable API key, stock location, shipping options, and inventory levels.

```bash
pnpm nx run @medusa-store-starter/backend:seed
```

### 7. Configure the storefront publishable key

The seed script creates a publishable API key called "Webshop". Retrieve it and add it to the storefront env:

1. Start the backend: `pnpm nx run @medusa-store-starter/backend:dev`
2. Open the admin dashboard at http://localhost:9000/app and log in
3. Go to **Settings > API Key Management > Publishable Keys** and copy the "Webshop" key
4. Paste it into `apps/storefront-next/.env.local` as `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` and/or into `apps/storefront-astro/.env.local` as `PUBLIC_MEDUSA_PUBLISHABLE_KEY`

### 8. Start development servers

```bash
pnpm run dev
```

This starts the Medusa backend (port 9000) and the Astro storefront (port 8001). To also run the Next.js storefront, start it separately:

```bash
pnpm nx run @medusa-store-starter/storefront-next:dev
```

## Commands

| Command                                                     | Description                          |
| ----------------------------------------------------------- | ------------------------------------ |
| `pnpm run dev`                                              | Start infra + both dev servers       |
| `pnpm nx run @medusa-store-starter/backend:infra:up`        | Start Postgres + Redis               |
| `pnpm nx run @medusa-store-starter/backend:infra:down`      | Stop Postgres + Redis                |
| `pnpm nx run @medusa-store-starter/backend:dev`             | Start Medusa dev server (port 9000)  |
| `pnpm nx run @medusa-store-starter/storefront-next:dev`     | Start Next.js storefront (port 8000) |
| `pnpm nx run @medusa-store-starter/storefront-astro:dev`    | Start Astro storefront (port 8001)   |
| `pnpm nx run @medusa-store-starter/backend:build`           | Build Medusa backend                 |
| `pnpm nx run @medusa-store-starter/storefront-next:build`   | Build Next.js storefront             |
| `pnpm nx run @medusa-store-starter/storefront-astro:build`  | Build Astro storefront               |
| `pnpm nx run @medusa-store-starter/backend:db:migrate`      | Run database migrations              |
| `pnpm nx run @medusa-store-starter/backend:seed`            | Seed the database                    |

### Storefront 2 (Astro) — Testing

| Command                                                       | Description                          |
| ------------------------------------------------------------- | ------------------------------------ |
| `cd apps/storefront2-astro && pnpm test:e2e`                  | Run E2E + visual regression tests    |
| `cd apps/storefront2-astro && pnpm test:e2e:ui`               | Interactive Playwright UI mode       |
| `cd apps/storefront2-astro && pnpm test:e2e:update`           | Update visual regression baselines   |

## Infrastructure

Docker is used only for infrastructure services, not for the application itself:

| Service  | Container       | Port |
| -------- | --------------- | ---- |
| Postgres | medusa_postgres | 5432 |
| Redis    | medusa_redis    | 6379 |

The docker-compose file is at `apps/backend/docker-compose.yml`.

## Production deployment (Docker)

The project includes a full dockerized production setup with 5 services: Postgres, Redis, Medusa backend, Astro storefront, and Caddy as reverse proxy with automatic HTTPS.

```
                  ┌─────────────────┐
       :80/:443   │  Caddy          │  (reverse proxy + auto HTTPS)
                  └────────┬────────┘
                           │
            ┌──────────────┼──────────────┐
            │                             │
   /admin, /admin-app,           everything else
   /store, /auth,
   /hooks, /health
            │                             │
 ┌──────────▼──────┐  ┌──────────────────▼┐
 │ Medusa backend  │  │ Astro storefront  │
 │ :9000           │  │ :8001             │
 └──────┬──────────┘  └───────────────────┘
        │
 ┌──────▼──────┐  ┌───────────────┐
 │ Postgres    │  │ Redis         │
 └─────────────┘  └───────────────┘
```

All containers are prefixed `medusa-prod-*` to avoid conflicts with local dev containers.

### Prerequisites

- A VPS with Docker and Docker Compose installed (4GB RAM / 2 vCPU recommended)
- A domain name pointed to the VPS IP (optional — works with IP-only on port 80)

### Deploy

#### Quick deploy (automated, interactive)

Clone the repo on your VPS, then run the deploy script:

```bash
git clone <your-repo-url> medusa-store-starter
cd medusa-store-starter
./deploy.sh
```

The script will interactively prompt you for:

- **Domain** — your domain name (e.g., `example.com`) or `localhost` for IP-only testing
- **Admin credentials** — email and password for the admin dashboard
- **Database credentials** — Postgres user and password (auto-generated if skipped)
- **Storefront config** — default region, optional Stripe publishable key

It then automatically:

1. Generates `.env.production` with secure random secrets (JWT, cookie, DB password)
2. Configures CORS origins and base URL based on your domain
3. Builds all Docker images
4. Starts the services and waits for the backend to be healthy
5. Seeds the database with demo data
6. Extracts the publishable API key and rebuilds the storefront with it
7. Creates the admin user

Other deploy modes:

```bash
./deploy.sh --rebuild    # Rebuild images and restart (after code changes)
./deploy.sh --nuke       # Destroy everything and redeploy from scratch
./deploy.sh --help       # Show usage
```

If `.env.production` already exists, the script asks whether to reuse the existing config or reconfigure from scratch.

#### Manual deploy (step by step)

<details>
<summary>Click to expand manual steps</summary>

**1. Clone the repo on your VPS:**

```bash
git clone <your-repo-url> medusa-store-starter
cd medusa-store-starter
```

**2. Create your production env file:**

```bash
cp .env.production.example .env.production
```

Edit `.env.production` and fill in:

- `DOMAIN` — your domain (e.g., `example.com`) or `localhost` for IP-only
- `POSTGRES_PASSWORD` — strong database password
- `JWT_SECRET` / `COOKIE_SECRET` — random strings (at least 32 chars each)
- `STORE_CORS` / `ADMIN_CORS` / `AUTH_CORS` — your domain with protocol (e.g., `https://example.com`)
- `MEDUSA_BACKEND_URL` — your domain with protocol (e.g., `https://example.com`), required for the admin dashboard to work in production
- `PUBLIC_MEDUSA_PUBLISHABLE_KEY` — leave the placeholder for now, you'll update it after seeding
- `PUBLIC_BASE_URL` — the public URL of the storefront (e.g., `https://example.com`)
- `PUBLIC_STRIPE_KEY` — your Stripe publishable key (optional)

> **Tip:** Generate secrets with `openssl rand -hex 32`
> The example file ships with working demo values — just `cp` it and go for a quick test.

**3. Build and start:**

```bash
docker compose -f docker-compose.prod.yml --env-file .env.production build
docker compose -f docker-compose.prod.yml --env-file .env.production up -d
```

The first startup will automatically run database migrations.

**4. Seed the database (first time only):**

```bash
docker compose -f docker-compose.prod.yml --env-file .env.production exec backend npx medusa exec ./src/scripts/seed.js
```

**5. Get the publishable API key and rebuild the storefront:**

The seed script creates a publishable API key. Retrieve it:

```bash
docker compose -f docker-compose.prod.yml --env-file .env.production exec backend npx medusa exec ./src/scripts/get-publishable-key.js
```

Copy the key and update `PUBLIC_MEDUSA_PUBLISHABLE_KEY` in `.env.production`, then rebuild only the storefront:

```bash
docker compose -f docker-compose.prod.yml --env-file .env.production build storefront
docker compose -f docker-compose.prod.yml --env-file .env.production up -d storefront
```

**6. Create an admin user:**

```bash
docker compose -f docker-compose.prod.yml --env-file .env.production exec backend npx medusa user -e admin@example.com -p your-password
```

**7. Verify:**

- Storefront: `https://yourdomain.com` (or `http://your-ip`)
- Admin dashboard: `https://yourdomain.com/admin-app`

</details>

### Useful commands

```bash
# Rebuild after code changes
./deploy.sh --rebuild

# Nuke everything and start fresh (destroys ALL data, images, volumes, and build cache!)
./deploy.sh --nuke

# View logs
docker compose -f docker-compose.prod.yml --env-file .env.production logs -f backend
docker compose -f docker-compose.prod.yml --env-file .env.production logs -f storefront

# Restart a service
docker compose -f docker-compose.prod.yml --env-file .env.production restart backend

# Stop everything
docker compose -f docker-compose.prod.yml --env-file .env.production down
```

### Important notes

- **Admin dashboard path**: The admin UI is served at `/admin-app` (not `/admin`). The `/admin` path is reserved by Medusa for API routes.
- **`MEDUSA_BACKEND_URL`**: This is a **build-time** variable — it gets baked into the admin SPA during `medusa build`. If you change the domain, you must rebuild the backend image.
- **Health endpoint**: The Medusa health check is at `/health` and returns `OK` (uppercase).
- **Nuke mode**: `--nuke` stops all running containers (not just compose-managed ones), then runs `docker system prune -a --volumes -f` and `docker builder prune -a -f`. It does **not** stop system services (nginx, apache) that may occupy port 80.

### Migrating to other platforms

Each app has its own Dockerfile, making it easy to migrate:

- **Railway / Fly.io / Render**: deploy each service individually, use their managed Postgres and Redis, drop the compose file
- **Kubernetes**: reuse the same Dockerfiles, replace compose with k8s manifests

## Dependency notes

pnpm workspaces hoist dependencies to the root `node_modules`. Two overrides in the root `package.json` resolve conflicts:

- `react` / `react-dom` overridden to `19.0.4` — Medusa admin expects React 18, storefront uses React 19. The override is safe because Medusa's admin uses its own vite bundler.
- `ajv` pinned to `^8.18.0` in backend's devDependencies — Medusa requires `ajv/dist/core` which only exists in ajv v8.
