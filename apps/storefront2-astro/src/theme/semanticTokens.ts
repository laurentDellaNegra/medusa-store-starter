import { defineSemanticTokens } from "@pandacss/dev";

export const semanticTokens = defineSemanticTokens({
  colors: {
    bg: {
      page: { value: "{colors.cream}" },
      section: { value: "{colors.sand.pale}" },
      card: { value: "{colors.sand.light}" },
      dark: { value: "{colors.espresso}" },
      nav: { value: "rgba(255, 252, 247, 0.92)" },
    },
    text: {
      primary: { value: "{colors.espresso}" },
      secondary: { value: "{colors.espresso.soft}" },
      accent: { value: "{colors.gold}" },
      onDark: { value: "{colors.sand}" },
      onDarkMuted: { value: "rgba(232, 223, 208, 0.6)" },
      onDarkFaint: { value: "rgba(232, 223, 208, 0.3)" },
    },
    border: {
      default: { value: "{colors.sand}" },
      accent: { value: "{colors.gold}" },
      subtle: { value: "rgba(184, 149, 106, 0.15)" },
    },
    state: {
      success: { value: "{colors.sage}" },
      danger: { value: "{colors.terracotta}" },
    },
  },
});
