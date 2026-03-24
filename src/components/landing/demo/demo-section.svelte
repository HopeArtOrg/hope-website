<script lang="ts" module>
  export type DemoSectionProps = {
    heading: string;
    description: string;
    courtesy: string;
    images?: { src: string; alt: string }[];
  };
</script>

<script lang="ts">
  import gsap from "gsap";

  import { CornerBrackets } from "@/components/ui/corner-brackets";
  import { DefinitionPanel } from "@/components/ui/definition-panel";
  import { animateScrollReveal } from "@/lib/animation-utils";
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

  const {
    heading,
    description,
    courtesy,
    images = DEFAULT_IMAGES.map(img => ({
      src: typeof img.src === "string" ? img.src : img.src.src,
      alt: img.alt,
    })),
  }: DemoSectionProps = $props();

  let sectionEl = $state<HTMLElement | null>(null);
  let leftCol = $state<HTMLDivElement | null>(null);
  let rightCol = $state<HTMLDivElement | null>(null);
  let definitionRef = $state<HTMLDivElement | null>(null);
  let imageEls = $state<HTMLDivElement[]>([]);
  let triggerBtnEl = $state<HTMLButtonElement | null>(null);
  let explosionContainer = $state<HTMLDivElement | null>(null);
  let frameSvg = $state<SVGSVGElement | null>(null);
  let imageStackEl = $state<HTMLDivElement | null>(null);

  let currentImageIndex = $state(images.length - 1);
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
      gsap.set(leftCol, { opacity: 1 });
      gsap.set(rightCol, { opacity: 1 });
      if (definitionRef)
        gsap.set(definitionRef, { autoAlpha: 1 });
      return;
    }

    return animateScrollReveal({
      trigger: sectionEl,
      elements: [leftCol, rightCol],
      definitionEl: definitionRef ?? undefined,
      useAutoAlpha: false,
    });
  });
</script>

<section
  bind:this={sectionEl}
  id="demo"
  class="mx-auto px-4 py-12 flex max-w-screen-xl items-center justify-center relative min-h-dvh lg:py-24 sm:px-6 sm:py-16"
>
  <CornerBrackets corners={["tr", "bl"]} />

  <DefinitionPanel
    bind:ref={definitionRef}
    position="right"
    gap="gap-1.5"
    class="font-primary text-right"
  >
    <span class="text-sm">
      <span class="text-base font-semibold">l'espoir</span>
      <br />
      <span class="text-xs font-mono">/l.ɛs.pwaʁ/</span>
      <br />
      <span class="italic">nom masculin</span>
    </span>
    <div class="ml-auto bg-muted-foreground/30 h-px w-8"></div>
    <span class="text-sm leading-relaxed italic">
      Sentiment de confiance en
      <br />
      l'avenir, qui porte a attendre
      <br />
      avec confiance la realisation
      <br />
      de ce que l'on desire.
    </span>
  </DefinitionPanel>

  <div class="gap-8 grid w-full items-center lg:gap-16 sm:gap-12 lg:grid-cols-2">
    <div
      bind:this={leftCol}
      class="text-center opacity-0 flex flex-col items-center order-2 lg:text-left lg:items-start lg:order-1"
    >
      <h2
        class="text-2xl text-foreground tracking-tight font-bold font-mono lg:text-5xl md:text-4xl sm:text-3xl"
      >
        {heading}
      </h2>
      <!-- eslint-disable svelte/no-at-html-tags -->
      <p class="text-sm text-muted-foreground leading-relaxed mt-3 max-w-lg md:text-lg sm:text-base md:mt-6 sm:mt-4">
        {@html description}
      </p>
      <div class="mt-4 flex flex-wrap gap-3 sm:mt-6">
        {#each PROTECTION_METHODS as method}
          <span
            class="text-xs text-muted-foreground font-medium px-3 py-1 border border-border/50 rounded-sm inline-flex gap-1.5 items-center sm:text-sm"
          >
            <span
              class="rounded-full size-2 inline-block"
              style="background-color: {method.color};"
            ></span>
            {method.name}
          </span>
        {/each}
      </div>
      <p class="text-xs text-muted-foreground/50 mt-3 sm:text-sm sm:mt-4">
        {courtesy}
        <a
          href="https://vgen.co/iceyDh"
          target="_blank"
          rel="noopener noreferrer"
          class="underline decoration-muted-foreground/30 underline-offset-2 transition-colors duration-200 hover:text-muted-foreground hover:decoration-muted-foreground/60"
        >
          Haruyu Sato
          <span class="sr-only">(opens in a new tab)</span>
        </a>
      </p>
    </div>

    <div
      bind:this={rightCol}
      class="opacity-0 flex flex-col items-center order-1 relative lg:order-2"
    >
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
</section>
