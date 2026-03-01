import { test, expect } from "@playwright/test";

test.describe("Visual regression", () => {
  test.beforeEach(async ({ page }) => {
    // Clear cart state to ensure consistent screenshots
    await page.goto("/");
    await page.evaluate(() => localStorage.removeItem("rafia_cart"));
  });

  test("homepage", async ({ page }) => {
    await page.goto("/");
    // Wait for animations to settle
    await page.waitForTimeout(2000);
    await expect(page).toHaveScreenshot("home.png", { fullPage: true });
  });

  test("shop page", async ({ page }) => {
    await page.goto("/shop");
    await page.waitForTimeout(1500);
    await expect(page).toHaveScreenshot("shop.png", { fullPage: true });
  });

  test("product detail page", async ({ page }) => {
    await page.goto("/product?id=le-marche-tote");
    await page.waitForTimeout(1500);
    await expect(page).toHaveScreenshot("product.png", { fullPage: true });
  });

  test("cart page (empty)", async ({ page }) => {
    await page.goto("/cart");
    await page.waitForTimeout(1000);
    await expect(page).toHaveScreenshot("cart-empty.png", { fullPage: true });
  });

  test("cart page (with items)", async ({ page }) => {
    await page.evaluate(() => {
      const cart = [
        {
          id: "le-marche-tote",
          name: "Le Marché Tote",
          price: 189,
          type: "Tote Bag",
          color: "Natural",
          gradient:
            "linear-gradient(145deg, #D4C5B2 0%, #BFA98E 40%, #C9B89C 100%)",
          svg: "",
          qty: 2,
        },
        {
          id: "la-voyageuse",
          name: "La Voyageuse",
          price: 215,
          type: "Crossbody",
          color: "Sand",
          gradient:
            "linear-gradient(145deg, #DED0BD 0%, #CABC9F 40%, #D6C8B5 100%)",
          svg: "",
          qty: 1,
        },
      ];
      localStorage.setItem("rafia_cart", JSON.stringify(cart));
    });
    await page.goto("/cart");
    await page.waitForTimeout(1500);
    await expect(page).toHaveScreenshot("cart-with-items.png", {
      fullPage: true,
    });
  });
});
