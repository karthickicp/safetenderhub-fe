import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      global: "globalthis", // This avoids the "global is not defined" error
      process: "process/browser",
      buffer: "buffer",
    },
  },
  define: {
    global: "globalThis", // Define global for libraries expecting it
  },
});
