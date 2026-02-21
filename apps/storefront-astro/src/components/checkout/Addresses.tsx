import { useState } from "react"
import type { HttpTypes } from "@medusajs/types"
import { css } from "styled-system/css"
import { Button } from "@/components/ui/button"
import CountrySelect from "./CountrySelect"

interface AddressesProps {
  cart: HttpTypes.StoreCart
  customer: HttpTypes.StoreCustomer | null
  isOpen: boolean
}

const inputStyles = css({
  w: "full",
  h: "10",
  px: "3",
  borderWidth: "1px",
  borderColor: "border.default",
  borderRadius: "md",
  fontSize: "sm",
  _focus: { outline: "none", borderColor: "fg.default" },
})

export default function Addresses({ cart, customer, isOpen }: AddressesProps) {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [sameAsBilling, setSameAsBilling] = useState(true)

  const [shipping, setShipping] = useState({
    first_name: cart.shipping_address?.first_name || customer?.first_name || "",
    last_name: cart.shipping_address?.last_name || customer?.last_name || "",
    address_1: cart.shipping_address?.address_1 || "",
    address_2: cart.shipping_address?.address_2 || "",
    city: cart.shipping_address?.city || "",
    province: cart.shipping_address?.province || "",
    postal_code: cart.shipping_address?.postal_code || "",
    country_code: cart.shipping_address?.country_code || cart.region?.countries?.[0]?.iso_2 || "",
    phone: cart.shipping_address?.phone || customer?.phone || "",
  })

  const [billing, setBilling] = useState({
    first_name: cart.billing_address?.first_name || "",
    last_name: cart.billing_address?.last_name || "",
    address_1: cart.billing_address?.address_1 || "",
    address_2: cart.billing_address?.address_2 || "",
    city: cart.billing_address?.city || "",
    province: cart.billing_address?.province || "",
    postal_code: cart.billing_address?.postal_code || "",
    country_code: cart.billing_address?.country_code || "",
    phone: cart.billing_address?.phone || "",
  })

  const [email, setEmail] = useState(cart.email || customer?.email || "")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError("")

    try {
      const billingAddress = sameAsBilling ? shipping : billing

      const res = await fetch("/api/cart/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          shipping_address: shipping,
          billing_address: billingAddress,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Failed to update addresses")
      }

      window.location.href = window.location.pathname + "?step=delivery"
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update addresses")
    } finally {
      setSubmitting(false)
    }
  }

  if (!isOpen) {
    const addr = cart.shipping_address
    if (addr?.address_1) {
      return (
        <div className={css({ p: "4", bg: "bg.muted", borderRadius: "md" })}>
          <div className={css({ display: "flex", justifyContent: "space-between", mb: "2" })}>
            <h3 className={css({ fontSize: "sm", fontWeight: "semibold" })}>Shipping Address</h3>
            <a
              href="?step=address"
              className={css({ fontSize: "xs", color: "fg.muted", _hover: { color: "fg.default" } })}
            >
              Edit
            </a>
          </div>
          <p className={css({ fontSize: "sm", color: "fg.muted" })}>
            {addr.first_name} {addr.last_name}<br />
            {addr.address_1}{addr.address_2 ? `, ${addr.address_2}` : ""}<br />
            {addr.city}, {addr.province} {addr.postal_code}<br />
            {addr.country_code?.toUpperCase()}
          </p>
          {cart.email && (
            <p className={css({ fontSize: "sm", color: "fg.muted", mt: "1" })}>{cart.email}</p>
          )}
        </div>
      )
    }
    return null
  }

  const renderField = (
    label: string,
    value: string,
    onChange: (v: string) => void,
    props?: Record<string, unknown>
  ) => (
    <div>
      <label className={css({ display: "block", fontSize: "xs", fontWeight: "medium", mb: "1", color: "fg.muted" })}>
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputStyles}
        {...props}
      />
    </div>
  )

  return (
    <form onSubmit={handleSubmit} className={css({ display: "flex", flexDir: "column", gap: "6" })}>
      <h2 className={css({ fontSize: "lg", fontWeight: "semibold" })}>Shipping Address</h2>

      <div>
        <label className={css({ display: "block", fontSize: "xs", fontWeight: "medium", mb: "1", color: "fg.muted" })}>
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={inputStyles}
        />
      </div>

      <div className={css({ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3" })}>
        {renderField("First name", shipping.first_name, (v) => setShipping((s) => ({ ...s, first_name: v })))}
        {renderField("Last name", shipping.last_name, (v) => setShipping((s) => ({ ...s, last_name: v })))}
      </div>

      {renderField("Address", shipping.address_1, (v) => setShipping((s) => ({ ...s, address_1: v })))}
      {renderField("Apartment, suite, etc.", shipping.address_2, (v) => setShipping((s) => ({ ...s, address_2: v })))}

      <div className={css({ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3" })}>
        {renderField("City", shipping.city, (v) => setShipping((s) => ({ ...s, city: v })))}
        {renderField("State / Province", shipping.province, (v) => setShipping((s) => ({ ...s, province: v })))}
      </div>

      <div className={css({ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3" })}>
        {renderField("Postal code", shipping.postal_code, (v) => setShipping((s) => ({ ...s, postal_code: v })))}
        <div>
          <label className={css({ display: "block", fontSize: "xs", fontWeight: "medium", mb: "1", color: "fg.muted" })}>
            Country
          </label>
          {cart.region && (
            <CountrySelect
              region={cart.region}
              value={shipping.country_code}
              onChange={(v) => setShipping((s) => ({ ...s, country_code: v }))}
              name="shipping_country"
            />
          )}
        </div>
      </div>

      {renderField("Phone", shipping.phone, (v) => setShipping((s) => ({ ...s, phone: v })))}

      {/* Same as billing toggle */}
      <label className={css({ display: "flex", alignItems: "center", gap: "2", cursor: "pointer" })}>
        <input
          type="checkbox"
          checked={sameAsBilling}
          onChange={(e) => setSameAsBilling(e.target.checked)}
        />
        <span className={css({ fontSize: "sm" })}>Billing address same as shipping</span>
      </label>

      {!sameAsBilling && (
        <div className={css({ display: "flex", flexDir: "column", gap: "3", pt: "4", borderTopWidth: "1px", borderColor: "border.default" })}>
          <h3 className={css({ fontSize: "md", fontWeight: "semibold" })}>Billing Address</h3>
          <div className={css({ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3" })}>
            {renderField("First name", billing.first_name, (v) => setBilling((s) => ({ ...s, first_name: v })))}
            {renderField("Last name", billing.last_name, (v) => setBilling((s) => ({ ...s, last_name: v })))}
          </div>
          {renderField("Address", billing.address_1, (v) => setBilling((s) => ({ ...s, address_1: v })))}
          {renderField("Apartment, suite, etc.", billing.address_2, (v) => setBilling((s) => ({ ...s, address_2: v })))}
          <div className={css({ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3" })}>
            {renderField("City", billing.city, (v) => setBilling((s) => ({ ...s, city: v })))}
            {renderField("State / Province", billing.province, (v) => setBilling((s) => ({ ...s, province: v })))}
          </div>
          <div className={css({ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3" })}>
            {renderField("Postal code", billing.postal_code, (v) => setBilling((s) => ({ ...s, postal_code: v })))}
            <div>
              <label className={css({ display: "block", fontSize: "xs", fontWeight: "medium", mb: "1", color: "fg.muted" })}>
                Country
              </label>
              {cart.region && (
                <CountrySelect
                  region={cart.region}
                  value={billing.country_code}
                  onChange={(v) => setBilling((s) => ({ ...s, country_code: v }))}
                  name="billing_country"
                />
              )}
            </div>
          </div>
          {renderField("Phone", billing.phone, (v) => setBilling((s) => ({ ...s, phone: v })))}
        </div>
      )}

      {error && <p className={css({ fontSize: "sm", color: "fg.error" })}>{error}</p>}

      <Button type="submit" disabled={submitting} size="lg">
        {submitting ? "Saving..." : "Continue to delivery"}
      </Button>
    </form>
  )
}
