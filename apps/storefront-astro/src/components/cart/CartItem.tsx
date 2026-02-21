import { useState } from "react"
import type { HttpTypes } from "@medusajs/types"
import { convertToLocale } from "@/lib/util/money"
import { css } from "styled-system/css"
import { Minus, Plus, Trash2 } from "lucide-react"

interface CartItemProps {
  item: HttpTypes.StoreCartLineItem
  currencyCode: string
  onUpdate: () => void
}

export default function CartItem({ item, currencyCode, onUpdate }: CartItemProps) {
  const [updating, setUpdating] = useState(false)

  const fmt = (amount: number) =>
    convertToLocale({ amount, currency_code: currencyCode })

  const changeQuantity = async (quantity: number) => {
    setUpdating(true)
    try {
      await fetch("/api/cart/update-item", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lineId: item.id, quantity }),
      })
      onUpdate()
    } finally {
      setUpdating(false)
    }
  }

  const remove = async () => {
    setUpdating(true)
    try {
      await fetch("/api/cart/delete-item", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lineId: item.id }),
      })
      onUpdate()
    } finally {
      setUpdating(false)
    }
  }

  const thumbnail = item.thumbnail || item.variant?.product?.thumbnail
  const title = item.product_title || item.title
  const variantTitle = item.variant?.title

  return (
    <div
      className={css({
        display: "flex",
        gap: "4",
        py: "4",
        opacity: updating ? 0.5 : 1,
        transition: "opacity 0.2s",
      })}
    >
      {/* Thumbnail */}
      <div
        className={css({
          w: "24",
          h: "32",
          flexShrink: 0,
          borderRadius: "md",
          overflow: "hidden",
          bg: "bg.muted",
        })}
      >
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            className={css({ w: "full", h: "full", objectFit: "cover" })}
          />
        ) : (
          <div className={css({ w: "full", h: "full", bg: "bg.muted" })} />
        )}
      </div>

      {/* Details */}
      <div className={css({ flex: "1", display: "flex", flexDir: "column", gap: "1" })}>
        <div className={css({ display: "flex", justifyContent: "space-between" })}>
          <div>
            <p className={css({ fontSize: "sm", fontWeight: "medium" })}>{title}</p>
            {variantTitle && variantTitle !== "default" && (
              <p className={css({ fontSize: "xs", color: "fg.muted" })}>{variantTitle}</p>
            )}
          </div>
          <p className={css({ fontSize: "sm", fontWeight: "medium" })}>
            {fmt(item.total ?? 0)}
          </p>
        </div>

        {/* Quantity controls */}
        <div className={css({ display: "flex", alignItems: "center", gap: "3", mt: "auto" })}>
          <div
            className={css({
              display: "flex",
              alignItems: "center",
              borderWidth: "1px",
              borderColor: "border.default",
              borderRadius: "md",
            })}
          >
            <button
              onClick={() => changeQuantity(item.quantity - 1)}
              disabled={updating || item.quantity <= 1}
              className={css({
                p: "1.5",
                cursor: "pointer",
                color: "fg.muted",
                _hover: { color: "fg.default" },
                _disabled: { opacity: 0.3, cursor: "not-allowed" },
              })}
            >
              <Minus size={14} />
            </button>
            <span className={css({ px: "3", fontSize: "sm", minW: "8", textAlign: "center" })}>
              {item.quantity}
            </span>
            <button
              onClick={() => changeQuantity(item.quantity + 1)}
              disabled={updating || item.quantity >= 10}
              className={css({
                p: "1.5",
                cursor: "pointer",
                color: "fg.muted",
                _hover: { color: "fg.default" },
                _disabled: { opacity: 0.3, cursor: "not-allowed" },
              })}
            >
              <Plus size={14} />
            </button>
          </div>

          <button
            onClick={remove}
            disabled={updating}
            className={css({
              color: "fg.muted",
              cursor: "pointer",
              _hover: { color: "fg.error" },
              _disabled: { opacity: 0.3, cursor: "not-allowed" },
            })}
          >
            <Trash2 size={16} />
          </button>

          <span className={css({ fontSize: "xs", color: "fg.muted", ml: "auto" })}>
            {fmt(item.unit_price ?? 0)} each
          </span>
        </div>
      </div>
    </div>
  )
}
