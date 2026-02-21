import { useState, useEffect, useMemo } from "react"
import type { HttpTypes } from "@medusajs/types"
import { getProductPrice } from "@/lib/util/get-product-price"
import { css } from "styled-system/css"
import { Button } from "@/components/ui/button"
import { openCart, setCart } from "@/stores/cart"

interface ProductActionsProps {
  product: HttpTypes.StoreProduct
  countryCode: string
}

const optionsAsKeymap = (
  variantOptions: HttpTypes.StoreProductVariant["options"]
) => {
  return variantOptions?.reduce(
    (acc: Record<string, string>, varopt: any) => {
      acc[varopt.option_id] = varopt.value
      return acc
    },
    {}
  )
}

function deepEqual(a: any, b: any): boolean {
  if (a === b) return true
  if (!a || !b) return false
  const keysA = Object.keys(a)
  const keysB = Object.keys(b)
  if (keysA.length !== keysB.length) return false
  return keysA.every((key) => a[key] === b[key])
}

export default function ProductActions({
  product,
  countryCode,
}: ProductActionsProps) {
  const [options, setOptions] = useState<Record<string, string | undefined>>({})
  const [isAdding, setIsAdding] = useState(false)
  const [addedMessage, setAddedMessage] = useState("")

  useEffect(() => {
    if (product.variants?.length === 1) {
      const variantOptions = optionsAsKeymap(product.variants[0].options)
      setOptions(variantOptions ?? {})
    }
  }, [product.variants])

  const selectedVariant = useMemo(() => {
    if (!product.variants || product.variants.length === 0) return undefined
    return product.variants.find((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return deepEqual(variantOptions, options)
    })
  }, [product.variants, options])

  const isValidVariant = useMemo(() => {
    return product.variants?.some((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return deepEqual(variantOptions, options)
    })
  }, [product.variants, options])

  const inStock = useMemo(() => {
    if (selectedVariant && !selectedVariant.manage_inventory) return true
    if (selectedVariant?.allow_backorder) return true
    if (
      selectedVariant?.manage_inventory &&
      ((selectedVariant as any)?.inventory_quantity || 0) > 0
    )
      return true
    return false
  }, [selectedVariant])

  const { variantPrice } = getProductPrice({
    product,
    variantId: selectedVariant?.id,
  })

  const setOptionValue = (optionId: string, value: string) => {
    setOptions((prev) => ({ ...prev, [optionId]: value }))
  }

  const handleAddToCart = async () => {
    if (!selectedVariant?.id) return

    setIsAdding(true)
    setAddedMessage("")

    try {
      const res = await fetch("/api/cart/add-item", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          variantId: selectedVariant.id,
          quantity: 1,
          countryCode,
        }),
      })

      if (res.ok) {
        const data = await res.json()
        if (data.cart) setCart(data.cart)
        openCart()
        setAddedMessage("Added to cart!")
        setTimeout(() => setAddedMessage(""), 2000)
      }
    } catch {
      // silently fail
    } finally {
      setIsAdding(false)
    }
  }

  const hasMultipleVariants = (product.variants?.length ?? 0) > 1

  return (
    <div className={css({ display: "flex", flexDir: "column", gap: "4" })}>
      {hasMultipleVariants &&
        (product.options || []).map((option) => (
          <div key={option.id}>
            <label
              className={css({
                display: "block",
                fontSize: "sm",
                fontWeight: "medium",
                mb: "2",
              })}
            >
              {option.title}
            </label>
            <div
              className={css({ display: "flex", flexWrap: "wrap", gap: "2" })}
            >
              {option.values?.map((v) => {
                const isSelected = options[option.id] === v.value
                return (
                  <button
                    key={v.id}
                    onClick={() => setOptionValue(option.id, v.value)}
                    className={css({
                      px: "4",
                      py: "2",
                      borderWidth: "1px",
                      borderColor: isSelected ? "fg.default" : "border.default",
                      borderRadius: "md",
                      fontSize: "sm",
                      bg: isSelected ? "bg.inverted" : "bg.default",
                      color: isSelected ? "fg.inverted" : "fg.default",
                      cursor: "pointer",
                      transition: "all",
                      _hover: {
                        borderColor: "fg.default",
                      },
                    })}
                  >
                    {v.value}
                  </button>
                )
              })}
            </div>
          </div>
        ))}

      {hasMultipleVariants && (
        <div
          className={css({
            h: "1px",
            bg: "border.default",
            my: "2",
          })}
        />
      )}

      {variantPrice && (
        <div className={css({ display: "flex", alignItems: "center", gap: "2" })}>
          {variantPrice.price_type === "sale" && (
            <span
              className={css({
                fontSize: "lg",
                color: "fg.disabled",
                textDecoration: "line-through",
              })}
            >
              {variantPrice.original_price}
            </span>
          )}
          <span
            className={css({
              fontSize: "xl",
              fontWeight: "semibold",
              color:
                variantPrice.price_type === "sale" ? "fg.default" : "fg.default",
            })}
          >
            {variantPrice.calculated_price}
          </span>
        </div>
      )}

      <Button
        onClick={handleAddToCart}
        disabled={
          !inStock || !selectedVariant || isAdding || !isValidVariant
        }
        className={css({ w: "full" })}
        size="lg"
      >
        {isAdding
          ? "Adding..."
          : !selectedVariant
            ? "Select variant"
            : !inStock || !isValidVariant
              ? "Out of stock"
              : "Add to cart"}
      </Button>

      {addedMessage && (
        <p
          className={css({
            fontSize: "sm",
            color: "fg.default",
            textAlign: "center",
          })}
        >
          {addedMessage}
        </p>
      )}
    </div>
  )
}
