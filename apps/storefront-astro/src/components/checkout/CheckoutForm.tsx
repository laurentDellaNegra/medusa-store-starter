import { useState, useEffect } from "react"
import type { HttpTypes } from "@medusajs/types"
import { isStripeLike } from "@/lib/constants"
import { css } from "styled-system/css"
import Addresses from "./Addresses"
import Shipping from "./Shipping"
import Payment from "./Payment"
import Review from "./Review"
import CheckoutSummary from "./CheckoutSummary"
import StripeWrapper from "./StripeWrapper"

interface CheckoutFormProps {
  cart: HttpTypes.StoreCart
  customer: HttpTypes.StoreCustomer | null
  shippingMethods: HttpTypes.StoreCartShippingOption[] | null
  paymentMethods: HttpTypes.StorePaymentProvider[] | null
  countryCode: string
}

export default function CheckoutForm({
  cart,
  customer,
  shippingMethods,
  paymentMethods,
  countryCode,
}: CheckoutFormProps) {
  const [step, setStep] = useState("address")

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setStep(params.get("step") || "address")
  }, [])

  const activeSession = cart.payment_collection?.payment_sessions?.find(
    (s: any) => s.status === "pending"
  )
  const stripeReady = !!activeSession && isStripeLike(activeSession.provider_id) && !!(activeSession.data as any)?.client_secret

  return (
    <StripeWrapper cart={cart}>
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
        {/* Left column — Steps */}
        <div className={css({ display: "flex", flexDir: "column", gap: "6" })}>
          {/* Step indicators */}
          <div className={css({ display: "flex", gap: "2", fontSize: "xs", color: "fg.muted" })}>
            {["address", "delivery", "payment", "review"].map((s, i) => (
              <span key={s} className={css({ fontWeight: step === s ? "bold" : "normal", color: step === s ? "fg.default" : "fg.muted" })}>
                {i > 0 && <span className={css({ mx: "2" })}>&rarr;</span>}
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </span>
            ))}
          </div>

          {/* Step 1: Addresses */}
          <Addresses cart={cart} customer={customer} isOpen={step === "address"} />

          {/* Step 2: Shipping */}
          <Shipping cart={cart} shippingMethods={shippingMethods} isOpen={step === "delivery"} />

          {/* Step 3: Payment */}
          <Payment cart={cart} paymentMethods={paymentMethods} isOpen={step === "payment"} stripeReady={stripeReady} />

          {/* Step 4: Review */}
          <Review cart={cart} countryCode={countryCode} isOpen={step === "review"} />
        </div>

        {/* Right column — Summary */}
        <CheckoutSummary cart={cart} />
      </div>
    </StripeWrapper>
  )
}
