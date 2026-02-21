import { useState } from "react"
import type { HttpTypes } from "@medusajs/types"
import { css } from "styled-system/css"
import { Button } from "@/components/ui/button"

interface ProfileFormProps {
  customer: HttpTypes.StoreCustomer
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
  _disabled: { bg: "bg.muted", color: "fg.muted" },
})

export default function ProfileForm({ customer }: ProfileFormProps) {
  return (
    <div className={css({ display: "flex", flexDir: "column", gap: "8" })}>
      <div>
        <h1 className={css({ fontSize: "2xl", fontWeight: "bold", mb: "2" })}>Profile</h1>
        <p className={css({ fontSize: "sm", color: "fg.muted" })}>
          View and update your profile information.
        </p>
      </div>

      <ProfileSection
        title="Name"
        fields={[
          { label: "First name", key: "first_name", value: customer.first_name || "" },
          { label: "Last name", key: "last_name", value: customer.last_name || "" },
        ]}
      />

      <div className={css({ h: "1px", bg: "border.default" })} />

      <ProfileSection
        title="Email"
        fields={[
          { label: "Email", key: "email", value: customer.email || "", type: "email" },
        ]}
      />

      <div className={css({ h: "1px", bg: "border.default" })} />

      <ProfileSection
        title="Phone"
        fields={[
          { label: "Phone", key: "phone", value: customer.phone || "", type: "tel" },
        ]}
      />
    </div>
  )
}

interface Field {
  label: string
  key: string
  value: string
  type?: string
}

function ProfileSection({ title, fields }: { title: string; fields: Field[] }) {
  const [editing, setEditing] = useState(false)
  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries(fields.map((f) => [f.key, f.value]))
  )
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    setError("")
    setSuccess(false)

    try {
      const res = await fetch("/api/customer/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Failed to update")
      }

      setEditing(false)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed")
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    setValues(Object.fromEntries(fields.map((f) => [f.key, f.value])))
    setEditing(false)
    setError("")
  }

  return (
    <div>
      <div className={css({ display: "flex", justifyContent: "space-between", alignItems: "center", mb: "3" })}>
        <h3 className={css({ fontSize: "sm", fontWeight: "semibold" })}>{title}</h3>
        {!editing ? (
          <button
            onClick={() => setEditing(true)}
            className={css({ fontSize: "xs", color: "fg.muted", cursor: "pointer", _hover: { color: "fg.default" } })}
          >
            Edit
          </button>
        ) : (
          <div className={css({ display: "flex", gap: "2" })}>
            <button
              onClick={handleCancel}
              className={css({ fontSize: "xs", color: "fg.muted", cursor: "pointer" })}
            >
              Cancel
            </button>
            <Button size="xs" onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : "Save"}
            </Button>
          </div>
        )}
      </div>

      <div className={css({ display: "grid", gridTemplateColumns: fields.length > 1 ? "1fr 1fr" : "1fr", gap: "3" })}>
        {fields.map((field) => (
          <div key={field.key}>
            <label className={css({ display: "block", fontSize: "xs", color: "fg.muted", mb: "1" })}>
              {field.label}
            </label>
            <input
              type={field.type || "text"}
              value={values[field.key] || ""}
              onChange={(e) => setValues((v) => ({ ...v, [field.key]: e.target.value }))}
              disabled={!editing}
              className={inputStyles}
            />
          </div>
        ))}
      </div>

      {error && <p className={css({ fontSize: "xs", color: "fg.error", mt: "2" })}>{error}</p>}
      {success && <p className={css({ fontSize: "xs", color: "fg.default", mt: "2" })}>Updated successfully</p>}
    </div>
  )
}
