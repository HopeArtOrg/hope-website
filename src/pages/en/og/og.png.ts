import type { APIRoute } from "astro";
import type { Font } from "takumi-js";

import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "takumi-js";

import DefaultOG from "@/components/templates/og/default-og";
import en from "@/i18n/en.json";
import { LATEST_VERSION } from "@/lib/constants";

const beVietnamProData = await readFile(
  path.resolve(process.cwd(), "src/assets/fonts/be-vietnam-pro.ttf"),
);
const jetBrainsMonoData = await readFile(
  path.resolve(process.cwd(), "src/assets/fonts/jetbrains-mono.ttf"),
);

const fonts: Font[] = [
  {
    name: "Be Vietnam Pro",
    data: beVietnamProData.buffer as ArrayBuffer,
    weight: 400,
    style: "normal",
  },
  {
    name: "Be Vietnam Pro",
    data: beVietnamProData.buffer as ArrayBuffer,
    weight: 700,
    style: "normal",
  },
  {
    name: "JetBrains Mono",
    data: jetBrainsMonoData.buffer as ArrayBuffer,
    weight: 700,
    style: "normal",
  },
];

export const GET: APIRoute = () => {
  return new ImageResponse(
    DefaultOG({
      title: en.site.title,
      description: en.site.description,
      version: LATEST_VERSION,
    }),
    {
      width: 1200,
      height: 630,
      format: "png",
      fonts,
    },
  );
};
