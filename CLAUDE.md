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

Nx monorepo with pnpm workspaces. Four apps:

- `@medusa-store-starter/backend` at `apps/backend/` — Medusa v2.13.1 (runs natively on host)
- `@medusa-store-starter/storefront-next` at `apps/storefront-next/` — Next.js 15, React 19
- `@medusa-store-starter/storefront-astro` at `apps/storefront-astro/` — Astro 5, React 19, Panda CSS, Park UI
- `storefront2-astro` at `apps/storefront2-astro/` — Astro 5, minimal (no React/Panda CSS), hardcoded product data, localStorage cart

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
- Caddy routes: `/admin`, `/admin-app`, `/store`, `/auth`, `/hooks`, `/health` → backend:9000, everything else → storefront:8001
- Admin dashboard served at `/admin-app` (not `/admin` — that's reserved for Medusa API routes)
- `MEDUSA_BACKEND_URL` is a **build-time** arg — must be passed during `docker build` for admin SPA to work

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

## Storefront development (Astro — storefront2)

- Minimal Astro 5 storefront at `apps/storefront2-astro/` (no React, no Panda CSS)
- 4 pages: `/` (home), `/shop`, `/product?id=...`, `/cart`
- Hardcoded product data in `src/data/products.ts`, localStorage cart
- No Medusa backend integration (standalone demo storefront)

### E2E & visual regression testing (Playwright)

- Config: `apps/storefront2-astro/playwright.config.ts` (Chromium, dev server on port 4321)
- Tests: `apps/storefront2-astro/e2e/` — 42 tests across 5 spec files
  - `home.spec.ts` — homepage sections, navigation, CTAs
  - `shop.spec.ts` — product grid, filtering, sorting
  - `product.spec.ts` — PDP details, add to cart, quantity, swatches, accordion
  - `cart.spec.ts` — empty state, add/remove items, totals, shipping logic
  - `visual.spec.ts` — full-page screenshot comparison for all routes
- Visual baselines: `e2e/visual.spec.ts-snapshots/` (committed to git)
- Commands:
  - `pnpm test:e2e` — run all tests
  - `pnpm test:e2e:ui` — interactive Playwright UI mode
  - `pnpm test:e2e:update` — update visual regression baselines

---

# Workflow & Coding Guide

## Workflow Orchestration

### 1. Plan Node Default

- Enter plan mode for ANY non-trivial task (3+ steps or architectural decisions)
- If something goes sideways, STOP and re-plan immediately – don't keep pushing
- Use plan mode for verification steps, not just building
- Write detailed specs upfront to reduce ambiguity

### 2. Subagent Strategy

- Use subagents liberally to keep main context window clean
- Offload research, exploration, and parallel analysis to subagents
- For complex problems, throw more compute at it via subagents
- One task per subagent for focused execution

### 3. Self-Improvement Loop

- After ANY correction from the user: update `tasks/lessons.md` with the pattern
- Write rules for yourself that prevent the same mistake
- Ruthlessly iterate on these lessons until mistake rate drops
- Review lessons at session start for relevant project

### 4. Verification Before Done

- Never mark a task complete without proving it works
- Diff behavior between main and your changes when relevant
- Ask yourself: "Would a staff engineer approve this?"
- Run tests, check logs, demonstrate correctness

### 5. Demand Elegance (Balanced)

- For non-trivial changes: pause and ask "is there a more elegant way?"
- If a fix feels hacky: "Knowing everything I know now, implement the elegant solution"
- Skip this for simple, obvious fixes – don't over-engineer
- Challenge your own work before presenting it

### 6. Autonomous Bug Fixing

- When given a bug report: just fix it. Don't ask for hand-holding
- Point at logs, errors, failing tests – then resolve them
- Zero context switching required from the user
- Go fix failing CI tests without being told how

## Task Management

1. **Plan First**: Write plan to `tasks/todo.md` with checkable items
1. **Verify Plan**: Check in before starting implementation
1. **Track Progress**: Mark items complete as you go
1. **Explain Changes**: High-level summary at each step
1. **Document Results**: Add review section to `tasks/todo.md`
1. **Capture Lessons**: Update `tasks/lessons.md` after corrections

## Core Principles

- **Simplicity First**: Make every change as simple as possible. Impact minimal code.
- **No Laziness**: Find root causes. No temporary fixes. Senior developer standards.
- **Minimal Impact**: Changes should only touch what's necessary. Avoid introducing bugs.
