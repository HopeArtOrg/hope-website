<script lang="ts" module>
  import type { Locale } from "@/i18n/ui";

  export type DemoWatermarkSlideProps = {
    lang: Locale;
  };
</script>

<script lang="ts">
  import { useTranslations } from "@/i18n/utils";

  import DemoWatermarkVisuals from "./demo-watermark-visuals.svelte";

  const { lang = "vn" }: DemoWatermarkSlideProps = $props();
  const t = (key: any) => useTranslations(lang)(key);
</script>

<div class=":uno: gap-8 grid w-full items-center lg:gap-16 sm:gap-12 lg:grid-cols-2">
  <div class=":uno: text-center flex flex-col items-center order-2 lg:text-left lg:items-start lg:order-1">
    <h2 class=":uno: text-2xl text-foreground tracking-tight font-bold font-mono lg:text-5xl md:text-4xl sm:text-3xl">
      {t("demo.watermarkHeading")}
    </h2>
    <p class=":uno: text-sm text-muted-foreground leading-relaxed mt-3 max-w-lg md:text-lg sm:text-base md:mt-6 sm:mt-4">
      <!-- eslint-disable-next-line svelte/no-at-html-tags -->
      {@html t("demo.watermarkDescription")}
    </p>
    <div class=":uno: mt-4 flex flex-wrap gap-3 sm:mt-6">
      <span class=":uno: text-xs text-muted-foreground font-medium px-3 py-1 border border-border/50 rounded-sm inline-flex gap-1.5 items-center sm:text-sm">
        <span class=":uno: rounded-full bg-primary size-2 inline-block"></span>
        {t("demo.watermarkMethodDwt")}
      </span>
      <span class=":uno: text-xs text-muted-foreground font-medium px-3 py-1 border border-border/50 rounded-sm inline-flex gap-1.5 items-center sm:text-sm">
        <span class=":uno: rounded-full bg-primary size-2 inline-block"></span>
        {t("demo.watermarkMethodDct")}
      </span>
      <span class=":uno: text-xs text-muted-foreground font-medium px-3 py-1 border border-border/50 rounded-sm inline-flex gap-1.5 items-center sm:text-sm">
        <span class=":uno: rounded-full bg-primary size-2 inline-block"></span>
        {t("demo.watermarkMethodSvd")}
      </span>
    </div>
    <p class=":uno: text-xs text-muted-foreground/50 mt-3 sm:text-sm sm:mt-4">
      {t("demo.courtesy")}
      <a
        href="https://vgen.co/iceyDh"
        target="_blank"
        rel="noopener noreferrer"
        class=":uno: underline decoration-muted-foreground/30 underline-offset-2 transition-colors duration-200 hover:text-muted-foreground hover:decoration-muted-foreground/60"
      >
        Haruyu Sato
        <span class=":uno: sr-only">(opens in a new tab)</span>
      </a>
    </p>
  </div>

  <div class=":uno: flex flex-col items-center order-1 relative lg:order-2">
    <DemoWatermarkVisuals {lang} />
  </div>
</div>
