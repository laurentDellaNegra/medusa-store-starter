import { useState } from "react"
import { css } from "styled-system/css"
import { Button } from "@/components/ui/button"

interface LoginFormProps {
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

export default function LoginForm({ onSwitch }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Invalid email or password")
      }

      window.location.reload()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={css({ maxW: "sm", w: "full", display: "flex", flexDir: "column", alignItems: "center" })}>
      <h1 className={css({ fontSize: "2xl", fontWeight: "bold", textTransform: "uppercase", mb: "4" })}>
        Welcome back
      </h1>
      <p className={css({ textAlign: "center", fontSize: "sm", color: "fg.muted", mb: "8" })}>
        Sign in to access an enhanced shopping experience.
      </p>

      <form onSubmit={handleSubmit} className={css({ w: "full", display: "flex", flexDir: "column", gap: "3" })}>
        <div>
          <label className={css({ display: "block", fontSize: "xs", fontWeight: "medium", mb: "1", color: "fg.muted" })}>
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            className={inputStyles}
          />
        </div>
        <div>
          <label className={css({ display: "block", fontSize: "xs", fontWeight: "medium", mb: "1", color: "fg.muted" })}>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            className={inputStyles}
          />
        </div>

        {error && (
          <p className={css({ fontSize: "sm", color: "fg.error" })}>{error}</p>
        )}

        <Button type="submit" disabled={loading} size="lg" className={css({ w: "full", mt: "3" })}>
          {loading ? "Signing in..." : "Sign in"}
        </Button>
      </form>

      <p className={css({ textAlign: "center", fontSize: "sm", color: "fg.muted", mt: "6" })}>
        Not a member?{" "}
        <button
          onClick={onSwitch}
          className={css({ textDecoration: "underline", cursor: "pointer", color: "fg.default" })}
        >
          Join us
        </button>
      </p>
    </div>
  )
}
