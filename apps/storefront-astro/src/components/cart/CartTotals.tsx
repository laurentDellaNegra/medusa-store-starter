import type { HttpTypes } from "@medusajs/types"
import { convertToLocale } from "@/lib/util/money"
import { css } from "styled-system/css"

interface CartTotalsProps {
  cart: HttpTypes.StoreCart
}

export default function CartTotals({ cart }: CartTotalsProps) {
  const {
    currency_code,
    item_subtotal,
    shipping_subtotal,
    tax_total,
    discount_total,
    total,
  } = cart

  const fmt = (amount?: number) =>
    convertToLocale({ amount: amount ?? 0, currency_code })

  return (
    <div className={css({ display: "flex", flexDir: "column", gap: "2" })}>
      <div className={css({ display: "flex", justifyContent: "space-between", fontSize: "sm" })}>
        <span className={css({ color: "fg.muted" })}>Subtotal</span>
        <span>{fmt(item_subtotal)}</span>
      </div>

      {(discount_total ?? 0) > 0 && (
        <div className={css({ display: "flex", justifyContent: "space-between", fontSize: "sm" })}>
          <span className={css({ color: "fg.muted" })}>Discount</span>
          <span className={css({ color: "fg.default" })}>- {fmt(discount_total)}</span>
        </div>
      )}

      <div className={css({ display: "flex", justifyContent: "space-between", fontSize: "sm" })}>
        <span className={css({ color: "fg.muted" })}>Shipping</span>
        <span>{shipping_subtotal ? fmt(shipping_subtotal) : "Calculated at checkout"}</span>
      </div>

      <div className={css({ display: "flex", justifyContent: "space-between", fontSize: "sm" })}>
        <span className={css({ color: "fg.muted" })}>Tax</span>
        <span>{fmt(tax_total)}</span>
      </div>

      <div className={css({ h: "1px", bg: "border.default", my: "1" })} />

      <div className={css({ display: "flex", justifyContent: "space-between", fontWeight: "semibold" })}>
        <span>Total</span>
        <span>{fmt(total)}</span>
      </div>
    </div>
  )
}
