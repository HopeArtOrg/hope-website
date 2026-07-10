<script lang="ts" module>
  import type { Locale } from "@/i18n/ui";

  export type DemoAdversarialSlideProps = {
    lang: Locale;
  };
</script>

<script lang="ts">
  import gsap from "gsap";
  import { untrack } from "svelte";

  import { useTranslations } from "@/i18n/utils";
  import { DEMO_IMAGES as DEFAULT_IMAGES, PROTECTION_METHODS } from "@/lib/constants";
  import { prefersReducedMotion } from "@/lib/utils";

  import {
    animateDottedFrame,
    cycleImage,
    explodeStars,
    setupImageTilt,
  } from "./animations";
  import DemoImageStack from "./demo-image-stack.svelte";
  import DemoTriggerButton from "./demo-trigger-button.svelte";

  const { lang = "vn" }: DemoAdversarialSlideProps = $props();
  const t = (key: any) => useTranslations(lang)(key);

  const images = $derived(
    DEFAULT_IMAGES.map(img => ({
      src: typeof img.src === "string" ? img.src : img.src.src,
      alt: t(img.alt as any),
    })),
  );

  let imageEls = $state<HTMLDivElement[]>([]);
  let triggerBtnEl = $state<HTMLButtonElement | null>(null);
  let explosionContainer = $state<HTMLDivElement | null>(null);
  let frameSvg = $state<SVGSVGElement | null>(null);
  let imageStackEl = $state<HTMLDivElement | null>(null);

  let currentImageIndex = $state(0);
  let methodCounter = $state(0);
  let isAnimating = $state(false);

  $effect.pre(() => {
    untrack(() => {
      currentImageIndex = images.length - 1;
    });
  });

  function handleTrigger() {
    if (isAnimating || !explosionContainer || !frameSvg || !imageStackEl)
      return;

    isAnimating = true;

    if (!prefersReducedMotion() && explosionContainer) {
      explodeStars(explosionContainer);
    }

    currentImageIndex = cycleImage(imageEls, currentImageIndex);
    methodCounter += 1;

    if (!prefersReducedMotion() && frameSvg && imageStackEl) {
      animateDottedFrame(frameSvg, imageStackEl, methodCounter - 1);
    }

    gsap.delayedCall(0.8, () => {
      isAnimating = false;
    });
  }

  $effect(() => {
    if (imageEls.length === 0)
      return;

    return setupImageTilt(imageEls);
  });
</script>

<div class=":uno: gap-8 grid w-full items-center lg:gap-16 sm:gap-12 lg:grid-cols-2">
  <div class=":uno: text-center flex flex-col items-center order-2 lg:text-left lg:items-start lg:order-1">
    <h2 class=":uno: text-2xl text-foreground tracking-tight font-bold font-mono lg:text-5xl md:text-4xl sm:text-3xl">
      {t("demo.heading")}
    </h2>
    <p class=":uno: text-sm text-muted-foreground leading-relaxed mt-3 max-w-lg md:text-lg sm:text-base md:mt-6 sm:mt-4">
      <!-- eslint-disable-next-line svelte/no-at-html-tags -->
      {@html t("demo.description")}
    </p>
    <div class=":uno: mt-4 flex flex-wrap gap-3 sm:mt-6">
      {#each PROTECTION_METHODS as method (method.name)}
        <span class=":uno: text-xs text-muted-foreground font-medium px-3 py-1 border border-border/50 rounded-sm inline-flex gap-1.5 items-center sm:text-sm">
          <span class=":uno: rounded-full size-2 inline-block" style="background-color: {method.color};"></span>
          {method.name}
        </span>
      {/each}
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
    <DemoImageStack
      bind:imageEls
      bind:imageStackRef={imageStackEl}
      bind:frameSvgRef={frameSvg}
      {images}
    />

    <DemoTriggerButton
      onclick={handleTrigger}
      bind:explosionContainerRef={explosionContainer}
      bind:triggerBtnRef={triggerBtnEl}
    />
  </div>
</div>
