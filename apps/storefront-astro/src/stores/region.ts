import { atom } from "nanostores"

export const $countryCode = atom<string>("us")

export function setCountryCode(code: string) {
  $countryCode.set(code)
}
