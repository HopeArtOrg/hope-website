import svelte from "@astrojs/svelte";
import { enhancedImages } from "@sveltejs/enhanced-img";
import icon from "astro-icon";
import { defineConfig } from "astro/config";
import UnoCSS from "unocss/astro";

export default defineConfig({
  integrations: [
    UnoCSS(),
    svelte(),
    icon(),
  ],

  vite: {
    plugins: [
      enhancedImages(),
    ],
  },

  i18n: {
    defaultLocale: "vn",
    locales: ["en", "vn"],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  server: {
    port: 3000,
  },
});
