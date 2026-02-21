import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import node from "@astrojs/node";

export default defineConfig({
  adapter: node({ mode: "standalone" }),
  integrations: [react()],
  server: { port: 8001 },
  vite: {
    resolve: {
      alias: {
        "@/": new URL("./src/", import.meta.url).pathname,
        "@ark-ui/react/utils": new URL(
          "./src/lib/ark-utils.ts",
          import.meta.url
        ).pathname,
      },
    },
    ssr: {
      noExternal: ["@ark-ui/react", "@medusajs/js-sdk"],
    },
  },
});
