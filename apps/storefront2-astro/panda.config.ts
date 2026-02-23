import { defineConfig } from "@pandacss/dev";
import {
  tokens,
  semanticTokens,
  textStyles,
  keyframes,
  globalCss,
  button,
  navbar,
  productCard,
  sectionHeader,
  valueCard,
  testimonial,
  footer,
  breadcrumb,
  cartItem,
  cartSummary,
  productDetail,
  newsletter,
  marquee,
  toast,
} from "./src/theme";

export default defineConfig({
  preflight: true,

  include: [
    "./src/**/*.{ts,tsx,js,jsx,astro}",
    "./pages/**/*.{ts,tsx,js,jsx,astro}",
  ],

  exclude: [],

  theme: {
    tokens,
    semanticTokens,
    textStyles,
    extend: {
      keyframes,
      recipes: {
        button,
        toast,
      },
      slotRecipes: {
        navbar,
        productCard,
        sectionHeader,
        valueCard,
        testimonial,
        footer,
        breadcrumb,
        cartItem,
        cartSummary,
        productDetail,
        newsletter,
        marquee,
      },
    },
  },

  globalCss,

  outdir: "styled-system",
});
