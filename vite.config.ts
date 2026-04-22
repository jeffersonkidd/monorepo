import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react()],
  resolve: {
    alias: {
      data: path.resolve(__dirname, "./src/data"),
      examples: path.resolve(__dirname, "./src/examples"),
      pages: path.resolve(__dirname, "./src/pages"),
      compositions: path.resolve(__dirname, "./src/ui/compositions"),
      hooks: path.resolve(__dirname, "./src/ui/hooks"),
      icons: path.resolve(__dirname, "./src/ui/icons"),
      images: path.resolve(__dirname, "./src/ui/images"),
      layout: path.resolve(__dirname, "./src/ui/layout"),
      primitives: path.resolve(__dirname, "./src/ui/primitives"),
      templates: path.resolve(__dirname, "./src/ui/templates"),
      utils: path.resolve(__dirname, "./src/ui/utils"),
    },
  },
  server: {
    port: 8000,
  },
});
