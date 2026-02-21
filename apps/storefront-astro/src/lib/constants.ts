export const paymentInfoMap: Record<string, { title: string }> = {
  pp_stripe_stripe: { title: "Credit card" },
  "pp_medusa-payments_default": { title: "Credit card" },
  "pp_stripe-ideal_stripe": { title: "iDeal" },
  "pp_stripe-bancontact_stripe": { title: "Bancontact" },
  pp_paypal_paypal: { title: "PayPal" },
  pp_system_default: { title: "Manual Payment" },
}

export const isStripeLike = (providerId?: string) => {
  return (
    providerId?.startsWith("pp_stripe_") ||
    providerId?.startsWith("pp_medusa-")
  )
}

export const isPaypal = (providerId?: string) => {
  return providerId?.startsWith("pp_paypal")
}

export const isManual = (providerId?: string) => {
  return providerId?.startsWith("pp_system_default")
}

export const noDivisionCurrencies = [
  "krw", "jpy", "vnd", "clp", "pyg", "xaf", "xof", "bif",
  "djf", "gnf", "kmf", "mga", "rwf", "xpf", "htg", "vuv",
  "xag", "xdr", "xau",
]
