import svelte from "@astrojs/svelte";
import icon from "astro-icon";
import { defineConfig } from "astro/config";
import UnoCSS from "unocss/astro";

export default defineConfig({
  integrations: [
    svelte(),
    UnoCSS(),
    icon(),
  ],

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
