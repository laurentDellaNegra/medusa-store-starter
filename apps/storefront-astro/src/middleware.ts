import { defineMiddleware } from "astro:middleware"
import type { HttpTypes } from "@medusajs/types"
import { setAstroCookies } from "@/lib/data/cookies"

const BACKEND_URL =
  process.env.MEDUSA_BACKEND_URL || "http://localhost:9000"
const PUBLISHABLE_API_KEY = import.meta.env.PUBLIC_MEDUSA_PUBLISHABLE_KEY
const DEFAULT_REGION = import.meta.env.PUBLIC_DEFAULT_REGION || "us"

const regionMapCache = {
  regionMap: new Map<string, HttpTypes.StoreRegion>(),
  regionMapUpdated: 0,
}

async function getRegionMap() {
  const { regionMap, regionMapUpdated } = regionMapCache

  if (regionMap.size > 0 && regionMapUpdated > Date.now() - 3600 * 1000) {
    return regionMap
  }

  const { regions } = await fetch(`${BACKEND_URL}/store/regions`, {
    headers: { "x-publishable-api-key": PUBLISHABLE_API_KEY! },
  }).then(async (response) => {
    const json = await response.json()
    if (!response.ok) throw new Error(json.message)
    return json
  })

  if (!regions?.length) {
    throw new Error("No regions found. Please set up regions in Medusa Admin.")
  }

  regionMapCache.regionMap.clear()
  regions.forEach((region: HttpTypes.StoreRegion) => {
    region.countries?.forEach((c) => {
      regionMapCache.regionMap.set(c.iso_2 ?? "", region)
    })
  })
  regionMapCache.regionMapUpdated = Date.now()

  return regionMapCache.regionMap
}

function getCountryCode(
  url: URL,
  regionMap: Map<string, HttpTypes.StoreRegion>
): string | undefined {
  const urlCountryCode = url.pathname.split("/")[1]?.toLowerCase()

  if (urlCountryCode && regionMap.has(urlCountryCode)) {
    return urlCountryCode
  }

  if (regionMap.has(DEFAULT_REGION)) {
    return DEFAULT_REGION
  }

  return regionMap.keys().next().value
}

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, cookies } = context
  const pathname = url.pathname

  // Skip API routes and static assets
  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_astro/") ||
    pathname.includes(".")
  ) {
    return next()
  }

  // Make cookies available to data layer
  setAstroCookies(cookies)

  // Set cache ID cookie if not present
  if (!cookies.get("_medusa_cache_id")?.value) {
    cookies.set("_medusa_cache_id", crypto.randomUUID(), {
      maxAge: 60 * 60 * 24,
      path: "/",
    })
  }

  let regionMap: Map<string, HttpTypes.StoreRegion>
  try {
    regionMap = await getRegionMap()
  } catch {
    // Backend unavailable — check if URL already has a plausible country code
    const firstSegment = pathname.split("/")[1]?.toLowerCase()
    if (firstSegment && firstSegment.length === 2) {
      return next()
    }
    // Redirect to default region so pages can render (and show errors if needed)
    const redirectPath = pathname === "/" ? "" : pathname
    return context.redirect(`/${DEFAULT_REGION}${redirectPath}${url.search || ""}`, 307)
  }

  const countryCode = getCountryCode(url, regionMap)

  if (!countryCode) {
    return new Response(
      "No valid regions configured. Please set up regions in Medusa Admin.",
      { status: 500 }
    )
  }

  const urlCountryCode = pathname.split("/")[1]?.toLowerCase()
  const urlHasCountryCode = urlCountryCode && regionMap.has(urlCountryCode)

  if (urlHasCountryCode) {
    return next()
  }

  // Redirect to add country code
  const redirectPath = pathname === "/" ? "" : pathname
  const queryString = url.search || ""
  return context.redirect(`/${countryCode}${redirectPath}${queryString}`, 307)
})
