import { useState, useEffect, useCallback } from "react";
import type { HttpTypes } from "@medusajs/types";
import { useStore } from "@nanostores/react";
import { $cart, setCart } from "@/stores/cart";
import { css } from "styled-system/css";
import CartItem from "./CartItem";
import CartTotals from "./CartTotals";
import EmptyCart from "./EmptyCart";
import SignInPrompt from "./SignInPrompt";
import { Button } from "@/components/ui/button";

interface CartTemplateProps {
  initialCart: HttpTypes.StoreCart | null;
  customer: HttpTypes.StoreCustomer | null;
  countryCode: string;
}

export default function CartTemplate({
  initialCart,
  customer,
  countryCode,
}: CartTemplateProps) {
  const cart = useStore($cart);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (initialCart) setCart(initialCart);
  }, [initialCart]);

  const refreshCart = useCallback(async () => {
    setRefreshing(true);
    try {
      const res = await fetch(`/api/cart/add-item`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: true }),
      });
      // Re-fetch via page reload for simplicity since cookies are httpOnly
      window.location.reload();
    } catch {
      setRefreshing(false);
    }
  }, []);

  const activeCart = cart || initialCart;

  if (!activeCart || !activeCart.items?.length) {
    return <EmptyCart countryCode={countryCode} />;
  }

  const getCheckoutStep = () => {
    if (!activeCart.shipping_address?.address_1 || !activeCart.email) {
      return "address";
    }
    if (!activeCart.shipping_methods?.length) {
      return "delivery";
    }
    return "payment";
  };

  return (
    <div
      className={css({
        display: "grid",
        gridTemplateColumns: { base: "1fr", lg: "1fr 380px" },
        gap: "10",
        maxW: "7xl",
        mx: "auto",
        px: "4",
        py: "8",
      })}
    >
      {/* Left column — Items */}
      <div>
        <h1 className={css({ fontSize: "2xl", fontWeight: "bold", mb: "6" })}>
          Shopping Cart
        </h1>

        {!customer && <SignInPrompt countryCode={countryCode} />}

        <div
          className={css({
            mt: "4",
            divideY: "1px",
            divideColor: "border.default",
          })}
        >
          {activeCart.items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              currencyCode={activeCart.currency_code}
              onUpdate={() => window.location.reload()}
            />
          ))}
        </div>
      </div>

      {/* Right column — Summary */}
      <div>
        <div
          className={css({
            position: "sticky",
            top: "24",
            bg: "bg.default",
            borderWidth: "1px",
            borderColor: "border.default",
            borderRadius: "lg",
            p: "6",
            display: "flex",
            flexDir: "column",
            gap: "4",
          })}
        >
          <h2 className={css({ fontSize: "lg", fontWeight: "semibold" })}>
            Order Summary
          </h2>

          <CartTotals cart={activeCart} />

          <a
            href={`/${countryCode}/checkout?step=${getCheckoutStep()}`}
            className={css({ textDecoration: "none", display: "block" })}
          >
            <Button variant="outline" size="lg" className={css({ w: "full" })}>
              Go to checkout
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
