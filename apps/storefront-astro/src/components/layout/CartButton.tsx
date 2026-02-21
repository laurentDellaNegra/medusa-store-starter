import { useStore } from "@nanostores/react"
import { ShoppingCart } from "lucide-react"
import { $cart, toggleCart } from "@/stores/cart"
import { css } from "styled-system/css"
import CartDropdown from "./CartDropdown"

interface CartButtonProps {
  countryCode: string
}

export default function CartButton({ countryCode }: CartButtonProps) {
  const cart = useStore($cart)
  const itemCount = cart?.items?.length ?? 0

  return (
    <div className={css({ position: "relative" })}>
      <button
        onClick={toggleCart}
        className={css({
          display: "flex",
          alignItems: "center",
          gap: "2",
          color: "fg.muted",
          cursor: "pointer",
          bg: "transparent",
          _hover: { color: "fg.default" },
        })}
      >
        <ShoppingCart size={20} />
        <span className={css({ fontSize: "sm" })}>Cart ({itemCount})</span>
      </button>
      <CartDropdown countryCode={countryCode} />
    </div>
  )
}
