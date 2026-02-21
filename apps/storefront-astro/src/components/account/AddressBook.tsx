import { useState } from "react"
import type { HttpTypes } from "@medusajs/types"
import { css } from "styled-system/css"
import { Button } from "@/components/ui/button"

interface AddressBookProps {
  customer: HttpTypes.StoreCustomer
  region: HttpTypes.StoreRegion
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

const emptyAddress = {
  first_name: "",
  last_name: "",
  address_1: "",
  address_2: "",
  city: "",
  province: "",
  postal_code: "",
  country_code: "",
  phone: "",
  company: "",
}

export default function AddressBook({ customer, region }: AddressBookProps) {
  const [addresses, setAddresses] = useState(customer.addresses || [])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState(emptyAddress)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleAdd = () => {
    setForm({ ...emptyAddress, country_code: region.countries?.[0]?.iso_2 || "" })
    setEditingId(null)
    setShowForm(true)
    setError("")
  }

  const handleEdit = (addr: HttpTypes.StoreCustomerAddress) => {
    setForm({
      first_name: addr.first_name || "",
      last_name: addr.last_name || "",
      address_1: addr.address_1 || "",
      address_2: addr.address_2 || "",
      city: addr.city || "",
      province: addr.province || "",
      postal_code: addr.postal_code || "",
      country_code: addr.country_code || "",
      phone: addr.phone || "",
      company: addr.company || "",
    })
    setEditingId(addr.id)
    setShowForm(true)
    setError("")
  }

  const handleSave = async () => {
    setSaving(true)
    setError("")

    try {
      const action = editingId ? "update" : "add"
      const res = await fetch("/api/customer/addresses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, addressId: editingId, ...form }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Failed to save address")
      }

      window.location.reload()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save address")
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (addressId: string) => {
    if (!confirm("Delete this address?")) return

    try {
      const res = await fetch("/api/customer/addresses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete", addressId }),
      })

      if (!res.ok) throw new Error("Failed to delete")
      setAddresses((prev) => prev.filter((a) => a.id !== addressId))
    } catch {
      setError("Failed to delete address")
    }
  }

  return (
    <div>
      <div className={css({ display: "flex", justifyContent: "space-between", alignItems: "center", mb: "6" })}>
        <div>
          <h1 className={css({ fontSize: "2xl", fontWeight: "bold" })}>Shipping Addresses</h1>
          <p className={css({ fontSize: "sm", color: "fg.muted", mt: "1" })}>
            Manage your shipping addresses for faster checkout.
          </p>
        </div>
        {!showForm && (
          <Button size="sm" onClick={handleAdd}>
            Add new address
          </Button>
        )}
      </div>

      {error && <p className={css({ fontSize: "sm", color: "fg.error", mb: "4" })}>{error}</p>}

      {/* Add/Edit form */}
      {showForm && (
        <div className={css({ mb: "6", p: "4", borderWidth: "1px", borderColor: "border.default", borderRadius: "md" })}>
          <h3 className={css({ fontSize: "sm", fontWeight: "semibold", mb: "4" })}>
            {editingId ? "Edit Address" : "New Address"}
          </h3>

          <div className={css({ display: "flex", flexDir: "column", gap: "3" })}>
            <div className={css({ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3" })}>
              <input placeholder="First name" value={form.first_name} onChange={update("first_name")} className={inputStyles} />
              <input placeholder="Last name" value={form.last_name} onChange={update("last_name")} className={inputStyles} />
            </div>
            <input placeholder="Company (optional)" value={form.company} onChange={update("company")} className={inputStyles} />
            <input placeholder="Address" value={form.address_1} onChange={update("address_1")} className={inputStyles} />
            <input placeholder="Apartment, suite, etc." value={form.address_2} onChange={update("address_2")} className={inputStyles} />
            <div className={css({ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3" })}>
              <input placeholder="City" value={form.city} onChange={update("city")} className={inputStyles} />
              <input placeholder="State / Province" value={form.province} onChange={update("province")} className={inputStyles} />
            </div>
            <div className={css({ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3" })}>
              <input placeholder="Postal code" value={form.postal_code} onChange={update("postal_code")} className={inputStyles} />
              <select value={form.country_code} onChange={update("country_code")} className={inputStyles}>
                <option value="">Select country</option>
                {region.countries?.map((c) => (
                  <option key={c.iso_2} value={c.iso_2}>{c.display_name}</option>
                ))}
              </select>
            </div>
            <input placeholder="Phone" value={form.phone} onChange={update("phone")} className={inputStyles} />
          </div>

          <div className={css({ display: "flex", gap: "2", mt: "4" })}>
            <Button size="sm" onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : "Save"}
            </Button>
            <Button size="sm" variant="outline" onClick={() => setShowForm(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Address list */}
      {addresses.length === 0 && !showForm ? (
        <p className={css({ fontSize: "sm", color: "fg.muted" })}>
          No addresses saved yet.
        </p>
      ) : (
        <div className={css({ display: "grid", gridTemplateColumns: { base: "1fr", md: "1fr 1fr" }, gap: "4" })}>
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className={css({
                p: "4",
                borderWidth: "1px",
                borderColor: "border.default",
                borderRadius: "md",
              })}
            >
              <p className={css({ fontSize: "sm", fontWeight: "medium" })}>
                {addr.first_name} {addr.last_name}
              </p>
              {addr.company && <p className={css({ fontSize: "xs", color: "fg.muted" })}>{addr.company}</p>}
              <p className={css({ fontSize: "sm", color: "fg.muted", mt: "1" })}>
                {addr.address_1}
                {addr.address_2 && `, ${addr.address_2}`}
              </p>
              <p className={css({ fontSize: "sm", color: "fg.muted" })}>
                {addr.city}, {addr.province} {addr.postal_code}
              </p>
              <p className={css({ fontSize: "sm", color: "fg.muted" })}>
                {addr.country_code?.toUpperCase()}
              </p>
              {addr.phone && (
                <p className={css({ fontSize: "xs", color: "fg.muted", mt: "1" })}>{addr.phone}</p>
              )}

              <div className={css({ display: "flex", gap: "3", mt: "3" })}>
                <button
                  onClick={() => handleEdit(addr)}
                  className={css({ fontSize: "xs", color: "fg.muted", cursor: "pointer", _hover: { color: "fg.default" } })}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(addr.id)}
                  className={css({ fontSize: "xs", color: "fg.muted", cursor: "pointer", _hover: { color: "fg.error" } })}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
