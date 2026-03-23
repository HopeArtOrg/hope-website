import mdx from "@astrojs/mdx";
import svelte from "@astrojs/svelte";
import { enhancedImages } from "@sveltejs/enhanced-img";
import icon from "astro-icon";
import { defineConfig } from "astro/config";
import UnoCSS from "unocss/astro";

export default defineConfig({
  integrations: [
    UnoCSS(),
    svelte(),
    mdx(),
    icon(),
  ],

  output: "static",

  vite: {
    plugins: [enhancedImages()],
    optimizeDeps: {
      exclude: ["@takumi-rs/core"],
    },
    ssr: {
      external: ["@takumi-rs/core"],
    },
  },

  i18n: {
    defaultLocale: "vn",
    locales: ["en", "vn"],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  server: { port: 3000 },

  markdown: {
    shikiConfig: {
      themes: {
        light: "catppuccin-latte",
        dark: "catppuccin-macchiato",
      },
    },
  },

  experimental: {
    rustCompiler: true,
  },
});
