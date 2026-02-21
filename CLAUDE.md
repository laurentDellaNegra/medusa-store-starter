<!-- nx configuration start-->
<!-- Leave the start & end comments to automatically receive updates. -->

# General Guidelines for working with Nx

- For navigating/exploring the workspace, invoke the `nx-workspace` skill first - it has patterns for querying projects, targets, and dependencies
- When running tasks (for example build, lint, test, e2e, etc.), always prefer running the task through `nx` (i.e. `nx run`, `nx run-many`, `nx affected`) instead of using the underlying tooling directly
- Prefix nx commands with the workspace's package manager (e.g., `pnpm nx build`, `npm exec nx test`) - avoids using globally installed CLI
- You have access to the Nx MCP server and its tools, use them to help the user
- For Nx plugin best practices, check `node_modules/@nx/<plugin>/PLUGIN.md`. Not all plugins have this file - proceed without it if unavailable.
- NEVER guess CLI flags - always check nx_docs or `--help` first when unsure

## Scaffolding & Generators

- For scaffolding tasks (creating apps, libs, project structure, setup), ALWAYS invoke the `nx-generate` skill FIRST before exploring or calling MCP tools

## When to use nx_docs

- USE for: advanced config options, unfamiliar flags, migration guides, plugin configuration, edge cases
- DON'T USE for: basic generator syntax (`nx g @nx/react:app`), standard commands, things you already know
- The `nx-generate` skill handles generator discovery internally - don't call nx_docs just to look up generator syntax

<!-- nx configuration end-->

# Project: Medusa Store Starter

Nx monorepo with pnpm workspaces. Three apps:

- `@medusa-store-starter/backend` at `apps/backend/` — Medusa v2.13.1 (runs natively on host)
- `@medusa-store-starter/storefront-next` at `apps/storefront-next/` — Next.js 15, React 19
- `@medusa-store-starter/storefront-astro` at `apps/storefront-astro/` — Astro 5, React 19, Panda CSS, Park UI

## Key commands

- `pnpm run dev` — starts infra (Postgres + Redis via Docker), then both dev servers in parallel
- `pnpm nx run @medusa-store-starter/backend:infra:up` / `infra:down` — manage Postgres + Redis containers
- `pnpm nx run @medusa-store-starter/backend:dev` — Medusa dev server on port 9000
- `pnpm nx run @medusa-store-starter/storefront-next:dev` — Next.js storefront dev server on port 8000
- `pnpm nx run @medusa-store-starter/storefront-astro:dev` — Astro storefront dev server on port 8001
- `pnpm nx run @medusa-store-starter/backend:build` — build Medusa backend
- `pnpm nx run @medusa-store-starter/backend:seed` — seed database
- `pnpm nx run @medusa-store-starter/backend:db:migrate` — run database migrations

## Monorepo dependency rules

Root `package.json` has critical overrides — do NOT remove:

- `react` / `react-dom` overridden to `19.0.4` (resolves React 18 vs 19 conflict between backend and storefront)

Backend `package.json` has `ajv@^8.18.0` as devDependency (Medusa needs `ajv/dist/core` which only exists in v8).

## Infrastructure (Docker)

### Local development

Docker is used only for infrastructure services (Postgres + Redis), not for Medusa itself.
Medusa runs natively on the host for simpler development and faster iteration.

- `apps/backend/docker-compose.yml` — Postgres 15 (port 5432) + Redis 7 (port 6379)
- Container names: `medusa_postgres`, `medusa_redis`

### Production deployment

Full dockerized stack at repo root:

- `docker-compose.prod.yml` — 5 services: Postgres, Redis, Medusa backend, Astro storefront, Caddy (reverse proxy)
- `docker/Caddyfile` — reverse proxy config (auto HTTPS via Let's Encrypt)
- `apps/backend/Dockerfile` — multi-stage Medusa build (uses `.medusa/server/` standalone output)
- `apps/storefront-astro/Dockerfile` — multi-stage Astro SSR build (`node dist/server/entry.mjs`)
- Container names: `medusa-prod-*` (avoids conflicts with local dev containers)
- `.env.production` — production secrets (gitignored), see `.env.production.example` for template
- `deploy.sh` — interactive deployment script (prompts for domain, credentials, secrets)
- Caddy routes: `/admin`, `/store`, `/auth`, `/hooks` → backend:9000, everything else → storefront:8001

## Environment files

- `apps/backend/.env` — database, Redis, CORS, secrets (gitignored)
- `apps/storefront-next/.env.local` — Medusa URL, publishable key, Stripe keys (gitignored)
- `apps/storefront-astro/.env.local` — Medusa URL, publishable key, Stripe keys (gitignored)
- `.env.production` — production Docker deployment secrets (gitignored)

## Backend development (Medusa)

- Medusa customizations live in `apps/backend/src/`: `api/`, `modules/`, `workflows/`, `subscribers/`, `jobs/`, `links/`, `scripts/`, `admin/`
- Admin dashboard customizations are in `apps/backend/src/admin/` (widgets, routes, i18n)
- Use Medusa MCP server and `medusa-dev:building-with-medusa` skill for backend work
- Use `medusa-dev:building-admin-dashboard-customizations` skill for admin UI work

## Storefront development (Next.js)

- Storefront source is in `apps/storefront-next/src/`
- Uses Medusa JS SDK (`@medusajs/js-sdk`) for API calls
- Requires `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` in `.env.local`
- Use `medusa-dev:building-storefronts` and `ecommerce-storefront:storefront-best-practices` skills for storefront work

## Storefront development (Astro)

- Storefront source is in `apps/storefront-astro/src/`
- Astro 5 with React integration, Panda CSS for styling, Park UI + Ark UI for components
- Uses Medusa JS SDK (`@medusajs/js-sdk`) for API calls, nanostores for state management
- Requires `PUBLIC_MEDUSA_PUBLISHABLE_KEY` in `.env.local`
- Use `medusa-dev:building-storefronts` and `ecommerce-storefront:storefront-best-practices` skills for storefront work
