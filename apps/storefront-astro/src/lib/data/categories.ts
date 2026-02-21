import { sdk } from "@/lib/sdk"
import type { HttpTypes } from "@medusajs/types"

export const listCategories = async (
  query?: Record<string, any>
): Promise<HttpTypes.StoreProductCategory[]> => {
  const limit = query?.limit || 100

  return sdk.client
    .fetch<{ product_categories: HttpTypes.StoreProductCategory[] }>(
      "/store/product-categories",
      {
        query: {
          fields:
            "*category_children, *products, *parent_category, *parent_category.parent_category",
          limit,
          ...query,
        },
      }
    )
    .then(({ product_categories }) => product_categories)
}

export const getCategoryByHandle = async (
  categoryHandle: string[]
): Promise<HttpTypes.StoreProductCategory | null> => {
  const handle = categoryHandle.join("/")

  return sdk.client
    .fetch<{ product_categories: HttpTypes.StoreProductCategory[] }>(
      `/store/product-categories`,
      {
        query: {
          fields: "*category_children, *products",
          handle,
        },
      }
    )
    .then(({ product_categories }) => product_categories[0] || null)
    .catch(() => null)
}
