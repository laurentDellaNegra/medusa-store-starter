import { test, expect } from "@playwright/test";

test.describe("Cart page", () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto("/cart");
    await page.evaluate(() => localStorage.removeItem("rafia_cart"));
    await page.reload();
  });

  test("has correct title", async ({ page }) => {
    await expect(page).toHaveTitle("Shopping Bag — Rafia");
  });

  test("shows empty state when cart is empty", async ({ page }) => {
    await expect(page.getByText("Your bag is empty")).toBeVisible();
    await expect(page.locator("#cartItemCount")).toHaveText("0 items");
  });

  test("empty state has link to shop", async ({ page }) => {
    const shopLink = page.getByRole("link", { name: "Browse Collection" });
    await expect(shopLink).toBeVisible();
    await expect(shopLink).toHaveAttribute("href", "/shop");
  });

  test("displays cart items when products are added", async ({ page }) => {
    // Add a product via localStorage
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
          qty: 1,
        },
      ];
      localStorage.setItem("rafia_cart", JSON.stringify(cart));
    });
    await page.reload();

    await expect(page.locator("#cartItemCount")).toHaveText("1 item");
    await expect(page.getByText("Le Marché Tote")).toBeVisible();
    await expect(page.getByText("Order Summary")).toBeVisible();
  });

  test("quantity controls work", async ({ page }) => {
    await page.evaluate(() => {
      const cart = [
        {
          id: "le-marche-tote",
          name: "Le Marché Tote",
          price: 189,
          type: "Tote Bag",
          color: "Natural",
          gradient: "",
          svg: "",
          qty: 1,
        },
      ];
      localStorage.setItem("rafia_cart", JSON.stringify(cart));
    });
    await page.reload();

    // Click plus button
    await page
      .locator('.ci-qty-btn[data-action="plus"][data-id="le-marche-tote"]')
      .click();

    await expect(page.locator("#cartItemCount")).toHaveText("2 items");
  });

  test("remove button removes item", async ({ page }) => {
    await page.evaluate(() => {
      const cart = [
        {
          id: "le-marche-tote",
          name: "Le Marché Tote",
          price: 189,
          type: "Tote Bag",
          color: "Natural",
          gradient: "",
          svg: "",
          qty: 1,
        },
      ];
      localStorage.setItem("rafia_cart", JSON.stringify(cart));
    });
    await page.reload();

    await page.locator('.ci-remove[data-id="le-marche-tote"]').click();

    // After animation (400ms), cart should be empty
    await expect(page.getByText("Your bag is empty")).toBeVisible({
      timeout: 2000,
    });
  });

  test("order summary shows correct totals", async ({ page }) => {
    await page.evaluate(() => {
      const cart = [
        {
          id: "le-marche-tote",
          name: "Le Marché Tote",
          price: 189,
          type: "Tote Bag",
          color: "Natural",
          gradient: "",
          svg: "",
          qty: 2,
        },
      ];
      localStorage.setItem("rafia_cart", JSON.stringify(cart));
    });
    await page.reload();

    // Subtotal should be 189 * 2 = 378
    await expect(page.getByText("CHF 378").first()).toBeVisible();
    // Total: 378 + 0 (free shipping over 150) = 378
    await expect(page.getByText("Complimentary")).toBeVisible();
  });

  test("shipping is charged under CHF 150", async ({ page }) => {
    await page.evaluate(() => {
      const cart = [
        {
          id: "la-petite",
          name: "La Petite",
          price: 125,
          type: "Mini Bag",
          color: "Caramel",
          gradient: "",
          svg: "",
          qty: 1,
        },
      ];
      localStorage.setItem("rafia_cart", JSON.stringify(cart));
    });
    await page.reload();

    // Shipping row shows "CHF 12" (not "Complimentary")
    await expect(page.getByText("CHF 12", { exact: true })).toBeVisible();
  });
});
