import mdx from "@astrojs/mdx";
import svelte from "@astrojs/svelte";
import { enhancedImages } from "@sveltejs/enhanced-img";
import icon from "astro-icon";
import { defineConfig } from "astro/config";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import UnoCSS from "unocss/astro";

import { remarkReadingTime } from "./plugins/remark-reading-time";

export default defineConfig({
  site: "https://hope-art.app",

  integrations: [
    UnoCSS(),
    svelte(),
    mdx({
      remarkPlugins: [remarkMath, remarkReadingTime],
      rehypePlugins: [rehypeKatex],
    }),
    icon(),
  ],

  output: "static",

  vite: {
    plugins: [enhancedImages()],
    build: {
      rollupOptions: {
        external: ["fsevents", "rollup", "@rollup/rollup-win32-x64-msvc", "sharp"],
      },
    },
    define: {
      __dirname: "import.meta.dirname",
      __filename: "import.meta.filename",
    },
    optimizeDeps: {
      exclude: ["takumi-js", "takumi-js/response"],
    },
    ssr: {
      external: [
        "takumi-js",
        "takumi-js/response",
        "fsevents",
        "sharp",
        "rollup",
        "@rollup/rollup-win32-x64-msvc",
      ],
    },
    resolve: {
      noExternal: ["bits-ui"],
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
    syntaxHighlight: {
      excludeLangs: ["mermaid"],
    },
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
