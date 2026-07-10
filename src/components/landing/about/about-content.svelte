<script lang="ts">
  import type { Locale } from "@/i18n/ui";

  import { useTranslations } from "@/i18n/utils";

  import AboutCta from "./about-cta.svelte";
  import AboutHeading from "./about-heading.svelte";
  import { animateDoodleArrows, setupHeadingRipple } from "./animations";

  export type AboutContentProps = {
    lang: Locale;
    rightCol?: HTMLDivElement | null;
  };

  let {
    lang = "vn",
    rightCol = $bindable(null),
  }: AboutContentProps = $props();

  const t = (key: any) => useTranslations(lang)(key);
  const description1 = $derived(t("about.description1"));
  const description2 = $derived(t("about.description2"));

  let doodleArrow1Ref = $state<HTMLImageElement | null>(null);
  let doodleArrow2Ref = $state<HTMLImageElement | null>(null);
  let doodleArrow3Ref = $state<HTMLImageElement | null>(null);
  let headingContainerRef = $state<HTMLDivElement | null>(null);
  let headingJpLayerRef = $state<HTMLSpanElement | null>(null);

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

<div
  bind:this={rightCol}
  class=":uno: text-center flex flex-col invisible items-center order-1 lg:text-left lg:items-start lg:order-2"
>
  <AboutHeading
    {lang}
    bind:headingContainerRef
    bind:headingJpLayerRef
  />
  <p class=":uno: text-sm text-muted-foreground leading-relaxed mt-3 max-w-lg md:text-lg sm:text-base md:mt-6 sm:mt-4">
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    {@html description1}
  </p>
  <p class=":uno: text-sm text-muted-foreground leading-relaxed mt-2 max-w-lg md:text-lg sm:text-base md:mt-3">
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    {@html description2}
  </p>
  <AboutCta
    {lang}
    bind:doodleArrow1Ref
    bind:doodleArrow2Ref
    bind:doodleArrow3Ref
  />
</div>
