import { atom } from "nanostores"
import type { HttpTypes } from "@medusajs/types"

export const $cart = atom<HttpTypes.StoreCart | null>(null)
export const $cartOpen = atom(false)

export function setCart(cart: HttpTypes.StoreCart | null) {
  $cart.set(cart)
}

export function toggleCart() {
  $cartOpen.set(!$cartOpen.get())
}

export function openCart() {
  $cartOpen.set(true)
}

export function closeCart() {
  $cartOpen.set(false)
}
