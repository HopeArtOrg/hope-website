<script lang="ts" module>
  export type AboutCtaProps = {
    ctaLabel: string;
    ctaHref: string;
    doodleArrow1Ref?: HTMLImageElement | null;
    doodleArrow2Ref?: HTMLImageElement | null;
    doodleArrow3Ref?: HTMLImageElement | null;
  };
</script>

<script lang="ts">
  import Icon from "@iconify/svelte";

  import { Button } from "@/components/ui/button";

  let {
    ctaLabel,
    ctaHref,
    doodleArrow1Ref = $bindable(null),
    doodleArrow2Ref = $bindable(null),
    doodleArrow3Ref = $bindable(null),
  }: AboutCtaProps = $props();
</script>

<div class="relative mt-6 sm:mt-8 lg:mt-10">
  <img
    bind:this={doodleArrow1Ref}
    src="/landing/about/doodle-arrow-1.svg"
    alt=""
    aria-hidden="true"
    loading="lazy"
    class="pointer-events-none invisible absolute top-full left-1/2 hidden mt-2 -translate-x-1/2 -scale-y-100 rotate-[-90deg] opacity-20 dark:invert sm:block sm:mt-3 sm:size-12 md:mt-4 md:size-16 lg:size-18"
  />
  <img
    bind:this={doodleArrow2Ref}
    src="/landing/about/doodle-arrow-2.svg"
    alt=""
    aria-hidden="true"
    loading="lazy"
    class="pointer-events-none invisible absolute bottom-full left-full hidden -mb-2 -ml-2 rotate-[150deg] opacity-20 dark:invert sm:-mb-3 sm:-ml-3 sm:block sm:size-12 md:size-16 lg:size-18"
  />
  <img
    bind:this={doodleArrow3Ref}
    src="/landing/about/doodle-arrow-3.svg"
    alt=""
    aria-hidden="true"
    loading="lazy"
    class="pointer-events-none invisible absolute top-full left-full hidden mt-1 ml-1 -scale-x-100 opacity-20 dark:invert sm:mt-2 sm:ml-2 sm:block sm:size-12 md:size-16 lg:size-18"
  />
  <Button
    variant="outline"
    size="lg"
    href={ctaHref}
    aria-label={ctaLabel}
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
