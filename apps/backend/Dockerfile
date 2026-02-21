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

# Build Medusa (produces .medusa/server/ with compiled JS + admin dashboard)
WORKDIR /app/apps/backend
RUN npx medusa build

# ──────────────────────────────────────────────
# Stage 2: Production
# ──────────────────────────────────────────────
FROM node:20-alpine AS runner

RUN apk add --no-cache tini

WORKDIR /app/server

# Copy the standalone build output
COPY --from=builder /app/apps/backend/.medusa/server/ ./

# Install production dependencies only
# Note: .medusa/server has its own simplified package.json from Medusa build
RUN corepack enable && corepack prepare pnpm@latest --activate && \
    pnpm install --prod

ENV NODE_ENV=production

EXPOSE 9000

# Use tini for proper signal handling
ENTRYPOINT ["/sbin/tini", "--"]

# Run migrations then start (migrations are idempotent)
CMD ["sh", "-c", "npx medusa db:migrate && npx medusa start"]
