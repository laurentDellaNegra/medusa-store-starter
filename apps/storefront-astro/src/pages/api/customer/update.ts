import type { APIRoute } from "astro"
import { setAstroCookies } from "@/lib/data/cookies"
import { updateCustomer } from "@/lib/data/customer"

export const prerender = false

export const POST: APIRoute = async ({ request, cookies }) => {
  setAstroCookies(cookies)

  try {
    const body = await request.json()
    const customer = await updateCustomer(body)
    return new Response(JSON.stringify({ customer }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Failed to update profile"
    return new Response(JSON.stringify({ error: message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    })
  }
}
