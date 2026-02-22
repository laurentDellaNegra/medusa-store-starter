import { defineConfig } from "astro/config";
import node from "@astrojs/node";

export default defineConfig({
  adapter: node({ mode: "standalone" }),
  integrations: [],
  server: { port: 8001 },
  image: {
    domains: ["medusa-public-images.s3.eu-west-1.amazonaws.com"],
    remotePatterns: [
      { protocol: "http", hostname: "localhost" },
      { protocol: "https", hostname: "**.amazonaws.com" },
    ],
  },
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
