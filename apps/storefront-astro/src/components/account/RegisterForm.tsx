import { useState } from "react"
import { css } from "styled-system/css"
import { Button } from "@/components/ui/button"

interface RegisterFormProps {
  onSwitch: () => void
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

export default function RegisterForm({ onSwitch }: RegisterFormProps) {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Registration failed")
      }

      window.location.reload()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={css({ maxW: "sm", w: "full", display: "flex", flexDir: "column", alignItems: "center" })}>
      <h1 className={css({ fontSize: "2xl", fontWeight: "bold", textTransform: "uppercase", mb: "4" })}>
        Become a Member
      </h1>
      <p className={css({ textAlign: "center", fontSize: "sm", color: "fg.muted", mb: "6" })}>
        Create your account and get access to an enhanced shopping experience.
      </p>

      <form onSubmit={handleSubmit} className={css({ w: "full", display: "flex", flexDir: "column", gap: "3" })}>
        <div className={css({ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3" })}>
          <div>
            <label className={css({ display: "block", fontSize: "xs", fontWeight: "medium", mb: "1", color: "fg.muted" })}>
              First name
            </label>
            <input
              type="text"
              value={form.first_name}
              onChange={update("first_name")}
              required
              autoComplete="given-name"
              className={inputStyles}
            />
          </div>
          <div>
            <label className={css({ display: "block", fontSize: "xs", fontWeight: "medium", mb: "1", color: "fg.muted" })}>
              Last name
            </label>
            <input
              type="text"
              value={form.last_name}
              onChange={update("last_name")}
              required
              autoComplete="family-name"
              className={inputStyles}
            />
          </div>
        </div>

        <div>
          <label className={css({ display: "block", fontSize: "xs", fontWeight: "medium", mb: "1", color: "fg.muted" })}>
            Email
          </label>
          <input
            type="email"
            value={form.email}
            onChange={update("email")}
            required
            autoComplete="email"
            className={inputStyles}
          />
        </div>

        <div>
          <label className={css({ display: "block", fontSize: "xs", fontWeight: "medium", mb: "1", color: "fg.muted" })}>
            Phone
          </label>
          <input
            type="tel"
            value={form.phone}
            onChange={update("phone")}
            autoComplete="tel"
            className={inputStyles}
          />
        </div>

        <div>
          <label className={css({ display: "block", fontSize: "xs", fontWeight: "medium", mb: "1", color: "fg.muted" })}>
            Password
          </label>
          <input
            type="password"
            value={form.password}
            onChange={update("password")}
            required
            autoComplete="new-password"
            className={inputStyles}
          />
        </div>

        {error && (
          <p className={css({ fontSize: "sm", color: "fg.error" })}>{error}</p>
        )}

        <Button type="submit" disabled={loading} size="lg" className={css({ w: "full", mt: "3" })}>
          {loading ? "Creating account..." : "Join"}
        </Button>
      </form>

      <p className={css({ textAlign: "center", fontSize: "sm", color: "fg.muted", mt: "6" })}>
        Already a member?{" "}
        <button
          onClick={onSwitch}
          className={css({ textDecoration: "underline", cursor: "pointer", color: "fg.default" })}
        >
          Sign in
        </button>
      </p>
    </div>
  )
}
