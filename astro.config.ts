import svelte from "@astrojs/svelte";
// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  integrations: [svelte()],

  server: {
    port: 3000,
  },
});
