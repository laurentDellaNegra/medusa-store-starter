#!/usr/bin/env bash
set -euo pipefail

# ─────────────────────────────────────────────────────────────
# deploy.sh — Automated production deployment for Medusa Store
# ─────────────────────────────────────────────────────────────
#
# Usage:
#   ./deploy.sh              # Full first-time deploy (interactive)
#   ./deploy.sh --rebuild    # Rebuild and restart (code changes)
#   ./deploy.sh --nuke       # Destroy everything and redeploy from scratch
#
# Prerequisites:
#   - Docker and Docker Compose installed

COMPOSE="docker compose -f docker-compose.prod.yml --env-file .env.production"
ENV_FILE=".env.production"
ENV_EXAMPLE=".env.production.example"

# ─── Colors ───────────────────────────────────────────────────
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

info()    { echo -e "${BLUE}▸${NC} $1"; }
success() { echo -e "${GREEN}✔${NC} $1"; }
warn()    { echo -e "${YELLOW}⚠${NC} $1"; }
error()   { echo -e "${RED}✖${NC} $1"; exit 1; }

# ─── Parse arguments ─────────────────────────────────────────
MODE="deploy"
for arg in "$@"; do
  case $arg in
    --rebuild) MODE="rebuild" ;;
    --nuke)    MODE="nuke" ;;
    --help|-h)
      echo "Usage: ./deploy.sh [--rebuild|--nuke]"
      echo ""
      echo "  (no args)    Full first-time deploy (interactive setup)"
      echo "  --rebuild    Rebuild images and restart (after code changes)"
      echo "  --nuke       Destroy everything and redeploy from scratch"
      echo ""
      exit 0
      ;;
    *) error "Unknown argument: $arg. Use --help for usage." ;;
  esac
done

# ─── Nuke mode ────────────────────────────────────────────────
if [[ "$MODE" == "nuke" ]]; then
  warn "This will destroy ALL containers, images, and data (including the database)."
  read -rp "Are you sure? (y/N) " confirm
  if [[ "$confirm" != [yY] ]]; then
    echo "Aborted."
    exit 0
  fi
  info "Nuking everything..."
  $COMPOSE down -v --rmi all 2>/dev/null || true
  # Stop ALL running containers (catches strays from previous deploys)
  if [ -n "$(docker ps -q)" ]; then
    docker stop $(docker ps -q)
  fi
  docker system prune -a --volumes -f
  docker builder prune -a -f
  success "Everything destroyed. Run ./deploy.sh to redeploy."
  exit 0
fi

# ─── Rebuild mode ─────────────────────────────────────────────
if [[ "$MODE" == "rebuild" ]]; then
  [[ -f "$ENV_FILE" ]] || error "$ENV_FILE not found. Run ./deploy.sh first."
  info "Rebuilding images..."
  $COMPOSE build
  info "Restarting services..."
  $COMPOSE up -d
  success "Rebuild complete!"
  exit 0
fi

# ─── Full deploy ──────────────────────────────────────────────
echo ""
echo -e "${BLUE}╔══════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║       Medusa Store — Production Deploy    ║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════════╝${NC}"
echo ""

# ─── Step 1: Interactive setup ────────────────────────────────
info "Step 1/6 — Setting up environment..."

NEED_SETUP=true

if [[ -f "$ENV_FILE" ]]; then
  warn "$ENV_FILE already exists."
  read -rp "  Use existing config? (Y/n) " use_existing
  if [[ "${use_existing:-Y}" != [nN] ]]; then
    NEED_SETUP=false
    success "Using existing $ENV_FILE."
  else
    info "Reconfiguring..."
  fi
fi

if [[ "$NEED_SETUP" == true ]]; then
  echo ""
  echo -e "  ${YELLOW}── Domain ──${NC}"
  echo "  Enter your domain name (e.g., example.com)."
  echo "  Use \"localhost\" for local/IP-only testing."
  echo ""
  read -rp "  Domain: " DOMAIN
  DOMAIN="${DOMAIN:-localhost}"

  # Determine base URL from domain
  if [[ "$DOMAIN" == "localhost" ]]; then
    BASE_URL="http://localhost"
  else
    BASE_URL="https://${DOMAIN}"
  fi

  echo ""
  echo -e "  ${YELLOW}── Admin account ──${NC}"
  read -rp "  Admin email [admin@${DOMAIN}]: " ADMIN_EMAIL
  ADMIN_EMAIL="${ADMIN_EMAIL:-admin@${DOMAIN}}"

  while true; do
    read -rsp "  Admin password (min 8 chars): " ADMIN_PASSWORD
    echo ""
    if [[ ${#ADMIN_PASSWORD} -lt 8 ]]; then
      warn "Password must be at least 8 characters."
    else
      break
    fi
  done

  echo ""
  echo -e "  ${YELLOW}── Database ──${NC}"
  read -rp "  Postgres user [postgres]: " PG_USER
  PG_USER="${PG_USER:-postgres}"
  read -rsp "  Postgres password [auto-generate]: " PG_PASSWORD
  echo ""
  if [[ -z "$PG_PASSWORD" ]]; then
    PG_PASSWORD=$(openssl rand -hex 16)
    success "Generated random Postgres password."
  fi

  echo ""
  echo -e "  ${YELLOW}── Storefront ──${NC}"
  read -rp "  Default region code [dk]: " DEFAULT_REGION
  DEFAULT_REGION="${DEFAULT_REGION:-dk}"
  read -rp "  Stripe publishable key [skip]: " STRIPE_KEY
  STRIPE_KEY="${STRIPE_KEY:-}"

  # Generate secrets
  JWT_SECRET=$(openssl rand -hex 32)
  COOKIE_SECRET=$(openssl rand -hex 32)

  # Write .env.production
  cat > "$ENV_FILE" <<EOF
# ─── Domain ────────────────────────────────────────────
DOMAIN=${DOMAIN}

# ─── Postgres ─────────────────────────────────────────
POSTGRES_USER=${PG_USER}
POSTGRES_PASSWORD=${PG_PASSWORD}

# ─── Medusa Backend ───────────────────────────────────
JWT_SECRET=${JWT_SECRET}
COOKIE_SECRET=${COOKIE_SECRET}

# CORS origins
STORE_CORS=${BASE_URL}
ADMIN_CORS=${BASE_URL}
AUTH_CORS=${BASE_URL}

# ─── Storefront (build-time) ─────────────────────────
PUBLIC_MEDUSA_PUBLISHABLE_KEY=placeholder_will_be_replaced_after_seed
PUBLIC_BASE_URL=${BASE_URL}
PUBLIC_DEFAULT_REGION=${DEFAULT_REGION}
PUBLIC_STRIPE_KEY=${STRIPE_KEY}
EOF

  success "Created $ENV_FILE for domain: ${DOMAIN}"
  echo ""

  # Show summary
  echo -e "  ${BLUE}Configuration summary:${NC}"
  echo -e "    Domain:       ${DOMAIN}"
  echo -e "    Base URL:     ${BASE_URL}"
  echo -e "    Admin email:  ${ADMIN_EMAIL}"
  echo -e "    Postgres:     ${PG_USER}@postgres:5432"
  echo -e "    Region:       ${DEFAULT_REGION}"
  [[ -n "$STRIPE_KEY" ]] && echo -e "    Stripe:       configured" || echo -e "    Stripe:       not configured"
  echo ""

  read -rp "  Proceed with deployment? (Y/n) " proceed
  if [[ "${proceed:-Y}" == [nN] ]]; then
    success "$ENV_FILE saved. Edit it manually and re-run ./deploy.sh"
    exit 0
  fi
else
  # Read values from existing file
  DOMAIN=$(grep "^DOMAIN=" "$ENV_FILE" | cut -d= -f2)
  ADMIN_EMAIL=""
  ADMIN_PASSWORD=""
fi

# ─── Step 2: Build images ────────────────────────────────────
info "Step 2/6 — Building Docker images..."
$COMPOSE build
success "Images built."

# ─── Step 3: Start services ──────────────────────────────────
info "Step 3/6 — Starting services..."
$COMPOSE up -d
success "Services started."

# ─── Step 4: Wait for backend to be ready ────────────────────
info "Step 4/6 — Waiting for backend to be ready (migrations may take a while on first deploy)..."
RETRIES=60
DELAY=5
for i in $(seq 1 $RETRIES); do
  if $COMPOSE exec -T backend wget -qO- http://localhost:9000/health 2>/dev/null | grep -qi "ok"; then
    echo ""
    success "Backend is healthy."
    break
  fi
  # Check if container has exited/crashed
  STATUS=$($COMPOSE ps backend --format '{{.Status}}' 2>/dev/null || echo "unknown")
  if echo "$STATUS" | grep -qi "exit"; then
    echo ""
    error "Backend container exited unexpectedly. Check logs with: $COMPOSE logs backend"
  fi
  if [[ $i -eq $RETRIES ]]; then
    echo ""
    error "Backend did not become healthy after $((RETRIES * DELAY))s. Check logs with: $COMPOSE logs backend"
  fi
  printf "\r  Attempt %d/%d (%ds elapsed)..." "$i" "$RETRIES" "$((i * DELAY))"
  sleep $DELAY
done

# ─── Step 5: Seed and get publishable key ────────────────────
info "Step 5/6 — Seeding database..."
$COMPOSE exec -T backend npx medusa exec ./src/scripts/seed.js
success "Database seeded."

info "Retrieving publishable API key..."
KEY_OUTPUT=$($COMPOSE exec -T backend npx medusa exec ./src/scripts/get-publishable-key.js 2>&1)
PUBLISHABLE_KEY=$(echo "$KEY_OUTPUT" | grep "^PUBLISHABLE_KEY=" | cut -d= -f2 | tr -d '[:space:]')

if [[ -n "$PUBLISHABLE_KEY" ]]; then
  # Update the env file with the real key
  if grep -q "PUBLIC_MEDUSA_PUBLISHABLE_KEY=" "$ENV_FILE"; then
    sed -i.bak "s|^PUBLIC_MEDUSA_PUBLISHABLE_KEY=.*|PUBLIC_MEDUSA_PUBLISHABLE_KEY=$PUBLISHABLE_KEY|" "$ENV_FILE"
    rm -f "${ENV_FILE}.bak"
  fi
  success "Publishable key: $PUBLISHABLE_KEY"

  # Rebuild storefront with the real key
  info "Rebuilding storefront with publishable key..."
  $COMPOSE build storefront
  $COMPOSE up -d storefront
  success "Storefront rebuilt with correct API key."
else
  warn "Could not extract publishable key. You'll need to set it manually in $ENV_FILE."
  echo "$KEY_OUTPUT"
fi

# ─── Step 6: Create admin user ───────────────────────────────
if [[ -z "$ADMIN_EMAIL" ]]; then
  echo ""
  echo -e "  ${YELLOW}── Admin account ──${NC}"
  read -rp "  Admin email: " ADMIN_EMAIL
  while true; do
    read -rsp "  Admin password (min 8 chars): " ADMIN_PASSWORD
    echo ""
    if [[ ${#ADMIN_PASSWORD} -lt 8 ]]; then
      warn "Password must be at least 8 characters."
    else
      break
    fi
  done
fi

info "Step 6/6 — Creating admin user ($ADMIN_EMAIL)..."
$COMPOSE exec -T backend npx medusa user -e "$ADMIN_EMAIL" -p "$ADMIN_PASSWORD" 2>/dev/null && \
  success "Admin user created." || \
  warn "Admin user may already exist (this is fine)."

# ─── Done! ────────────────────────────────────────────────────
echo ""
echo -e "${GREEN}╔══════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║          Deploy complete! 🎉             ║${NC}"
echo -e "${GREEN}╚══════════════════════════════════════════╝${NC}"
echo ""

# Detect the URL
DOMAIN=$(grep "^DOMAIN=" "$ENV_FILE" | cut -d= -f2)
if [[ "$DOMAIN" == "localhost" || "$DOMAIN" == http://* ]]; then
  BASE_URL="$DOMAIN"
else
  BASE_URL="https://$DOMAIN"
fi

echo -e "  Storefront:  ${BLUE}${BASE_URL}${NC}"
echo -e "  Admin:       ${BLUE}${BASE_URL}/admin${NC}"
echo -e "  Admin login: ${YELLOW}${ADMIN_EMAIL}${NC}"
echo ""
echo -e "  ${YELLOW}Useful commands:${NC}"
echo "    ./deploy.sh --rebuild    Rebuild after code changes"
echo "    ./deploy.sh --nuke       Destroy everything and start fresh"
echo ""
