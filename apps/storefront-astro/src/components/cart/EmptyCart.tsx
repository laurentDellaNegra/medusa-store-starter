import { ShoppingCart } from "lucide-react"
import { css } from "styled-system/css"

interface EmptyCartProps {
  countryCode: string
}

export default function EmptyCart({ countryCode }: EmptyCartProps) {
  return (
    <div
      className={css({
        display: "flex",
        flexDir: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "4",
        py: "20",
        textAlign: "center",
      })}
    >
      <ShoppingCart size={48} className={css({ color: "fg.disabled" })} />
      <div>
        <p className={css({ fontSize: "lg", fontWeight: "medium" })}>
          Your cart is empty
        </p>
        <p className={css({ fontSize: "sm", color: "fg.muted", mt: "1" })}>
          Add items to your cart to get started.
        </p>
      </div>
      <a
        href={`/${countryCode}/store`}
        className={css({
          mt: "2",
          px: "6",
          py: "3",
          bg: "bg.inverted",
          color: "fg.inverted",
          borderRadius: "md",
          fontSize: "sm",
          fontWeight: "medium",
          textDecoration: "none",
          _hover: { opacity: 0.9 },
        })}
      >
        Continue shopping
      </a>
    </div>
  )
}
