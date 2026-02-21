import type { HttpTypes } from "@medusajs/types"
import { css } from "styled-system/css"

interface CountrySelectProps {
  region: HttpTypes.StoreRegion
  value?: string
  onChange: (value: string) => void
  name: string
}

export default function CountrySelect({
  region,
  value,
  onChange,
  name,
}: CountrySelectProps) {
  return (
    <select
      name={name}
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      className={css({
        w: "full",
        h: "10",
        px: "3",
        borderWidth: "1px",
        borderColor: "border.default",
        borderRadius: "md",
        fontSize: "sm",
        bg: "bg.default",
        color: "fg.default",
        _focus: { outline: "none", borderColor: "fg.default" },
      })}
    >
      <option value="">Select country</option>
      {region.countries?.map((country) => (
        <option key={country.iso_2} value={country.iso_2}>
          {country.display_name}
        </option>
      ))}
    </select>
  )
}
