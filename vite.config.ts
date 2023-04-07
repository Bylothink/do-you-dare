import { defineConfig } from "vite";
import { resolve } from "path";

import Vue from "@vitejs/plugin-vue";

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@byloth/vuert": "/home/matteo/projects/vuert"
    }
  },
  plugins: [Vue()]
});
