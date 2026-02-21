import type { APIRoute } from "astro"
import { setAstroCookies } from "@/lib/data/cookies"
import { login } from "@/lib/data/customer"

export const prerender = false

export const POST: APIRoute = async ({ request, cookies }) => {
  setAstroCookies(cookies)

  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return new Response(JSON.stringify({ error: "Email and password are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    await login({ email, password })

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Login failed"
    return new Response(JSON.stringify({ error: message }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    })
  }
}
