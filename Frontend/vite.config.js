// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { createRequire } from "module"; // Importa createRequire da module

const require = createRequire(import.meta.url); // Usa createRequire per ottenere una funzione require

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
  },
});
