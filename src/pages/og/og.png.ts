import type { Font } from "@takumi-rs/core";
import type { APIRoute } from "astro";

import { ImageResponse } from "@takumi-rs/image-response";
import { readFile } from "node:fs/promises";

import DefaultOG from "@/components/templates/og/default-og";
import vn from "@/i18n/vn.json";

const beVietnamProData = await readFile(
  new URL("../../assets/fonts/be-vietnam-pro.ttf", import.meta.url),
);
const jetBrainsMonoData = await readFile(
  new URL("../../assets/fonts/jetbrains-mono.ttf", import.meta.url),
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
      title: vn.site.title,
      description: vn.site.description,
    }),
    {
      width: 1200,
      height: 630,
      format: "png",
      fonts,
    },
  );
};
