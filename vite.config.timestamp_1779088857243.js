// vite.config.ts
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { resolve } from "node:path";
var vite_config_default = defineConfig({
  cloudflare: false,
  tanstackStart: {
    server: { entry: "server" }
  },
  vite: {
    resolve: {
      alias: [{ find: "@", replacement: resolve(__dirname, "src") }]
    },
    build: {
      chunkSizeWarningLimit: 1200
    }
  }
});
export {
  vite_config_default as default
};
