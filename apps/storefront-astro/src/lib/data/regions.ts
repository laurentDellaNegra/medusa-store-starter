import { sdk } from "@/lib/sdk"
import type { HttpTypes } from "@medusajs/types"

const regionMapCache = {
  regionMap: new Map<string, HttpTypes.StoreRegion>(),
  regionMapUpdated: 0,
}

export const listRegions = async (): Promise<HttpTypes.StoreRegion[]> => {
  return sdk.client
    .fetch<{ regions: HttpTypes.StoreRegion[] }>(`/store/regions`, {
      method: "GET",
    })
    .then(({ regions }) => regions)
}

export const retrieveRegion = async (
  id: string
): Promise<HttpTypes.StoreRegion> => {
  return sdk.client
    .fetch<{ region: HttpTypes.StoreRegion }>(`/store/regions/${id}`, {
      method: "GET",
    })
    .then(({ region }) => region)
}

export const getRegion = async (
  countryCode: string
): Promise<HttpTypes.StoreRegion | undefined> => {
  try {
    const { regionMap, regionMapUpdated } = regionMapCache

    if (
      regionMap.size > 0 &&
      regionMapUpdated > Date.now() - 3600 * 1000
    ) {
      return regionMap.get(countryCode)
    }

    const regions = await listRegions()

    if (!regions) return undefined

    regionMapCache.regionMap.clear()
    regions.forEach((region) => {
      region.countries?.forEach((c) => {
        regionMapCache.regionMap.set(c?.iso_2 ?? "", region)
      })
    })
    regionMapCache.regionMapUpdated = Date.now()

    return regionMapCache.regionMap.get(countryCode)
  } catch {
    return undefined
  }
}

export const getRegionMap = async (): Promise<
  Map<string, HttpTypes.StoreRegion>
> => {
  if (
    regionMapCache.regionMap.size > 0 &&
    regionMapCache.regionMapUpdated > Date.now() - 3600 * 1000
  ) {
    return regionMapCache.regionMap
  }

  const regions = await listRegions()

  regionMapCache.regionMap.clear()
  regions.forEach((region) => {
    region.countries?.forEach((c) => {
      regionMapCache.regionMap.set(c?.iso_2 ?? "", region)
    })
  })
  regionMapCache.regionMapUpdated = Date.now()

  return regionMapCache.regionMap
}
