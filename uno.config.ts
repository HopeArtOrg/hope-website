import type { Preset } from "unocss";

import extractorSvelte from "@unocss/extractor-svelte";
import {
  defineConfig,
  presetWebFonts,
  presetWind4,
} from "unocss";
import presetAnimations from "unocss-preset-animations";
import { presetShadcn } from "unocss-preset-shadcn";

const zenLight = {
  "background": "0.904 0.016 103",
  "foreground": "0.18 0 95",
  "card": "0.915 0.014 103",
  "card-foreground": "0.25 0.01 95",
  "popover": "0.915 0.014 103",
  "popover-foreground": "0.25 0.01 95",
  "primary": "0.35 0.03 255",
  "primary-foreground": "0.93 0.012 103",
  "secondary": "0.87 0.014 100",
  "secondary-foreground": "0.32 0.01 95",
  "muted": "0.87 0.014 100",
  "muted-foreground": "0.52 0.012 95",
  "accent": "0.88 0.013 100",
  "accent-foreground": "0.32 0.01 95",
  "destructive": "0.5 0.12 25",
  "destructive-foreground": "0.93 0.012 103",
  "border": "0.83 0.014 100",
  "input": "0.83 0.014 100",
  "ring": "0.45 0.03 255",
  "chart-1": "0.52 0.035 160",
  "chart-2": "0.48 0.025 95",
  "chart-3": "0.42 0.025 240",
  "chart-4": "0.58 0.03 100",
  "chart-5": "0.48 0.04 25",
  "sidebar": "0.89 0.015 103",
  "sidebar-foreground": "0.25 0.01 95",
  "sidebar-primary": "0.35 0.03 255",
  "sidebar-primary-foreground": "0.93 0.012 103",
  "sidebar-accent": "0.87 0.014 100",
  "sidebar-accent-foreground": "0.32 0.01 95",
  "sidebar-border": "0.83 0.014 100",
  "sidebar-ring": "0.45 0.03 255",
} as const;

const zenDark = {
  "background": "0.228 0.002 60",
  "foreground": "0.88 0.012 100",
  "card": "0.26 0.004 60",
  "card-foreground": "0.88 0.012 100",
  "popover": "0.26 0.004 60",
  "popover-foreground": "0.88 0.012 100",
  "primary": "0.68 0.04 255",
  "primary-foreground": "0.228 0.002 60",
  "secondary": "0.3 0.005 60",
  "secondary-foreground": "0.85 0.01 100",
  "muted": "0.3 0.005 60",
  "muted-foreground": "0.62 0.01 95",
  "accent": "0.3 0.005 60",
  "accent-foreground": "0.85 0.01 100",
  "destructive": "0.6 0.12 25",
  "destructive-foreground": "0.88 0.012 100",
  "border": "0.88 0.012 100 / 10%",
  "input": "0.88 0.012 100 / 14%",
  "ring": "0.6 0.04 255",
  "chart-1": "0.58 0.035 160",
  "chart-2": "0.52 0.025 95",
  "chart-3": "0.48 0.025 240",
  "chart-4": "0.62 0.03 100",
  "chart-5": "0.52 0.04 25",
  "sidebar": "0.26 0.004 60",
  "sidebar-foreground": "0.88 0.012 100",
  "sidebar-primary": "0.68 0.04 255",
  "sidebar-primary-foreground": "0.228 0.002 60",
  "sidebar-accent": "0.3 0.005 60",
  "sidebar-accent-foreground": "0.85 0.01 100",
  "sidebar-border": "0.88 0.012 100 / 10%",
  "sidebar-ring": "0.6 0.04 255",
} as const;

export default defineConfig({
  extractors: [
    extractorSvelte(),
  ],

  presets: [
    presetWind4({ preflights: { reset: true } }),
    presetAnimations() as Preset,
    presetShadcn(
      {
        color: {
          name: "zen",
          light: zenLight,
          dark: zenDark,
        } as never,
        radius: 0.1,
      },
    ),
    presetWebFonts({
      provider: "google",
      fonts: {
        primary: "Be Vietnam Pro",
        mono: "JetBrains Mono",
      },
    }),
  ],

  rules: [
    ["group", { "--un-group": "1" }],
    ["peer", { "--un-peer": "1" }],
  ],

  safelist: [
    "container",
  ],

  content: {
    pipeline: {
      include: [
        /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
        "(components|src)/**/*.{js,ts}",
      ],
    },
  },
});
