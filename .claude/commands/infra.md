# Local Infrastructure Management

You are helping manage the local development infrastructure (Postgres + Redis via Docker).

## Services

| Service | Container | Port | Image |
|---|---|---|---|
| Postgres | `medusa_postgres` | 5432 | postgres:15 |
| Redis | `medusa_redis` | 6379 | redis:7 |

Docker compose file: `apps/backend/docker-compose.yml`

## Commands

```bash
# Start infrastructure
pnpm nx run @medusa-store-starter/backend:infra:up

# Stop infrastructure
pnpm nx run @medusa-store-starter/backend:infra:down

# Check container status
docker ps --filter "name=medusa_postgres" --filter "name=medusa_redis"

# View Postgres logs
docker logs medusa_postgres

# View Redis logs
docker logs medusa_redis

# Connect to Postgres directly
docker exec -it medusa_postgres psql -U postgres -d medusa-store

# Test Redis connection
docker exec -it medusa_redis redis-cli ping
```

## Default credentials

- **Postgres**: user `postgres`, password `postgres`, database `medusa-store`
- **Redis**: no authentication

These match the defaults in `apps/backend/.env.example`.

## Troubleshooting

### Containers won't start
```bash
# Check if ports are already in use
lsof -i :5432
lsof -i :6379

# Check Docker is running
docker info

# Force recreate containers
cd apps/backend && docker compose up -d --force-recreate
```

### Database connection refused
1. Check container is running: `docker ps --filter "name=medusa_postgres"`
2. Check container health: `docker inspect medusa_postgres --format='{{.State.Health.Status}}'`
3. Check logs: `docker logs medusa_postgres --tail 50`
4. Verify `DATABASE_URL` in `apps/backend/.env` matches container config

### Redis connection refused
1. Check container is running: `docker ps --filter "name=medusa_redis"`
2. Test connection: `docker exec medusa_redis redis-cli ping` (should return `PONG`)
3. Verify `REDIS_URL` in `apps/backend/.env` is `redis://localhost:6379`

### Reset database (destructive)
```bash
# Stop containers and remove volumes
cd apps/backend && docker compose down -v

# Restart fresh
pnpm nx run @medusa-store-starter/backend:infra:up

# Re-run migrations and seed
pnpm nx run @medusa-store-starter/backend:db:migrate
pnpm nx run @medusa-store-starter/backend:seed
```

### Distinguish local vs production containers
- Local dev: container prefix `medusa_` (underscore), uses `apps/backend/docker-compose.yml`
- Production: container prefix `medusa-prod-` (hyphen), uses root `docker-compose.prod.yml`
- They use different ports/networks and don't conflict
