import { useEffect } from "react"
import type { HttpTypes } from "@medusajs/types"
import { setCart } from "@/stores/cart"

interface CartInitializerProps {
  cart: HttpTypes.StoreCart | null
}

export default function CartInitializer({ cart }: CartInitializerProps) {
  useEffect(() => {
    if (cart) setCart(cart)
  }, [cart])

  return null
}
