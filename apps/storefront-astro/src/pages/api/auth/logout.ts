import type { APIRoute } from "astro"
import { setAstroCookies } from "@/lib/data/cookies"
import { signout } from "@/lib/data/customer"

export const prerender = false

export const POST: APIRoute = async ({ cookies }) => {
  setAstroCookies(cookies)

  try {
    await signout()
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Logout failed"
    return new Response(JSON.stringify({ error: message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    })
  }
}
