import type { APIRoute } from "astro"
import { setAstroCookies } from "@/lib/data/cookies"
import { addToCart, retrieveCart } from "@/lib/data/cart"

export const prerender = false

export const POST: APIRoute = async ({ request, cookies }) => {
  setAstroCookies(cookies)

  try {
    const body = await request.json()
    const { variantId, quantity, countryCode } = body

    if (!variantId || !countryCode) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    await addToCart({ variantId, quantity: quantity || 1, countryCode })
    const cart = await retrieveCart()

    return new Response(JSON.stringify({ success: true, cart }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message || "Failed to add to cart" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    )
  }
}
