import { useStore } from "@nanostores/react";
import { useEffect, useRef } from "react";
import { $cart, $cartOpen, closeCart } from "@/stores/cart";
import { convertToLocale } from "@/lib/util/money";
import { css } from "styled-system/css";
import { Button } from "@/components/ui/button";

interface CartDropdownProps {
  countryCode: string;
}

export default function CartDropdown({ countryCode }: CartDropdownProps) {
  const cart = useStore($cart);
  const isOpen = useStore($cartOpen);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        closeCart();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  if (!isOpen) return null;

  const items = cart?.items ?? [];
  const total = cart?.total ?? 0;
  const currencyCode = cart?.currency_code ?? "usd";

  return (
    <div
      ref={ref}
      className={css({
        position: "absolute",
        top: "full",
        right: "0",
        mt: "2",
        w: "96",
        maxH: "md",
        bg: "bg.default",
        borderWidth: "1px",
        borderColor: "border.default",
        borderRadius: "lg",
        shadow: "lg",
        zIndex: "50",
        display: "flex",
        flexDir: "column",
        overflow: "hidden",
      })}
    >
      <div
        className={css({
          p: "4",
          borderBottomWidth: "1px",
          borderColor: "border.default",
        })}
      >
        <p className={css({ fontSize: "sm", fontWeight: "semibold" })}>
          Cart ({items.length} item{items.length !== 1 ? "s" : ""})
        </p>
      </div>

      {items.length === 0 ? (
        <div className={css({ p: "8", textAlign: "center" })}>
          <p className={css({ fontSize: "sm", color: "fg.muted" })}>
            Your cart is empty
          </p>
        </div>
      ) : (
        <>
          <div className={css({ flex: "1", overflowY: "auto", p: "4" })}>
            {items.map((item) => (
              <div
                key={item.id}
                className={css({
                  display: "flex",
                  gap: "3",
                  py: "2",
                  "&:not(:last-child)": {
                    borderBottomWidth: "1px",
                    borderColor: "border.default",
                  },
                })}
              >
                {(item.thumbnail || item.variant?.product?.thumbnail) && (
                  <img
                    src={
                      item.thumbnail || item.variant?.product?.thumbnail || ""
                    }
                    alt={item.product_title || ""}
                    className={css({
                      w: "12",
                      h: "16",
                      objectFit: "cover",
                      borderRadius: "sm",
                      flexShrink: 0,
                    })}
                  />
                )}
                <div className={css({ flex: "1", minW: "0" })}>
                  <p
                    className={css({
                      fontSize: "xs",
                      fontWeight: "medium",
                      truncate: true,
                    })}
                  >
                    {item.product_title || item.title}
                  </p>
                  <p className={css({ fontSize: "xs", color: "fg.muted" })}>
                    Qty: {item.quantity}
                  </p>
                </div>
                <p
                  className={css({
                    fontSize: "xs",
                    fontWeight: "medium",
                    flexShrink: 0,
                  })}
                >
                  {convertToLocale({
                    amount: item.total ?? 0,
                    currency_code: currencyCode,
                  })}
                </p>
              </div>
            ))}
          </div>

          <div
            className={css({
              p: "4",
              borderTopWidth: "1px",
              borderColor: "border.default",
            })}
          >
            <div
              className={css({
                display: "flex",
                justifyContent: "space-between",
                mb: "3",
              })}
            >
              <span className={css({ fontSize: "sm", fontWeight: "semibold" })}>
                Total
              </span>
              <span className={css({ fontSize: "sm", fontWeight: "semibold" })}>
                {convertToLocale({
                  amount: total,
                  currency_code: currencyCode,
                })}
              </span>
            </div>
            <div className={css({ display: "flex", gap: "2" })}>
              <a
                href={`/${countryCode}/cart`}
                onClick={() => closeCart()}
                className={css({ flex: "1", textDecoration: "none" })}
              >
                <Button
                  variant="outline"
                  size="sm"
                  className={css({ w: "full" })}
                >
                  View cart
                </Button>
              </a>
              <a
                href={`/${countryCode}/checkout`}
                onClick={() => closeCart()}
                className={css({ flex: "1", textDecoration: "none" })}
              >
                <Button size="sm" className={css({ w: "full" })}>
                  Checkout
                </Button>
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
