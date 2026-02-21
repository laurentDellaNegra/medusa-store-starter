import type { APIRoute } from "astro"
import { setAstroCookies } from "@/lib/data/cookies"
import { deleteLineItem } from "@/lib/data/cart"

export const prerender = false

export const POST: APIRoute = async ({ request, cookies }) => {
  setAstroCookies(cookies)

  try {
    const body = await request.json()
    const { lineId } = body

    if (!lineId) {
      return new Response(JSON.stringify({ error: "Missing lineId" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    await deleteLineItem(lineId)

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message || "Failed to delete item" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    )
  }
}
