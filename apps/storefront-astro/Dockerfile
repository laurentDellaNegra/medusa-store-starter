# ──────────────────────────────────────────────
# Stage 1: Build
# ──────────────────────────────────────────────
FROM node:20-alpine AS builder

# Enable Corepack for pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy root workspace files (needed for pnpm workspace resolution)
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./

# Copy all app packages (needed for workspace resolution)
COPY apps/ apps/

# Install all workspace dependencies
RUN pnpm install --frozen-lockfile

WORKDIR /app/apps/storefront-astro

# Generate Panda CSS (must run before astro build)
RUN npx panda codegen

# PUBLIC_* vars are inlined at build time by Astro/Vite.
# Pass them as build args so they're baked into the client bundle.
ARG PUBLIC_MEDUSA_PUBLISHABLE_KEY
ARG PUBLIC_BASE_URL
ARG PUBLIC_DEFAULT_REGION=us
ARG PUBLIC_STRIPE_KEY

ENV PUBLIC_MEDUSA_PUBLISHABLE_KEY=$PUBLIC_MEDUSA_PUBLISHABLE_KEY
ENV PUBLIC_BASE_URL=$PUBLIC_BASE_URL
ENV PUBLIC_DEFAULT_REGION=$PUBLIC_DEFAULT_REGION
ENV PUBLIC_STRIPE_KEY=$PUBLIC_STRIPE_KEY

# Build the SSR app
RUN npx astro build

# ──────────────────────────────────────────────
# Stage 2: Production
# ──────────────────────────────────────────────
FROM node:20-alpine AS runner

RUN apk add --no-cache tini

WORKDIR /app

# Copy workspace files for production install
COPY --from=builder /app/package.json /app/pnpm-lock.yaml /app/pnpm-workspace.yaml /app/.npmrc ./
COPY --from=builder /app/apps/storefront-astro/package.json ./apps/storefront-astro/

# Install production dependencies (skip lifecycle scripts)
RUN corepack enable && corepack prepare pnpm@latest --activate && \
    pnpm config set ignore-scripts true && \
    pnpm install --prod --frozen-lockfile --filter=@medusa-store-starter/storefront-astro...

# Copy the built output (server + client assets + styled-system)
COPY --from=builder /app/apps/storefront-astro/dist/ ./apps/storefront-astro/dist/
COPY --from=builder /app/apps/storefront-astro/styled-system/ ./apps/storefront-astro/styled-system/

WORKDIR /app/apps/storefront-astro

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=8001

EXPOSE 8001

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "dist/server/entry.mjs"]
