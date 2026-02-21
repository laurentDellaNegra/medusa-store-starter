import { useState } from "react"
import type { HttpTypes } from "@medusajs/types"
import { paymentInfoMap, isStripeLike } from "@/lib/constants"
import { css } from "styled-system/css"
import { Button } from "@/components/ui/button"
import { CardElement } from "@stripe/react-stripe-js"

interface PaymentProps {
  cart: HttpTypes.StoreCart
  paymentMethods: HttpTypes.StorePaymentProvider[] | null
  isOpen: boolean
  stripeReady: boolean
}

export default function Payment({
  cart,
  paymentMethods,
  isOpen,
  stripeReady,
}: PaymentProps) {
  const activeSession = cart.payment_collection?.payment_sessions?.find(
    (s: any) => s.status === "pending"
  )

  const [selectedMethod, setSelectedMethod] = useState<string>(
    activeSession?.provider_id || ""
  )
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  const handleSelectMethod = async (providerId: string) => {
    setSelectedMethod(providerId)
    setError("")

    // For Stripe-like providers, initiate payment session immediately
    if (isStripeLike(providerId)) {
      try {
        const res = await fetch("/api/cart/payment-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ provider_id: providerId }),
        })
        if (!res.ok) {
          const data = await res.json()
          throw new Error(data.error || "Failed to initiate payment session")
        }
        // Reload to get the Stripe Elements wrapper with the new client_secret
        window.location.reload()
      } catch (err) {
        setError(err instanceof Error ? err.message : "Payment session error")
      }
    }
  }

  const handleSubmit = async () => {
    if (!selectedMethod) return
    setSubmitting(true)
    setError("")

    try {
      // For non-Stripe providers, initiate session now
      if (!isStripeLike(selectedMethod) && activeSession?.provider_id !== selectedMethod) {
        const res = await fetch("/api/cart/payment-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ provider_id: selectedMethod }),
        })
        if (!res.ok) {
          throw new Error("Failed to initiate payment session")
        }
      }

      window.location.href = window.location.pathname + "?step=review"
    } catch (err) {
      setError(err instanceof Error ? err.message : "Payment error")
    } finally {
      setSubmitting(false)
    }
  }

  if (!isOpen) {
    if (activeSession) {
      const info = paymentInfoMap[activeSession.provider_id]
      return (
        <div className={css({ p: "4", bg: "bg.muted", borderRadius: "md" })}>
          <div className={css({ display: "flex", justifyContent: "space-between", mb: "2" })}>
            <h3 className={css({ fontSize: "sm", fontWeight: "semibold" })}>Payment</h3>
            <a
              href="?step=payment"
              className={css({ fontSize: "xs", color: "fg.muted", _hover: { color: "fg.default" } })}
            >
              Edit
            </a>
          </div>
          <p className={css({ fontSize: "sm", color: "fg.muted" })}>
            {info?.title || activeSession.provider_id}
          </p>
        </div>
      )
    }
    return null
  }

  const methods = paymentMethods || []

  return (
    <div className={css({ display: "flex", flexDir: "column", gap: "4" })}>
      <h2 className={css({ fontSize: "lg", fontWeight: "semibold" })}>Payment Method</h2>

      {methods.length === 0 ? (
        <p className={css({ fontSize: "sm", color: "fg.muted" })}>
          No payment methods available.
        </p>
      ) : (
        <div className={css({ display: "flex", flexDir: "column", gap: "2" })}>
          {methods.map((method) => {
            const info = paymentInfoMap[method.id]
            const isSelected = selectedMethod === method.id

            return (
              <label
                key={method.id}
                className={css({
                  p: "4",
                  borderWidth: "1px",
                  borderColor: isSelected ? "fg.default" : "border.default",
                  borderRadius: "md",
                  cursor: "pointer",
                  transition: "border-color 0.2s",
                  _hover: { borderColor: "fg.default" },
                })}
              >
                <div className={css({ display: "flex", alignItems: "center", gap: "3" })}>
                  <input
                    type="radio"
                    name="payment_method"
                    value={method.id}
                    checked={isSelected}
                    onChange={() => handleSelectMethod(method.id)}
                  />
                  <span className={css({ fontSize: "sm" })}>
                    {info?.title || method.id}
                  </span>
                </div>

                {/* Show Stripe Card Element for Stripe-like providers */}
                {isSelected && isStripeLike(method.id) && stripeReady && (
                  <div className={css({ mt: "3", p: "3", borderWidth: "1px", borderColor: "border.default", borderRadius: "md" })}>
                    <CardElement
                      options={{
                        style: {
                          base: {
                            fontFamily: "Inter, sans-serif",
                            fontSize: "14px",
                            color: "#1a1a1a",
                          },
                        },
                      }}
                    />
                  </div>
                )}
              </label>
            )
          })}
        </div>
      )}

      {error && <p className={css({ fontSize: "sm", color: "fg.error" })}>{error}</p>}

      <Button onClick={handleSubmit} disabled={submitting || !selectedMethod} size="lg">
        {submitting ? "Processing..." : "Continue to review"}
      </Button>
    </div>
  )
}
