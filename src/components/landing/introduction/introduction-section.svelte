<script lang="ts" module>
  export type IntroductionSectionProps = {
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

  import { StarIcon } from "@/components/icons";
  import { Button } from "@/components/ui/button";
  import { prefersReducedMotion } from "@/lib/utils";

  import {
    animateDoodleArrows,
    animateScrollReveal,
    createBringForwardState,
    setupHeadingRipple,
    setupImageInteractions,
    tiltCornerStar,
  } from "./animations";

  const {
    heading,
    description1,
    description2,
    ctaLabel,
    ctaHref,
    appScreenshotAlt,
    repoScreenshotAlt,
  }: IntroductionSectionProps = $props();

  let sectionEl = $state<HTMLElement | null>(null);
  let leftCol = $state<HTMLDivElement | null>(null);
  let rightCol = $state<HTMLDivElement | null>(null);
  let definitionRef = $state<HTMLDivElement | null>(null);
  let appImgEl = $state<HTMLImageElement | null>(null);
  let repoBtn = $state<HTMLButtonElement | null>(null);
  let cornerStarEl = $state<HTMLButtonElement | null>(null);
  let doodleArrow1 = $state<HTMLImageElement | null>(null);
  let doodleArrow2 = $state<HTMLImageElement | null>(null);
  let doodleArrow3 = $state<HTMLImageElement | null>(null);

  let headingContainer = $state<HTMLDivElement | null>(null);

  let headingJpLayer = $state<HTMLSpanElement | null>(null);

  const bringForwardState = createBringForwardState();

  $effect(() => {
    if (!appImgEl || !repoBtn)
      return;

    return setupImageInteractions(appImgEl, repoBtn, bringForwardState);
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
    if (!rightCol || !doodleArrow1 || !doodleArrow2 || !doodleArrow3)
      return;

    return animateDoodleArrows(rightCol, [doodleArrow1, doodleArrow2, doodleArrow3]);
  });

  $effect(() => {
    if (!headingContainer || !headingJpLayer)
      return;

    return setupHeadingRipple(headingContainer, headingJpLayer);
  });
</script>

<section
  bind:this={sectionEl}
  id="introduction"
  class="relative mx-auto flex min-h-dvh max-w-screen-xl items-center justify-center px-4 py-12 sm:px-6 sm:py-16 lg:py-24"
>
  <div
    class="pointer-events-none absolute inset-4 sm:inset-6 lg:inset-10"
    aria-hidden="true"
  >
    <span class="absolute top-0 left-0 h-10 w-10 border-t border-l border-muted-foreground/40 sm:h-14 sm:w-14 lg:h-20 lg:w-20"></span>
    <span class="absolute right-0 bottom-0 h-10 w-10 border-b border-r border-muted-foreground/40 sm:h-14 sm:w-14 lg:h-20 lg:w-20"></span>
  </div>

  <div
    bind:this={definitionRef}
    class="invisible pointer-events-none absolute bottom-16 left-12 hidden select-none flex-col gap-3 font-notojp text-xs tracking-wide text-muted-foreground/40 lg:flex xl:left-16"
    aria-hidden="true"
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
  </div>

  <div class="grid w-full items-center gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16">
    <div
      bind:this={leftCol}
      class="invisible relative order-2 flex items-center justify-center lg:order-1"
      style="perspective: 800px;"
    >
      <div class="relative aspect-video w-full max-w-xs sm:max-w-md lg:max-w-lg">
        <button
          bind:this={repoBtn}
          type="button"
          class="absolute inset-0 h-full w-full cursor-pointer overflow-hidden rounded-sm border border-border/50 p-0 shadow-lg transition-transform duration-200 ease-out"
          style="z-index: 1; background: none;"
        >
          <img
            src="/repo-screenshot.jpg"
            alt={repoScreenshotAlt}
            loading="lazy"
            class="h-full w-full object-cover"
          />
        </button>
        <img
          bind:this={appImgEl}
          src="/app-screenshot.png"
          alt={appScreenshotAlt}
          loading="lazy"
          class="absolute inset-0 h-full w-full translate-x-4 -translate-y-3 rounded-sm border border-border/50 object-cover shadow-lg transition-transform duration-200 ease-out sm:translate-x-8 sm:-translate-y-5 lg:translate-x-10 lg:-translate-y-6"
          style="z-index: 10;"
        />
      </div>
    </div>

    <div
      bind:this={rightCol}
      class="invisible order-1 flex flex-col items-center text-center lg:order-2 lg:items-start lg:text-left"
    >
      <div class="relative">
        <div
          bind:this={headingContainer}
          class="relative cursor-crosshair"
        >
          <h2 class="font-mono text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
            {heading}
          </h2>
          <span
            bind:this={headingJpLayer}
            aria-hidden="true"
            class="pointer-events-none absolute -inset-16 z-10 flex items-center justify-center bg-foreground font-notojp text-2xl font-bold tracking-tight text-background sm:text-3xl md:text-4xl lg:justify-start lg:pl-16 lg:text-5xl"
          >
            Hopeとは？
          </span>
        </div>
        <button
          bind:this={cornerStarEl}
          type="button"
          class="absolute -top-4 -right-8 z-20 rotate-15 cursor-pointer text-muted-foreground/30 transition-colors duration-200 hover:text-muted-foreground/50 sm:-top-6 sm:-right-10 md:-top-8 md:-right-12"
          onclick={() => cornerStarEl && tiltCornerStar(cornerStarEl)}
          aria-hidden="true"
        >
          <StarIcon class="size-10 sm:size-12 md:size-14" />
        </button>
      </div>
      <p class="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground sm:mt-4 sm:text-base md:mt-6 md:text-lg">
        {@html description1}
      </p>
      <p class="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base md:mt-3 md:text-lg">
        {@html description2}
      </p>
      <div class="relative mt-6 sm:mt-8 lg:mt-10">
        <img
          bind:this={doodleArrow1}
          src="/doodle-arrow-1.svg"
          alt=""
          aria-hidden="true"
          loading="lazy"
          class="pointer-events-none invisible absolute top-full left-1/2 hidden mt-2 -translate-x-1/2 -scale-y-100 rotate-[-90deg] opacity-20 dark:invert sm:block sm:mt-3 sm:size-12 md:mt-4 md:size-16 lg:size-18"
        />
        <img
          bind:this={doodleArrow2}
          src="/doodle-arrow-2.svg"
          alt=""
          aria-hidden="true"
          loading="lazy"
          class="pointer-events-none invisible absolute bottom-full left-full hidden -mb-2 -ml-2 rotate-[150deg] opacity-20 dark:invert sm:-mb-3 sm:-ml-3 sm:block sm:size-12 md:size-16 lg:size-18"
        />
        <img
          bind:this={doodleArrow3}
          src="/doodle-arrow-3.svg"
          alt=""
          aria-hidden="true"
          loading="lazy"
          class="pointer-events-none invisible absolute top-full left-full hidden mt-1 ml-1 -scale-x-100 opacity-20 dark:invert sm:mt-2 sm:ml-2 sm:block sm:size-12 md:size-16 lg:size-18"
        />
        <Button
          variant="outline"
          size="lg"
          href={ctaHref}
          class="group relative overflow-hidden"
        >
          <span class="flex items-center gap-2">
            {ctaLabel}
            <Icon
              icon="lucide:arrow-right"
              class="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 sm:size-4"
            />
          </span>
          <span
            class="absolute inset-0 flex items-center justify-center gap-2 bg-foreground text-background transition-[clip-path] duration-500 ease-out [clip-path:polygon(0_0,0_0,0_100%,0_100%)] group-hover:[clip-path:polygon(0_0,calc(100%+40px)_0,100%_100%,0_100%)]"
            aria-hidden="true"
          >
            {ctaLabel}
            <Icon
              icon="lucide:arrow-right"
              class="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 sm:size-4"
            />
          </span>
        </Button>
      </div>
    </div>
  </div>
</section>
