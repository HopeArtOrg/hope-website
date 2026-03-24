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
  import gsap from "gsap";

  import { CornerBrackets } from "@/components/ui/corner-brackets";
  import { prefersReducedMotion } from "@/lib/utils";

  import AboutContent from "./about-content.svelte";
  import AboutDefinition from "./about-definition.svelte";
  import AboutVisuals from "./about-visuals.svelte";
  import { animateScrollReveal } from "./animations";

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
  id="about"
  class="mx-auto px-4 py-12 flex max-w-screen-xl items-center justify-center relative min-h-dvh lg:py-24 sm:px-6 sm:py-16"
>
  <CornerBrackets corners={["tl", "br"]} />

  <AboutDefinition bind:ref={definitionRef} />

  <div class="gap-8 grid w-full items-center lg:gap-16 sm:gap-12 lg:grid-cols-2">
    <AboutVisuals
      {appScreenshotAlt}
      {repoScreenshotAlt}
      bind:leftCol
    />

    <AboutContent
      {heading}
      {description1}
      {description2}
      {ctaLabel}
      {ctaHref}
      bind:rightCol
    />
  </div>
</section>
