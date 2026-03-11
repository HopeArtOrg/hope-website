<script lang="ts" module>
  export type DemoSectionProps = {
    heading: string;
    description: string;
    courtesy: string;
  };
</script>

<script lang="ts">
  import gsap from "gsap";

  import { DEMO_IMAGE_STACK_OFFSET_X, DEMO_IMAGE_STACK_OFFSET_Y, DEMO_IMAGES, PROTECTION_METHODS } from "@/lib/constants";
  import { prefersReducedMotion } from "@/lib/utils";

  import {
    animateDottedFrame,
    animateScrollReveal,
    cycleImage,
    explodeStars,
    setupImageTilt,
  } from "./animations";

  const {
    heading,
    description,
    courtesy,
  }: DemoSectionProps = $props();

  let sectionEl = $state<HTMLElement | null>(null);
  let leftCol = $state<HTMLDivElement | null>(null);
  let rightCol = $state<HTMLDivElement | null>(null);
  let definitionRef = $state<HTMLDivElement | null>(null);
  const imageEls = $state<HTMLDivElement[]>([]);
  let triggerBtnEl = $state<HTMLButtonElement | null>(null);
  let explosionContainer = $state<HTMLDivElement | null>(null);
  let frameSvg = $state<SVGSVGElement | null>(null);
  let imageStackEl = $state<HTMLDivElement | null>(null);

  let currentImageIndex = $state(DEMO_IMAGES.length - 1);
  let methodCounter = $state(0);
  let isAnimating = $state(false);

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

  $effect(() => {
    if (!sectionEl || !leftCol || !rightCol)
      return;

    if (prefersReducedMotion()) {
      gsap.set(leftCol, { autoAlpha: 1 });
      gsap.set(rightCol, { autoAlpha: 1 });
      if (definitionRef)
        gsap.set(definitionRef, { autoAlpha: 1 });
      return;
    }

    return animateScrollReveal(sectionEl, leftCol, rightCol, definitionRef ?? undefined);
  });
</script>

<section
  bind:this={sectionEl}
  id="demo"
  class="relative mx-auto flex min-h-dvh max-w-screen-xl items-center justify-center px-4 py-12 sm:px-6 sm:py-16 lg:py-24"
>
  <div
    class="pointer-events-none absolute inset-4 sm:inset-6 lg:inset-10"
    aria-hidden="true"
  >
    <span class="absolute right-0 top-0 h-10 w-10 border-t border-r border-muted-foreground/40 sm:h-14 sm:w-14 lg:h-20 lg:w-20"></span>
    <span class="absolute bottom-0 left-0 h-10 w-10 border-b border-l border-muted-foreground/40 sm:h-14 sm:w-14 lg:h-20 lg:w-20"></span>
  </div>

  <div
    bind:this={definitionRef}
    class="invisible pointer-events-none absolute right-12 bottom-16 hidden select-none flex-col gap-1.5 text-right font-primary text-xs tracking-wide text-muted-foreground/40 lg:flex xl:right-16"
    aria-hidden="true"
  >
    <span class="text-sm">
      <span class="text-base font-semibold">l'espoir</span>
      <br />
      <span class="font-mono text-xs">/l.ɛs.pwaʁ/</span>
      <br />
      <span class="italic">nom masculin</span>
    </span>
    <div class="ml-auto h-px w-8 bg-muted-foreground/30"></div>
    <span class="text-sm italic leading-relaxed">
      Sentiment de confiance en
      <br />
      l'avenir, qui porte a attendre
      <br />
      avec confiance la realisation
      <br />
      de ce que l'on desire.
    </span>
  </div>

  <div class="grid w-full items-center gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16">
    <div
      bind:this={leftCol}
      class="invisible order-2 flex flex-col items-center text-center lg:order-1 lg:items-start lg:text-left"
    >
      <h2
        class="font-mono text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl"
      >
        {heading}
      </h2>
      <!-- eslint-disable svelte/no-at-html-tags -->
      <p class="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground sm:mt-4 sm:text-base md:mt-6 md:text-lg">
        {@html description}
      </p>
      <div class="mt-4 flex flex-wrap gap-3 sm:mt-6">
        {#each PROTECTION_METHODS as method}
          <span
            class="inline-flex items-center gap-1.5 rounded-sm border border-border/50 px-3 py-1 text-xs font-medium text-muted-foreground sm:text-sm"
          >
            <span
              class="inline-block size-2 rounded-full"
              style="background-color: {method.color};"
            ></span>
            {method.name}
          </span>
        {/each}
      </div>
      <p class="mt-3 text-xs text-muted-foreground/50 sm:mt-4 sm:text-sm">
        {courtesy}
        <a
          href="https://vgen.co/iceyDh"
          target="_blank"
          rel="noopener noreferrer"
          class="underline decoration-muted-foreground/30 underline-offset-2 transition-colors duration-200 hover:text-muted-foreground hover:decoration-muted-foreground/60"
        >
          Haruyu Sato
        </a>
      </p>
    </div>

    <div
      bind:this={rightCol}
      class="invisible relative order-1 flex flex-col items-center lg:order-2"
    >
      <div
        bind:this={imageStackEl}
        class="relative aspect-4/3 w-full max-w-xs sm:max-w-sm md:max-w-md"
        style="perspective: 800px;"
      >
        {#each DEMO_IMAGES as image, i}
          <div
            bind:this={imageEls[i]}
            class="absolute inset-0 overflow-hidden rounded-lg border border-border/50 shadow-lg transition-transform duration-200 ease-out"
            style="z-index: {i + 1}; transform: translate({-(DEMO_IMAGES.length - 1 - i) * DEMO_IMAGE_STACK_OFFSET_X}px, {(DEMO_IMAGES.length - 1 - i) * DEMO_IMAGE_STACK_OFFSET_Y}px);"
          >
            <img
              src={image.src}
              alt=""
              loading="lazy"
              decoding="async"
              class="h-full w-full object-cover"
            />
          </div>
        {/each}

        <svg
          bind:this={frameSvg}
          class="pointer-events-none absolute inset-0 z-50 opacity-0"
          aria-hidden="true"
        ></svg>
      </div>

      <div class="relative mt-6 flex items-center justify-center sm:mt-8">
        <div
          bind:this={explosionContainer}
          class="pointer-events-none absolute inset-0 z-10 flex items-center justify-center overflow-visible text-muted-foreground/60"
          aria-hidden="true"
        >
        </div>
        <button
          bind:this={triggerBtnEl}
          type="button"
          class="relative z-20 cursor-pointer transition-transform duration-200 ease-out hover:scale-110 active:scale-95"
          onclick={handleTrigger}
          aria-label="Cycle demo images"
        >
          <img
            src="/logo.svg"
            alt=""
            loading="lazy"
            decoding="async"
            class="size-10 sm:size-12"
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
  </div>
</section>
