<script lang="ts" module>
  import type { Locale } from "@/i18n/ui";

  export type AboutSectionProps = {
    lang: Locale;
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

  const { lang = "vn" }: AboutSectionProps = $props();

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
  class=":uno: mx-auto px-4 py-12 flex max-w-screen-xl items-center justify-center relative min-h-dvh lg:py-24 sm:px-6 sm:py-16"
>
  <CornerBrackets corners={["tl", "br"]} />

  <AboutDefinition bind:ref={definitionRef} />

  <div class=":uno: flex flex-col gap-10 w-full items-center lg:flex-row lg:gap-16 lg:justify-center">
    <div class=":uno: w-full lg:flex lg:flex-1 lg:max-w-md lg:w-auto lg:justify-end">
      <AboutVisuals
        {lang}
        bind:leftCol
      />
    </div>

    <div class=":uno: w-full lg:flex-1 lg:max-w-xl lg:w-auto">
      <AboutContent
        {lang}
        bind:rightCol
      />
    </div>
  </div>
</section>
