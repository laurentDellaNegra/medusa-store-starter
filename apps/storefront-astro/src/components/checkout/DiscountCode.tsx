import { useState } from "react"
import { css } from "styled-system/css"
import { Button } from "@/components/ui/button"

interface DiscountCodeProps {
  appliedCodes: string[]
  onApply: (codes: string[]) => Promise<void>
}

export default function DiscountCode({ appliedCodes, onApply }: DiscountCodeProps) {
  const [code, setCode] = useState("")
  const [applying, setApplying] = useState(false)
  const [error, setError] = useState("")

  const handleApply = async () => {
    if (!code.trim()) return
    setApplying(true)
    setError("")
    try {
      await onApply([...appliedCodes, code.trim()])
      setCode("")
    } catch {
      setError("Failed to apply discount code")
    } finally {
      setApplying(false)
    }
  }

  const handleRemove = async (codeToRemove: string) => {
    setApplying(true)
    try {
      await onApply(appliedCodes.filter((c) => c !== codeToRemove))
    } finally {
      setApplying(false)
    }
  }

  return (
    <div className={css({ display: "flex", flexDir: "column", gap: "2" })}>
      <div className={css({ display: "flex", gap: "2" })}>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Discount code"
          className={css({
            flex: "1",
            h: "10",
            px: "3",
            borderWidth: "1px",
            borderColor: "border.default",
            borderRadius: "md",
            fontSize: "sm",
            _focus: { outline: "none", borderColor: "fg.default" },
          })}
        />
        <Button size="sm" onClick={handleApply} disabled={applying || !code.trim()}>
          {applying ? "..." : "Apply"}
        </Button>
      </div>
      {error && <p className={css({ fontSize: "xs", color: "fg.error" })}>{error}</p>}
      {appliedCodes.length > 0 && (
        <div className={css({ display: "flex", flexWrap: "wrap", gap: "1" })}>
          {appliedCodes.map((c) => (
            <span
              key={c}
              className={css({
                display: "inline-flex",
                alignItems: "center",
                gap: "1",
                px: "2",
                py: "0.5",
                bg: "bg.muted",
                borderRadius: "sm",
                fontSize: "xs",
              })}
            >
              {c}
              <button
                onClick={() => handleRemove(c)}
                className={css({ cursor: "pointer", color: "fg.muted", _hover: { color: "fg.default" } })}
              >
                &times;
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
