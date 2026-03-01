import { test, expect } from "@playwright/test";

test.describe("Product detail page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/product?id=le-marche-tote");
  });

  test("has correct title", async ({ page }) => {
    await expect(page).toHaveTitle("Le Marché Tote — Rafia");
  });

  test("displays product name and price", async ({ page }) => {
    await expect(page.locator(".pdp-name")).toHaveText("Le Marché Tote");
    await expect(page.locator(".pdp-price")).toHaveText("CHF 189");
  });

  test("displays product type", async ({ page }) => {
    await expect(page.locator(".pdp-type")).toHaveText("Tote Bag");
  });

  test("displays product description", async ({ page }) => {
    const desc = page.locator(".pdp-desc");
    await expect(desc).toContainText("signature market tote");
  });

  test("has breadcrumb navigation", async ({ page }) => {
    const breadcrumb = page.locator(".breadcrumb");
    await expect(breadcrumb.getByText("Home")).toBeVisible();
    await expect(breadcrumb.getByText("Collection")).toBeVisible();
    await expect(breadcrumb.getByText("Le Marché Tote")).toBeVisible();
  });

  test("add to cart button works", async ({ page }) => {
    const addBtn = page.locator("#addToCartBtn");
    await expect(addBtn).toContainText("Add to Bag — CHF 189");

    await addBtn.click();

    // Button text changes to confirm
    await expect(addBtn).toContainText("Added to Bag");

    // Cart badge should show 1
    const badge = page.locator(".cart-count").first();
    await expect(badge).toHaveText("1");
    await expect(badge).toBeVisible();
  });

  test("quantity selector works", async ({ page }) => {
    const plusBtn = page.locator("#qtyPlus");
    await plusBtn.click();

    // Button price should update
    await expect(page.locator("#addToCartBtn")).toContainText(
      "Add to Bag — CHF 378"
    );
  });

  test("color swatches are interactive", async ({ page }) => {
    const swatches = page.locator(".pdp-swatch");
    await expect(swatches).toHaveCount(3);

    // First swatch should be active by default
    await expect(swatches.first()).toHaveClass(/active/);

    // Click second swatch
    await swatches.nth(1).click();
    await expect(swatches.nth(1)).toHaveClass(/active/);
    await expect(swatches.first()).not.toHaveClass(/active/);
  });

  test("accordion opens and closes", async ({ page }) => {
    // "Product Details" should be open by default
    const firstAccItem = page.locator(".acc-item").first();
    await expect(firstAccItem).toHaveClass(/open/);

    // Click to close
    await firstAccItem.locator(".acc-header").click();
    await expect(firstAccItem).not.toHaveClass(/open/);

    // Click to reopen
    await firstAccItem.locator(".acc-header").click();
    await expect(firstAccItem).toHaveClass(/open/);
  });

  test("related products section is visible", async ({ page }) => {
    const related = page.locator(".related");
    await expect(related).toBeVisible();

    // Should show 3 related products
    const relatedCards = related.locator(".product-card");
    await expect(relatedCards).toHaveCount(3);
  });

  test("defaults to first product when no id param", async ({ page }) => {
    await page.goto("/product");
    await expect(page.locator(".pdp-name")).toHaveText("Le Marché Tote");
  });
});
