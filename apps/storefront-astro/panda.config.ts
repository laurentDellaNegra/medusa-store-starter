import { defineConfig } from "@pandacss/dev";
import { parkUiPreset } from "./src/theme/park-ui-preset";
import { recipes, slotRecipes } from "./src/theme/recipes";

export default defineConfig({
  preflight: true,
  presets: [
    "@pandacss/preset-base",
    parkUiPreset,
  ],
  include: ["./src/**/*.{ts,js,astro}"],
  exclude: [],
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
