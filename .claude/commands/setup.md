# Project Setup & Onboarding

You are helping set up the Medusa Store Starter project for local development. Follow these steps in order.

## Prerequisites

- Node.js >= 20
- pnpm >= 9 (`npm install -g pnpm` or `corepack enable`)
- Docker & Docker Compose (for Postgres + Redis)

## Step-by-step setup

### 1. Install dependencies

```bash
pnpm install
```

If you see `TAR_ENTRY_ERROR` warnings, run `pnpm store prune` then reinstall.

### 2. Configure backend environment

```bash
cp apps/backend/.env.example apps/backend/.env
```

Default `.env` contents (works out of the box for local dev):
```env
STORE_CORS=http://localhost:8000,https://docs.medusajs.com
ADMIN_CORS=http://localhost:5173,http://localhost:9000,https://docs.medusajs.com
AUTH_CORS=http://localhost:5173,http://localhost:9000,https://docs.medusajs.com
REDIS_URL=redis://localhost:6379
JWT_SECRET=supersecret
COOKIE_SECRET=supersecret
DATABASE_URL=postgres://postgres:postgres@localhost:5432/medusa-store
```

### 3. Configure storefront environment

**Next.js storefront** (`apps/storefront-next/`):
```bash
cp apps/storefront-next/.env.local.example apps/storefront-next/.env.local
```
Key variables:
- `MEDUSA_BACKEND_URL=http://localhost:9000`
- `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=` (set after seeding)
- `NEXT_PUBLIC_BASE_URL=http://localhost:8000`
- `NEXT_PUBLIC_DEFAULT_REGION=us`

**Astro storefront** (`apps/storefront-astro/`):
Create `apps/storefront-astro/.env.local` with:
```env
MEDUSA_BACKEND_URL=http://localhost:9000
PUBLIC_MEDUSA_PUBLISHABLE_KEY=<set-after-seeding>
PUBLIC_BASE_URL=http://localhost:8001
PUBLIC_DEFAULT_REGION=us
```

### 4. Start infrastructure (Postgres + Redis)

```bash
pnpm nx run @medusa-store-starter/backend:infra:up
```

This starts:
- Postgres 15 on port 5432 (container: `medusa_postgres`)
- Redis 7 on port 6379 (container: `medusa_redis`)

### 5. Run database migrations

```bash
pnpm nx run @medusa-store-starter/backend:db:migrate
```

### 6. Seed the database

```bash
pnpm nx run @medusa-store-starter/backend:seed
```

This creates: a region (Europe), demo products (T-shirt, Sweatshirt, Sweatpants, Shorts), sales channel, publishable API key, stock location, shipping options, and inventory levels.

### 7. Create an admin user

```bash
cd apps/backend && npx medusa user -e admin@medusajs.com -p supersecret
```

### 8. Get the publishable API key

1. Start the backend: `pnpm nx run @medusa-store-starter/backend:dev`
2. Open admin dashboard: http://localhost:9000/app
3. Log in with admin credentials
4. Go to **Settings > API Key Management > Publishable Keys**
5. Copy the "Webshop" key
6. Paste into:
   - `apps/storefront-next/.env.local` as `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY`
   - `apps/storefront-astro/.env.local` as `PUBLIC_MEDUSA_PUBLISHABLE_KEY`

### 9. Start development

```bash
# Start everything (infra + backend + Astro storefront)
pnpm run dev

# Or start individually:
pnpm nx run @medusa-store-starter/backend:dev          # port 9000
pnpm nx run @medusa-store-starter/storefront-next:dev   # port 8000
pnpm nx run @medusa-store-starter/storefront-astro:dev  # port 8001
```

## Verification

- Backend API: http://localhost:9000/health (should return `OK`)
- Admin dashboard: http://localhost:9000/app
- Next.js storefront: http://localhost:8000
- Astro storefront: http://localhost:8001

## Critical dependency notes

- Root `package.json` has `react`/`react-dom` overrides to `19.0.4` — do NOT remove (resolves React 18 vs 19 conflict)
- Backend has `ajv@^8.18.0` as devDependency — do NOT remove (Medusa needs `ajv/dist/core` from v8)
- Do NOT use `--legacy-peer-deps` — the React overrides handle peer conflicts
