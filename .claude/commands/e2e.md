# E2E & Visual Regression Testing

You are helping with Playwright E2E and visual regression testing for `storefront2-astro`.

## Overview

- **App**: `apps/storefront2-astro/` — minimal Astro 5 storefront (no React, no Panda CSS, no Medusa backend)
- **Test framework**: Playwright
- **Config**: `apps/storefront2-astro/playwright.config.ts`
- **Test directory**: `apps/storefront2-astro/e2e/`
- **Total**: 84 tests (42 per viewport) across 5 spec files
- **Viewports**: Desktop Chrome + Mobile Pixel 7
- **Dev server**: Automatically started on port 4321 (`pnpm astro dev --port 4321`)

## Test files

| File | Coverage |
|---|---|
| `home.spec.ts` | Homepage sections, navigation, CTAs |
| `shop.spec.ts` | Product grid, filtering, sorting |
| `product.spec.ts` | PDP details, add to cart, quantity, swatches, accordion |
| `cart.spec.ts` | Empty state, add/remove items, totals, shipping logic |
| `visual.spec.ts` | Full-page screenshot comparison for all routes |

## Commands

All commands run from `apps/storefront2-astro/`:

```bash
# Run all E2E tests
pnpm test:e2e

# Interactive Playwright UI mode (for debugging)
pnpm test:e2e:ui

# Update visual regression baselines
pnpm test:e2e:update
```

## Playwright config highlights

- `fullyParallel: true` — tests run in parallel locally
- `retries: 2` in CI, `0` locally
- `workers: 1` in CI (stability), unlimited locally
- `maxDiffPixelRatio: 0.01` for screenshot comparison
- `trace: "on-first-retry"` — traces captured on first retry for debugging
- Dev server auto-starts with `reuseExistingServer: !process.env.CI`

## Visual regression baselines

- Stored in `e2e/visual.spec.ts-snapshots/` (committed to git)
- Platform-specific: baselines end in `-darwin.png` (macOS) or `-linux.png` (CI)
- After UI changes, update baselines with `pnpm test:e2e:update`
- In CI, Linux baselines are auto-generated if missing

## CI workflow

File: `.github/workflows/e2e-storefront2.yml`

**Triggers:**
- Push to `main` (paths: `apps/storefront2-astro/**`)
- PR to `main` (same paths)
- Manual dispatch with `update-snapshots` option

**Flow:**
1. Install dependencies + Playwright Chromium
2. Check if Linux baselines exist
3. If missing or update requested → generate baselines and auto-commit
4. Otherwise → run tests normally
5. Upload HTML report (14 day retention)
6. On failure → upload test results with diffs

## Troubleshooting

### Visual test failures
- Screenshots differ between platforms (macOS vs Linux font rendering)
- Check the HTML report artifact for visual diffs
- If intentional UI change: run `pnpm test:e2e:update` locally, then trigger CI baseline update via manual dispatch

### Flaky tests
- Increase `retries` in config temporarily to identify flaky tests
- Check for animation/transition timing issues
- Use `await page.waitForLoadState('networkidle')` if needed

### Port conflicts
- Dev server uses port 4321 — check nothing else is using it
- `reuseExistingServer: true` locally means an already-running dev server will be reused
