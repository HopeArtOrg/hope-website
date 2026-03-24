<script lang="ts" module>
  export type DemoImageStackProps = {
    imageEls: HTMLDivElement[];
    imageStackRef: HTMLDivElement | null;
    frameSvgRef: SVGSVGElement | null;
    images: { src: string | { src: string }; alt: string }[];
  };
</script>

<script lang="ts">
  import {
    DEMO_IMAGE_STACK_OFFSET_X,
    DEMO_IMAGE_STACK_OFFSET_Y,
  } from "@/lib/constants";

  let {
    imageEls = $bindable([]),
    imageStackRef = $bindable(null),
    frameSvgRef = $bindable(null),
    images,
  }: DemoImageStackProps = $props();
</script>

<div
  bind:this={imageStackRef}
  class="max-w-xs w-full aspect-4/3 relative md:max-w-md sm:max-w-sm"
  style="perspective: 800px;"
>
  {#each images as image, i}
    <div
      bind:this={imageEls[i]}
      class="border border-border/50 rounded-lg shadow-lg transition-transform duration-200 ease-out inset-0 absolute overflow-hidden"
      style="z-index: {i + 1}; transform: translate({-(images.length - 1 - i) * DEMO_IMAGE_STACK_OFFSET_X}px, {(images.length - 1 - i) * DEMO_IMAGE_STACK_OFFSET_Y}px);"
    >
      <img
        src={typeof image.src === "string" ? image.src : image.src.src}
        alt=""
        loading="lazy"
        decoding="async"
        class="h-full w-full object-cover"
      />
    </div>
  {/each}

  <svg
    bind:this={frameSvgRef}
    class="opacity-0 pointer-events-none inset-0 absolute z-50"
    aria-hidden="true"
  ></svg>
</div>
