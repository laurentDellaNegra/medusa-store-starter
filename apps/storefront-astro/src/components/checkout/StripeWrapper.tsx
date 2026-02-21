import { useMemo, type ReactNode } from "react"
import type { HttpTypes } from "@medusajs/types"
import { isStripeLike } from "@/lib/constants"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

interface StripeWrapperProps {
  cart: HttpTypes.StoreCart
  children: ReactNode
}

export default function StripeWrapper({ cart, children }: StripeWrapperProps) {
  const activeSession = cart.payment_collection?.payment_sessions?.find(
    (s: any) => s.status === "pending"
  )

  const isStripe = activeSession && isStripeLike(activeSession.provider_id)
  const clientSecret = (activeSession?.data as any)?.client_secret as string | undefined

  const stripePromise = useMemo(() => {
    const stripeKey =
      (import.meta as any).env?.PUBLIC_STRIPE_KEY ||
      (import.meta as any).env?.PUBLIC_MEDUSA_PAYMENTS_PUBLISHABLE_KEY

    if (!stripeKey) return null

    const accountId = (import.meta as any).env?.PUBLIC_MEDUSA_PAYMENTS_ACCOUNT_ID

    return loadStripe(stripeKey, accountId ? { stripeAccount: accountId } : undefined)
  }, [])

  if (!isStripe || !clientSecret || !stripePromise) {
    return <>{children}</>
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
      }}
    >
      {children}
    </Elements>
  )
}
