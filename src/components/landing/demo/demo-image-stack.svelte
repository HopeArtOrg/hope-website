<script lang="ts" module>
  export type DemoImageStackProps = {
    imageEls: HTMLDivElement[];
    imageStackRef: HTMLDivElement | null;
    frameSvgRef: SVGSVGElement | null;
  };
</script>

<script lang="ts">
  import {
    DEMO_IMAGE_STACK_OFFSET_X,
    DEMO_IMAGE_STACK_OFFSET_Y,
    DEMO_IMAGES,
  } from "@/lib/constants";

  let {
    imageEls = $bindable([]),
    imageStackRef = $bindable(null),
    frameSvgRef = $bindable(null),
  }: DemoImageStackProps = $props();
</script>

<div
  bind:this={imageStackRef}
  class="relative aspect-4/3 w-full max-w-xs sm:max-w-sm md:max-w-md"
  style="perspective: 800px;"
>
  {#each DEMO_IMAGES as image, i}
    <div
      bind:this={imageEls[i]}
      class="absolute inset-0 overflow-hidden rounded-lg border border-border/50 shadow-lg transition-transform duration-200 ease-out"
      style="z-index: {i + 1}; transform: translate({-(DEMO_IMAGES.length - 1 - i) * DEMO_IMAGE_STACK_OFFSET_X}px, {(DEMO_IMAGES.length - 1 - i) * DEMO_IMAGE_STACK_OFFSET_Y}px);"
    >
      <img
        src={image.src}
        alt=""
        loading="lazy"
        decoding="async"
        class="h-full w-full object-cover"
      />
    </div>
  {/each}

  <svg
    bind:this={frameSvgRef}
    class="pointer-events-none absolute inset-0 z-50 opacity-0"
    aria-hidden="true"
  ></svg>
</div>
