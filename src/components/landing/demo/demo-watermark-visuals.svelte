<script lang="ts" module>
  import type { Locale } from "@/i18n/ui";

  export type DemoWatermarkVisualsProps = {
    lang: Locale;
  };
</script>

<script lang="ts">
  import Icon from "@iconify/svelte";
  import gsap from "gsap";

  import { Button } from "@/components/ui/button";
  import { useTranslations } from "@/i18n/utils";

  import demo from "./assets/demo-watermark.png?enhanced";

  const { lang = "vn" }: DemoWatermarkVisualsProps = $props();
  const t = (key: any) => useTranslations(lang)(key);

  let status = $state<"idle" | "embedding" | "watermarked" | "distorted" | "extracting" | "extracted">("idle");
  let scannerEl = $state<HTMLDivElement | null>(null);
  let scannerTween = $state<gsap.core.Tween | null>(null);

  $effect(() => {
    if (status === "extracting" && scannerEl) {
      scannerTween = gsap.fromTo(
        scannerEl,
        { top: "0%" },
        {
          top: "100%",
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        },
      );
    }
    else {
      scannerTween?.kill();
      scannerTween = null;
    }

    return () => {
      scannerTween?.kill();
    };
  });

  function startEmbedding() {
    status = "embedding";
    gsap.delayedCall(2.2, () => {
      status = "watermarked";
    });
  }

  function startDistorting() {
    status = "distorted";
  }

  function startExtracting() {
    status = "extracting";
    gsap.delayedCall(2.5, () => {
      status = "extracted";
    });
  }

  function resetDemo() {
    status = "idle";
  }
</script>

<div class=":uno: flex flex-col w-full items-center">
  <div
    class=":uno: border border-border/50 rounded-lg bg-background max-w-xs w-full aspect-4/3 shadow-lg relative overflow-hidden md:max-w-md sm:max-w-[340px]"
  >
    <div class=":uno: pointer-events-none left-3 top-3 absolute z-30">
      <span
        class=":uno: text-[10px] text-foreground tracking-wider font-bold font-mono px-2 py-0.5 border border-border/50 rounded bg-background/90 uppercase"
      >
        {status === "idle" || status === "embedding"
          ? t("demo.originalLabel")
          : status === "watermarked"
          ? t("demo.watermarkLabel")
          : "Attacked Image"}
      </span>
    </div>

    <div class=":uno: flex gap-1.5 pointer-events-none right-3 top-3 absolute z-30">
      <span
        class=":uno: text-[10px] text-primary font-bold font-mono px-2 py-0.5 border border-border/50 rounded bg-background/90"
      >
        {t("demo.watermarkMethodDwt")}
      </span>
      <span
        class=":uno: text-[10px] text-primary font-bold font-mono px-2 py-0.5 border border-border/50 rounded bg-background/90"
      >
        {t("demo.watermarkMethodSvd")}
      </span>
    </div>

    {#if status === "idle"}
      <enhanced:img
        src={demo}
        alt=""
        loading="lazy"
        decoding="async"
        class=":uno: h-full w-full block object-cover"
      />
    {/if}

    {#if status === "embedding"}
      <div class=":uno: bg-border/20 gap-px grid grid-cols-2 grid-rows-2 inset-0 absolute z-10 animate-pulse">
        <div class=":uno: bg-background relative overflow-hidden">
          <enhanced:img
            src={demo}
            alt=""
            loading="lazy"
            decoding="async"
            class=":uno: h-full w-full object-cover blur-[2px] contrast-[0.9]"
          />
          <span class=":uno: text-[9px] text-muted-foreground/60 font-mono select-none bottom-1 right-2 absolute">LL (Low Freq)</span>
        </div>
        <div class=":uno: bg-background relative overflow-hidden">
          <enhanced:img
            src={demo}
            alt=""
            loading="lazy"
            decoding="async"
            class=":uno: h-full w-full object-cover brightness-[0.7] contrast-[6] grayscale invert-[0.1]"
          />
          <span class=":uno: text-[9px] text-muted-foreground/60 font-mono select-none bottom-1 right-2 absolute">LH (Horiz)</span>
        </div>
        <div class=":uno: bg-background relative overflow-hidden">
          <enhanced:img
            src={demo}
            alt=""
            loading="lazy"
            decoding="async"
            class=":uno: h-full w-full rotate-90 object-cover brightness-[0.7] contrast-[6] grayscale invert-[0.1]"
          />
          <span class=":uno: text-[9px] text-muted-foreground/60 font-mono select-none bottom-1 right-2 absolute">HL (Vert)</span>
        </div>
        <div class=":uno: bg-background relative overflow-hidden">
          <enhanced:img
            src={demo}
            alt=""
            loading="lazy"
            decoding="async"
            class=":uno: opacity-50 h-full w-full object-cover brightness-[0.4] contrast-[12] grayscale"
          />
          <span class=":uno: text-[9px] text-muted-foreground/60 font-mono select-none bottom-1 right-2 absolute">HH (Diag Noise)</span>
        </div>
      </div>

      <div class=":uno: bg-background/70 flex flex-col items-center inset-0 justify-center absolute z-20 backdrop-blur-[2px]">
        <div class=":uno: p-4 border border-primary/20 rounded-lg bg-background/90 flex flex-col max-w-[200px] shadow-xl items-center justify-center">
          <Icon
            icon="lucide:binary"
            class=":uno: text-primary size-6 animate-bounce"
          />
          <span class=":uno: text-xs text-foreground font-bold font-mono mt-2 text-center">Transforming Spectrum</span>
          <span class=":uno: text-[9px] text-muted-foreground font-mono mt-1 text-center">Embedding frequency watermark</span>
        </div>
      </div>
    {/if}

    {#if status === "watermarked"}
      <div class=":uno: h-full w-full relative">
        <enhanced:img
          src={demo}
          alt=""
          loading="lazy"
          decoding="async"
          class=":uno: h-full w-full block object-cover"
        />
        <div class=":uno: bg-primary/5 pointer-events-none inset-0 absolute animate-pulse"></div>
        <div class=":uno: px-3 py-1.5 border border-emerald-500/30 rounded bg-background/90 flex gap-1.5 max-w-[260px] shadow-lg items-center bottom-3 left-1/2 absolute z-30 -translate-x-1/2">
          <Icon
            icon="lucide:check-circle"
            class=":uno: text-emerald-500 flex-shrink-0 size-4"
          />
          <span class=":uno: text-[10px] text-foreground font-mono font-semibold">Watermark Embedded (100% Invisible)</span>
        </div>
      </div>
    {/if}

    {#if status === "distorted" || status === "extracting" || status === "extracted"}
      <div class=":uno: h-full w-full relative">
        <enhanced:img
          src={demo}
          alt=""
          loading="lazy"
          decoding="async"
          class=":uno: h-full w-full block object-cover brightness-[0.7] contrast-[0.9] grayscale filter"
        />

        <div class=":uno: border border-red-500 border-dashed bg-red-500/10 flex h-1/2 w-1/2 items-center right-4 top-4 justify-center absolute z-20">
          <span class=":uno: text-[9px] text-red-500 font-bold font-mono px-1 py-0.5 border border-red-500/20 rounded bg-background/90 shadow">
            Cropped & Compressed (10%)
          </span>
        </div>

        <div class=":uno: bg-red-500/5 pointer-events-none inset-0 absolute"></div>

        {#if status === "extracting"}
          <div
            bind:this={scannerEl}
            class=":uno: bg-primary h-0.5 shadow-[0_0_8px_var(--color-primary)] left-0 right-0 absolute z-30"
          ></div>
        {/if}

        {#if status === "extracted"}
          <div class=":uno: text-[9px] text-primary font-mono p-2.5 text-left border border-border/80 rounded bg-background/95 shadow-2xl inset-x-3 bottom-3 absolute z-30 backdrop-blur">
            <div class=":uno: text-primary/70">[SYSTEM] Scanning frequency spectrum...</div>
            <div class=":uno: text-primary/70">[DWT/DCT] Extracting coefficients...</div>
            <div class=":uno: text-emerald-500 font-bold mt-0.5 flex gap-1 items-center">
              <Icon
                icon="lucide:shield-check"
                class=":uno: text-emerald-500 size-3"
              />
              Signature Found: "© Haruyu Sato - Authorized"
            </div>
            <div class=":uno: text-[8px] text-primary/50 mt-0.5">[Frequency Match: 99.7%]</div>
          </div>
        {/if}
      </div>
    {/if}
  </div>

  <div class=":uno: mt-6 flex items-center justify-center sm:mt-8">
    {#if status === "idle"}
      <Button
        variant="outline"
        onclick={startEmbedding}
        class=":uno: text-xs font-mono uppercase"
      >
        {t("demo.triggerEmbed")}
      </Button>
    {:else if status === "embedding"}
      <Button
        variant="outline"
        disabled
        class=":uno: text-xs font-mono uppercase"
      >
        {t("demo.stateEmbedding")}
      </Button>
    {:else if status === "watermarked"}
      <Button
        variant="outline"
        onclick={startDistorting}
        class=":uno: text-xs font-mono uppercase"
      >
        {t("demo.triggerDistort")}
      </Button>
    {:else if status === "distorted"}
      <Button
        variant="outline"
        onclick={startExtracting}
        class=":uno: text-xs font-mono uppercase"
      >
        {t("demo.triggerExtract")}
      </Button>
    {:else if status === "extracting"}
      <Button
        variant="outline"
        disabled
        class=":uno: text-xs font-mono uppercase"
      >
        {t("demo.stateExtracting")}
      </Button>
    {:else if status === "extracted"}
      <Button
        variant="outline"
        onclick={resetDemo}
        class=":uno: text-xs font-mono uppercase"
      >
        {t("demo.triggerReset")}
      </Button>
    {/if}
  </div>
</div>
