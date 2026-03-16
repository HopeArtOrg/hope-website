<script lang="ts" module>
  export type AboutHeadingProps = {
    heading: string;
    headingContainerRef?: HTMLDivElement | null;
    headingJpLayerRef?: HTMLSpanElement | null;
  };
</script>

<script lang="ts">
  import { StarIcon } from "@/components/icons";

  import { tiltCornerStar } from "./animations";

  let {
    heading,
    headingContainerRef = $bindable(null),
    headingJpLayerRef = $bindable(null),
  }: AboutHeadingProps = $props();

  let cornerStarEl = $state<HTMLButtonElement | null>(null);
</script>

<div class="relative">
  <div
    bind:this={headingContainerRef}
    class="relative cursor-crosshair"
  >
    <h2
      aria-label={heading}
      class="font-mono text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl"
    >
      {heading}
    </h2>
    <span
      bind:this={headingJpLayerRef}
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
