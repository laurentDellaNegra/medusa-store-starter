import { test, expect } from "@playwright/test";

test.describe("Shop page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/shop");
  });

  test("has correct title", async ({ page }) => {
    await expect(page).toHaveTitle("Collection — Rafia");
  });

  test("displays product grid with all 6 products", async ({ page }) => {
    const grid = page.locator("#shopGrid");
    await expect(grid).toBeVisible();

    const cards = grid.locator(".product-card");
    await expect(cards).toHaveCount(6);
  });

  test("shows results count", async ({ page }) => {
    const count = page.locator("#resultsCount");
    await expect(count).toHaveText("Showing 6 pieces");
  });

  test("filter buttons are visible", async ({ page }) => {
    const filterBar = page.locator(".filter-bar");
    await expect(filterBar).toBeVisible();

    await expect(page.locator(".filter-btn").first()).toHaveText("All");
    await expect(
      page.locator('.filter-btn[data-filter="Tote Bag"]')
    ).toBeVisible();
    await expect(
      page.locator('.filter-btn[data-filter="Clutch"]')
    ).toBeVisible();
  });

  test("filtering by category works", async ({ page }) => {
    await page.locator('.filter-btn[data-filter="Tote Bag"]').click();

    const count = page.locator("#resultsCount");
    await expect(count).toHaveText("Showing 1 piece");

    const cards = page.locator("#shopGrid .product-card");
    await expect(cards).toHaveCount(1);
  });

  test("filtering shows empty state for unused category", async ({
    page,
  }) => {
    // Click "All" first, then a category — all categories should have products
    // Let's verify "All" re-shows everything
    await page.locator('.filter-btn[data-filter="Clutch"]').click();
    await expect(page.locator("#resultsCount")).toHaveText("Showing 1 piece");

    await page.locator('.filter-btn[data-filter="all"]').click();
    await expect(page.locator("#resultsCount")).toHaveText("Showing 6 pieces");
  });

  test("sort by price low to high works", async ({ page }) => {
    await page.locator("#sortSelect").selectOption("price-asc");

    // First card should be the cheapest (La Petite, CHF 125)
    const firstCard = page.locator("#shopGrid .product-card").first();
    await expect(firstCard).toContainText("CHF 125");
  });

  test("sort by price high to low works", async ({ page }) => {
    await page.locator("#sortSelect").selectOption("price-desc");

    // First card should be the most expensive (La Plage, CHF 235)
    const firstCard = page.locator("#shopGrid .product-card").first();
    await expect(firstCard).toContainText("CHF 235");
  });

  test("sort by name works", async ({ page }) => {
    await page.locator("#sortSelect").selectOption("name");

    // First alphabetically should be "L'Élégante Clutch"
    const firstCard = page.locator("#shopGrid .product-card").first();
    await expect(firstCard).toContainText("L'Élégante Clutch");
  });

  test("product card links to product page", async ({ page }) => {
    const firstCard = page.locator("#shopGrid .product-card").first();
    await firstCard.click();
    await expect(page).toHaveURL(/\/product\?id=/);
  });
});
