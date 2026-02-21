import { useState, useEffect } from "react"
import type { HttpTypes } from "@medusajs/types"
import { convertToLocale } from "@/lib/util/money"
import { css } from "styled-system/css"
import { Button } from "@/components/ui/button"

interface ShippingProps {
  cart: HttpTypes.StoreCart
  shippingMethods: HttpTypes.StoreCartShippingOption[] | null
  isOpen: boolean
}

export default function Shipping({ cart, shippingMethods, isOpen }: ShippingProps) {
  const [selectedMethod, setSelectedMethod] = useState<string>(
    cart.shipping_methods?.at(-1)?.shipping_option_id || ""
  )
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [calculatedPrices, setCalculatedPrices] = useState<Record<string, number>>({})

  // Calculate prices for dynamic shipping options
  useEffect(() => {
    if (!shippingMethods) return

    const calculated = shippingMethods.filter((m) => m.price_type === "calculated")
    if (calculated.length === 0) return

    Promise.allSettled(
      calculated.map(async (method) => {
        const res = await fetch(`/api/cart/shipping-method`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cartId: cart.id,
            shippingMethodId: method.id,
            calculate: true,
          }),
        })
        if (res.ok) {
          const data = await res.json()
          return { id: method.id, amount: data.amount }
        }
        return null
      })
    ).then((results) => {
      const prices: Record<string, number> = {}
      results.forEach((r) => {
        if (r.status === "fulfilled" && r.value) {
          prices[r.value.id] = r.value.amount
        }
      })
      setCalculatedPrices(prices)
    })
  }, [shippingMethods, cart.id])

  const handleSubmit = async () => {
    if (!selectedMethod) return
    setSubmitting(true)
    setError("")

    try {
      const res = await fetch("/api/cart/shipping-method", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartId: cart.id,
          shippingMethodId: selectedMethod,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Failed to set shipping method")
      }

      window.location.href = window.location.pathname + "?step=payment"
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to set shipping")
    } finally {
      setSubmitting(false)
    }
  }

  if (!isOpen) {
    const activeMethod = cart.shipping_methods?.at(-1)
    if (activeMethod) {
      return (
        <div className={css({ p: "4", bg: "bg.muted", borderRadius: "md" })}>
          <div className={css({ display: "flex", justifyContent: "space-between", mb: "2" })}>
            <h3 className={css({ fontSize: "sm", fontWeight: "semibold" })}>Delivery</h3>
            <a
              href="?step=delivery"
              className={css({ fontSize: "xs", color: "fg.muted", _hover: { color: "fg.default" } })}
            >
              Edit
            </a>
          </div>
          <p className={css({ fontSize: "sm", color: "fg.muted" })}>
            {(activeMethod as any).name || "Shipping method selected"}
          </p>
        </div>
      )
    }
    return null
  }

  const methods = shippingMethods || []

  return (
    <div className={css({ display: "flex", flexDir: "column", gap: "4" })}>
      <h2 className={css({ fontSize: "lg", fontWeight: "semibold" })}>Delivery Method</h2>

      {methods.length === 0 ? (
        <p className={css({ fontSize: "sm", color: "fg.muted" })}>
          No shipping methods available for your address.
        </p>
      ) : (
        <div className={css({ display: "flex", flexDir: "column", gap: "2" })}>
          {methods.map((method) => {
            const price =
              method.price_type === "calculated"
                ? calculatedPrices[method.id]
                : method.amount

            return (
              <label
                key={method.id}
                className={css({
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  p: "4",
                  borderWidth: "1px",
                  borderColor: selectedMethod === method.id ? "fg.default" : "border.default",
                  borderRadius: "md",
                  cursor: "pointer",
                  transition: "border-color 0.2s",
                  _hover: { borderColor: "fg.default" },
                })}
              >
                <div className={css({ display: "flex", alignItems: "center", gap: "3" })}>
                  <input
                    type="radio"
                    name="shipping_method"
                    value={method.id}
                    checked={selectedMethod === method.id}
                    onChange={() => setSelectedMethod(method.id)}
                  />
                  <span className={css({ fontSize: "sm" })}>{method.name}</span>
                </div>
                <span className={css({ fontSize: "sm", fontWeight: "medium" })}>
                  {price != null
                    ? convertToLocale({
                        amount: price,
                        currency_code: cart.currency_code,
                      })
                    : "Calculating..."}
                </span>
              </label>
            )
          })}
        </div>
      )}

      {error && <p className={css({ fontSize: "sm", color: "fg.error" })}>{error}</p>}

      <Button onClick={handleSubmit} disabled={submitting || !selectedMethod} size="lg">
        {submitting ? "Saving..." : "Continue to payment"}
      </Button>
    </div>
  )
}
