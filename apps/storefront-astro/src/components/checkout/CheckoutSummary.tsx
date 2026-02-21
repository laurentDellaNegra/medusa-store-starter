import type { HttpTypes } from "@medusajs/types"
import { convertToLocale } from "@/lib/util/money"
import { css } from "styled-system/css"
import CartTotals from "@/components/cart/CartTotals"
import DiscountCode from "./DiscountCode"

interface CheckoutSummaryProps {
  cart: HttpTypes.StoreCart
}

export default function CheckoutSummary({ cart }: CheckoutSummaryProps) {
  const items = cart.items || []
  const appliedCodes = (cart.promotions || []).map((p: any) => p.code).filter(Boolean)

  const handleApplyPromotion = async (codes: string[]) => {
    const res = await fetch("/api/cart/promotions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ codes }),
    })
    if (!res.ok) throw new Error("Failed to apply promotion")
    window.location.reload()
  }

  return (
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

      {/* Line items */}
      <div className={css({ display: "flex", flexDir: "column", gap: "3" })}>
        {items.map((item) => (
          <div key={item.id} className={css({ display: "flex", gap: "3" })}>
            {(item.thumbnail || item.variant?.product?.thumbnail) && (
              <img
                src={item.thumbnail || item.variant?.product?.thumbnail || ""}
                alt={item.product_title || ""}
                className={css({
                  w: "14",
                  h: "18",
                  objectFit: "cover",
                  borderRadius: "sm",
                  flexShrink: 0,
                })}
              />
            )}
            <div className={css({ flex: "1", minW: 0 })}>
              <p className={css({ fontSize: "sm", fontWeight: "medium", truncate: true })}>
                {item.product_title || item.title}
              </p>
              <p className={css({ fontSize: "xs", color: "fg.muted" })}>
                Qty: {item.quantity}
              </p>
            </div>
            <p className={css({ fontSize: "sm", fontWeight: "medium", flexShrink: 0 })}>
              {convertToLocale({
                amount: item.total ?? 0,
                currency_code: cart.currency_code,
              })}
            </p>
          </div>
        ))}
      </div>

      <div className={css({ h: "1px", bg: "border.default" })} />

      <DiscountCode appliedCodes={appliedCodes} onApply={handleApplyPromotion} />

      <div className={css({ h: "1px", bg: "border.default" })} />

      <CartTotals cart={cart} />
    </div>
  )
}
