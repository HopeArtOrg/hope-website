<script lang="ts" module>
  import type { Locale } from "@/i18n/ui";

  export type AboutCtaProps = {
    lang: Locale;
    doodleArrow1Ref?: HTMLImageElement | null;
    doodleArrow2Ref?: HTMLImageElement | null;
    doodleArrow3Ref?: HTMLImageElement | null;
  };
</script>

<script lang="ts">
  import Icon from "@iconify/svelte";

  import { Button } from "@/components/ui/button";
  import { getLocalePath, useTranslations } from "@/i18n/utils";

  import { setupCtaAnimation } from "./animations";

  let {
    lang = "vn",
    doodleArrow1Ref = $bindable(null),
    doodleArrow2Ref = $bindable(null),
    doodleArrow3Ref = $bindable(null),
  }: AboutCtaProps = $props();

  const t = (key: any) => useTranslations(lang)(key);
  const ctaHref = $derived(getLocalePath(lang, "/blogs"));
  const ctaLabel = $derived(t("about.cta"));

  let buttonRef = $state<HTMLElement | null>(null);
  let overlayRef = $state<HTMLElement | null>(null);

  $effect(() => {
    if (!buttonRef || !overlayRef)
      return;
    return setupCtaAnimation(buttonRef, overlayRef);
  });
</script>

<div class=":uno: mt-6 relative lg:mt-10 sm:mt-8">
  <img
    bind:this={doodleArrow1Ref}
    src="/landing/about/doodle-arrow-1.svg"
    alt=""
    aria-hidden="true"
    loading="lazy"
    class=":uno: mt-2 opacity-20 hidden invisible pointer-events-none rotate-[-90deg] left-1/2 top-full absolute md:mt-4 sm:mt-3 lg:size-18 md:size-16 sm:size-12 sm:block -translate-x-1/2 -scale-y-100 dark:invert"
  />
  <img
    bind:this={doodleArrow2Ref}
    src="/landing/about/doodle-arrow-2.svg"
    alt=""
    aria-hidden="true"
    loading="lazy"
    class=":uno: opacity-20 hidden invisible pointer-events-none rotate-[150deg] bottom-full left-full absolute -mb-2 -ml-2 lg:size-18 md:size-16 sm:size-12 sm:block dark:invert sm:-mb-3 sm:-ml-3"
  />
  <img
    bind:this={doodleArrow3Ref}
    src="/landing/about/doodle-arrow-3.svg"
    alt=""
    aria-hidden="true"
    loading="lazy"
    class=":uno: ml-1 mt-1 opacity-20 hidden invisible pointer-events-none left-full top-full absolute sm:ml-2 sm:mt-2 lg:size-18 md:size-16 sm:size-12 sm:block -scale-x-100 dark:invert"
  />
  <Button
    variant="outline"
    size="lg"
    href={ctaHref}
    aria-label={ctaLabel}
    bind:ref={buttonRef}
    class="relative overflow-hidden"
  >
    <span class=":uno: flex gap-2 items-center">
      {ctaLabel}
      <Icon
        icon="lucide:arrow-right"
        class=":uno: cta-arrow size-3.5 transition-transform duration-300 sm:size-4"
      />
    </span>
    <span
      bind:this={overlayRef}
      class=":uno: text-background bg-foreground flex gap-2 transition-opacity duration-500 ease-out [clip-path:polygon(0_0,0_0,0_100%,0_100%)] items-center inset-0 justify-center absolute"
      aria-hidden="true"
    >
      {ctaLabel}
      <Icon
        icon="lucide:arrow-right"
        class=":uno: cta-arrow size-3.5 transition-transform duration-300 sm:size-4"
      />
    </span>
  </Button>
</div>
