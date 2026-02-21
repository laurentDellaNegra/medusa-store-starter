import type { APIRoute } from "astro"
import { setAstroCookies } from "@/lib/data/cookies"
import { updateLineItem } from "@/lib/data/cart"

export const prerender = false

export const POST: APIRoute = async ({ request, cookies }) => {
  setAstroCookies(cookies)

  try {
    const body = await request.json()
    const { lineId, quantity } = body

    if (!lineId || !quantity) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    await updateLineItem({ lineId, quantity })

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message || "Failed to update item" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    )
  }
}
