import { sdk } from "@/lib/sdk"
import type { HttpTypes } from "@medusajs/types"

export const listCollections = async (
  queryParams: Record<string, string> = {}
): Promise<{ collections: HttpTypes.StoreCollection[]; count: number }> => {
  queryParams.limit = queryParams.limit || "100"
  queryParams.offset = queryParams.offset || "0"

  return sdk.client
    .fetch<{ collections: HttpTypes.StoreCollection[]; count: number }>(
      "/store/collections",
      { query: queryParams }
    )
    .then(({ collections }) => ({ collections, count: collections.length }))
}

export const getCollectionByHandle = async (
  handle: string
): Promise<HttpTypes.StoreCollection | null> => {
  return sdk.client
    .fetch<{ collections: HttpTypes.StoreCollection[] }>(`/store/collections`, {
      query: { handle, fields: "*products" },
    })
    .then(({ collections }) => collections[0] || null)
    .catch(() => null)
}
