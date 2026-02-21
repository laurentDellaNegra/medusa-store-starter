import { defineConfig } from "@pandacss/dev";
import { createPreset } from "@park-ui/panda-preset";
import { recipes, slotRecipes } from "./src/theme/recipes";

export default defineConfig({
  preflight: true,
  presets: [
    "@pandacss/preset-base",
    createPreset({
      accentColor: "tomato",
      grayColor: "sand",
      borderRadius: "sm",
    }),
  ],
  include: ["./src/**/*.{ts,tsx,js,jsx,astro}"],
  exclude: [],
  jsxFramework: "react",
  outdir: "styled-system",
  theme: {
    extend: {
      recipes,
      slotRecipes,
    },
  },
  plugins: [
    {
      name: "Remove Panda Preset Colors",
      hooks: {
        "preset:resolved": ({ utils, preset, name }) =>
          name === "@pandacss/preset-panda"
            ? utils.omit(preset, [
                "theme.tokens.colors",
                "theme.semanticTokens.colors",
              ])
            : preset,
      },
    },
  ],
});
