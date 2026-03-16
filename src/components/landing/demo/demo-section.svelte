<script lang="ts" module>
  export type DemoSectionProps = {
    heading: string;
    description: string;
    courtesy: string;
  };
</script>

<script lang="ts">
  import gsap from "gsap";

  import { CornerBrackets } from "@/components/ui/corner-brackets";
  import { DefinitionPanel } from "@/components/ui/definition-panel";
  import { animateScrollReveal } from "@/lib/animation-utils";
  import { DEMO_IMAGES, PROTECTION_METHODS } from "@/lib/constants";
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
  class="relative mx-auto flex min-h-dvh max-w-screen-xl items-center justify-center px-4 py-12 sm:px-6 sm:py-16 lg:py-24"
>
  <CornerBrackets corners={["tr", "bl"]} />

  <DefinitionPanel
    bind:ref={definitionRef}
    position="right"
    gap="gap-1.5"
    class="text-right font-primary"
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
  </DefinitionPanel>

  <div class="grid w-full items-center gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16">
    <div
      bind:this={leftCol}
      class="opacity-0 order-2 flex flex-col items-center text-center lg:order-1 lg:items-start lg:text-left"
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
          <span class="sr-only">(opens in a new tab)</span>
        </a>
      </p>
    </div>

    <div
      bind:this={rightCol}
      class="opacity-0 relative order-1 flex flex-col items-center lg:order-2"
    >
      <DemoImageStack
        bind:imageEls
        bind:imageStackRef={imageStackEl}
        bind:frameSvgRef={frameSvg}
      />

      <DemoTriggerButton
        onclick={handleTrigger}
        bind:explosionContainerRef={explosionContainer}
        bind:triggerBtnRef={triggerBtnEl}
      />
    </div>
  </div>
</section>
