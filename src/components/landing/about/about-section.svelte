<script lang="ts" module>
  export type AboutSectionProps = {
    heading: string;
    description1: string;
    description2: string;
    ctaLabel: string;
    ctaHref: string;
    appScreenshotAlt: string;
    repoScreenshotAlt: string;
  };
</script>

<script lang="ts">
  /* eslint-disable svelte/no-at-html-tags */
  import Icon from "@iconify/svelte";
  import gsap from "gsap";

  import { CornerBrackets } from "@/components/ui/corner-brackets";
  import { DefinitionPanel } from "@/components/ui/definition-panel";
  import { prefersReducedMotion } from "@/lib/utils";

  import AboutCta from "./about-cta.svelte";
  import AboutHeading from "./about-heading.svelte";
  import AboutImages from "./about-images.svelte";
  import {
    animateDoodleArrows,
    animateScrollReveal,
    createBringForwardState,
    setupHeadingRipple,
    setupImageInteractions,
  } from "./animations";

  const {
    heading,
    description1,
    description2,
    ctaLabel,
    ctaHref,
    appScreenshotAlt,
    repoScreenshotAlt,
  }: AboutSectionProps = $props();

  let sectionEl = $state<HTMLElement | null>(null);
  let leftCol = $state<HTMLDivElement | null>(null);
  let rightCol = $state<HTMLDivElement | null>(null);
  let definitionRef = $state<HTMLDivElement | null>(null);
  let appImgRef = $state<HTMLImageElement | null>(null);
  let repoBtnRef = $state<HTMLButtonElement | null>(null);
  let doodleArrow1Ref = $state<HTMLImageElement | null>(null);
  let doodleArrow2Ref = $state<HTMLImageElement | null>(null);
  let doodleArrow3Ref = $state<HTMLImageElement | null>(null);
  let headingContainerRef = $state<HTMLDivElement | null>(null);
  let headingJpLayerRef = $state<HTMLSpanElement | null>(null);

  const bringForwardState = createBringForwardState();

  $effect(() => {
    if (!appImgRef || !repoBtnRef)
      return;

    return setupImageInteractions(appImgRef, repoBtnRef, bringForwardState);
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

  $effect(() => {
    if (!rightCol || !doodleArrow1Ref || !doodleArrow2Ref || !doodleArrow3Ref)
      return;

    return animateDoodleArrows(rightCol, [doodleArrow1Ref, doodleArrow2Ref, doodleArrow3Ref]);
  });

  $effect(() => {
    if (!headingContainerRef || !headingJpLayerRef)
      return;

    return setupHeadingRipple(headingContainerRef, headingJpLayerRef);
  });
</script>

<section
  bind:this={sectionEl}
  id="about"
  class="relative mx-auto flex min-h-dvh max-w-screen-xl items-center justify-center px-4 py-12 sm:px-6 sm:py-16 lg:py-24"
>
  <CornerBrackets corners={["tl", "br"]} />

  <DefinitionPanel
    bind:ref={definitionRef}
    position="left"
    class="font-notojp"
  >
    <span class="text-sm">
      <span class="text-base font-semibold">望</span>
      <Icon
        icon="lucide:star"
        class="inline size-3.5"
      />
      <span class="font-mono font-primary text-xs">/bou/</span>
      <br />
      <span class="italic">名詞</span>
    </span>
    <div class="h-px w-8 bg-muted-foreground/30"></div>
    <span class="text-sm italic leading-relaxed">
      望み、願い、希望。
      <br />
      良いことが起こると
      <br />
      信じる理由。
    </span>
  </DefinitionPanel>

  <div class="grid w-full items-center gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16">
    <div
      bind:this={leftCol}
      class="invisible relative order-2 flex items-center justify-center lg:order-1"
      style="perspective: 800px;"
    >
      <AboutImages
        {appScreenshotAlt}
        {repoScreenshotAlt}
        bind:appImgRef
        bind:repoBtnRef
      />
    </div>

    <div
      bind:this={rightCol}
      class="invisible order-1 flex flex-col items-center text-center lg:order-2 lg:items-start lg:text-left"
    >
      <AboutHeading
        {heading}
        bind:headingContainerRef
        bind:headingJpLayerRef
      />
      <p class="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground sm:mt-4 sm:text-base md:mt-6 md:text-lg">
        {@html description1}
      </p>
      <p class="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base md:mt-3 md:text-lg">
        {@html description2}
      </p>
      <AboutCta
        {ctaLabel}
        {ctaHref}
        bind:doodleArrow1Ref
        bind:doodleArrow2Ref
        bind:doodleArrow3Ref
      />
    </div>
  </div>
</section>
