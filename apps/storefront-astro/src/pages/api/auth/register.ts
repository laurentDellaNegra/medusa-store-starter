import type { APIRoute } from "astro"
import { setAstroCookies } from "@/lib/data/cookies"
import { signup } from "@/lib/data/customer"

export const prerender = false

export const POST: APIRoute = async ({ request, cookies }) => {
  setAstroCookies(cookies)

  try {
    const { email, password, first_name, last_name, phone } = await request.json()

    if (!email || !password || !first_name || !last_name) {
      return new Response(
        JSON.stringify({ error: "Email, password, first name, and last name are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      )
    }

    await signup({ email, password, first_name, last_name, phone })

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Registration failed"
    return new Response(JSON.stringify({ error: message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    })
  }
}
