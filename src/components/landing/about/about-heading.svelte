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

<div class=":uno: relative">
  <div
    bind:this={headingContainerRef}
    class=":uno: cursor-crosshair relative"
  >
    <h2
      aria-label={heading}
      class=":uno: text-2xl text-foreground tracking-tight font-bold font-mono lg:text-5xl md:text-4xl sm:text-3xl"
    >
      {heading}
    </h2>
    <span
      bind:this={headingJpLayerRef}
      aria-hidden="true"
      class=":uno: text-2xl text-background tracking-tight font-bold font-notojp bg-foreground flex pointer-events-none items-center justify-center absolute z-10 lg:text-5xl md:text-4xl sm:text-3xl lg:pl-16 -inset-16 lg:justify-start"
    >
      Hopeとは？
    </span>
  </div>
  <button
    bind:this={cornerStarEl}
    type="button"
    class=":uno: text-muted-foreground/30 cursor-pointer rotate-15 transition-colors duration-200 absolute z-20 hover:text-muted-foreground/50 -right-8 -top-4 md:-right-12 md:-top-8 sm:-right-10 sm:-top-6"
    onclick={() => cornerStarEl && tiltCornerStar(cornerStarEl)}
    aria-hidden="true"
  >
    <StarIcon class=":uno: size-10 md:size-14 sm:size-12" />
  </button>
</div>
