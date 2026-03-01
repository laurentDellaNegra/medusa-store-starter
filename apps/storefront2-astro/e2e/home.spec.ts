import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("has correct title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Rafia — Artisanal Raphia Bags from Madagascar"
    );
  });

  test("hero section is visible with heading", async ({ page }) => {
    const hero = page.locator(".hero");
    await expect(hero).toBeVisible();

    const heading = hero.locator("h1");
    await expect(heading).toContainText("Raphia");
  });

  test("hero has CTA buttons", async ({ page }) => {
    const hero = page.locator(".hero");
    await expect(
      hero.getByRole("link", { name: "Discover Collection" })
    ).toBeVisible();
    await expect(
      hero.getByRole("link", { name: "Our Story" })
    ).toBeVisible();
  });

  test("collection preview section is visible", async ({ page }) => {
    const section = page.locator(".collection");
    await expect(section).toBeVisible();
  });

  test("navigation bar has logo and links", async ({ page }) => {
    const logo = page.locator(".navbar__logo");
    await expect(logo).toBeVisible();
    await expect(logo).toHaveText("Rafia.");

    const cartIcon = page.locator(".cart-icon");
    await expect(cartIcon).toBeVisible();
  });

  test("Discover Collection link navigates to /shop", async ({ page }) => {
    await page.getByRole("link", { name: "Discover Collection" }).click();
    await expect(page).toHaveURL("/shop");
  });

  test("testimonials section is visible", async ({ page }) => {
    const testimonial = page.getByText("Isabelle M., Geneva");
    await expect(testimonial).toBeVisible();
  });

  test("newsletter section is visible", async ({ page }) => {
    const newsletter = page.locator(".newsletter-section");
    await expect(newsletter).toBeVisible();
  });
});
