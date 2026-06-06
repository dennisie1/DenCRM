import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Pas 'base' aan naar jouw GitHub repository-naam als je GitHub Pages gebruikt
  // Voorbeeld: base: "/dencrm/"
  base: "/",
});
