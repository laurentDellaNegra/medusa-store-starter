import type { HttpTypes } from "@medusajs/types"
import { css } from "styled-system/css"
import PaymentButton from "./PaymentButton"

interface ReviewProps {
  cart: HttpTypes.StoreCart
  countryCode: string
  isOpen: boolean
}

export default function Review({ cart, countryCode, isOpen }: ReviewProps) {
  if (!isOpen) return null

  const previousStepsCompleted =
    cart.shipping_address?.address_1 &&
    cart.shipping_methods?.length &&
    cart.payment_collection?.payment_sessions?.length

  if (!previousStepsCompleted) {
    return (
      <div className={css({ p: "4", bg: "bg.muted", borderRadius: "md" })}>
        <p className={css({ fontSize: "sm", color: "fg.muted" })}>
          Please complete the previous steps before reviewing your order.
        </p>
      </div>
    )
  }

  return (
    <div className={css({ display: "flex", flexDir: "column", gap: "4" })}>
      <h2 className={css({ fontSize: "lg", fontWeight: "semibold" })}>Review</h2>

      <p className={css({ fontSize: "xs", color: "fg.muted" })}>
        By clicking the Place order button, you confirm that you have read,
        understand and accept our Terms of Use, Terms of Sale and Returns Policy
        and acknowledge that you have read the Privacy Policy.
      </p>

      <PaymentButton cart={cart} countryCode={countryCode} />
    </div>
  )
}
