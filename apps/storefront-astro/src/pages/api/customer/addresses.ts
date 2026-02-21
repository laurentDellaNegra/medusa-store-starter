import type { APIRoute } from "astro"
import { setAstroCookies } from "@/lib/data/cookies"
import {
  addCustomerAddress,
  updateCustomerAddress,
  deleteCustomerAddress,
} from "@/lib/data/customer"

export const prerender = false

export const POST: APIRoute = async ({ request, cookies }) => {
  setAstroCookies(cookies)

  try {
    const body = await request.json()
    const { action, addressId, ...address } = body

    let result
    switch (action) {
      case "add":
        result = await addCustomerAddress(address)
        break
      case "update":
        if (!addressId) throw new Error("Address ID is required for update")
        result = await updateCustomerAddress(addressId, address)
        break
      case "delete":
        if (!addressId) throw new Error("Address ID is required for delete")
        result = await deleteCustomerAddress(addressId)
        break
      default:
        throw new Error(`Unknown action: ${action}`)
    }

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Address operation failed"
    return new Response(JSON.stringify({ error: message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    })
  }
}
