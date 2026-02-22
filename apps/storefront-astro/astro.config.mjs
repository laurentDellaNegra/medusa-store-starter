import { defineConfig } from "astro/config";
import node from "@astrojs/node";

export default defineConfig({
  adapter: node({ mode: "standalone" }),
  integrations: [],
  server: { port: 8001 },
  build: {
    inlineStylesheets: "always",
  },
  vite: {
    resolve: {
      alias: {
        "@/": new URL("./src/", import.meta.url).pathname,
      },
    },
    ssr: {
      noExternal: ["@medusajs/js-sdk"],
    },
    build: {
      rollupOptions: {
        output: {
          experimentalMinChunkSize: 5000,
        },
      },
    },
  },
});
