import { css } from "styled-system/css"
import type { SortOptions } from "@/lib/util/sort-products"

interface SortDropdownProps {
  currentSort: SortOptions
  baseUrl: string
}

const sortOptions: { value: SortOptions; label: string }[] = [
  { value: "created_at", label: "Latest Arrivals" },
  { value: "price_asc", label: "Price: Low -> High" },
  { value: "price_desc", label: "Price: High -> Low" },
]

export default function SortDropdown({
  currentSort,
  baseUrl,
}: SortDropdownProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    const url = new URL(baseUrl, window.location.origin)
    url.searchParams.set("sortBy", value)
    url.searchParams.delete("page")
    window.location.href = url.toString()
  }

  return (
    <select
      value={currentSort}
      onChange={handleChange}
      className={css({
        px: "3",
        py: "2",
        borderWidth: "1px",
        borderColor: "border.default",
        borderRadius: "md",
        fontSize: "sm",
        bg: "bg.default",
        color: "fg.default",
        cursor: "pointer",
      })}
    >
      {sortOptions.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  )
}
