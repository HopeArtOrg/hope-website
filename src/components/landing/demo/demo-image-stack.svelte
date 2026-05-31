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

  const processedImages = $derived(
    images.map((image, i) => {
      const offset = images.length - 1 - i;
      return {
        ...image,
        index: i,
        zIndex: i + 1,
        transform: `translate(${-offset * DEMO_IMAGE_STACK_OFFSET_X}px, ${offset * DEMO_IMAGE_STACK_OFFSET_Y}px)`,
      };
    }),
  );
</script>

<div
  bind:this={imageStackRef}
  class=":uno: max-w-xs w-full aspect-4/3 relative md:max-w-md sm:max-w-sm"
  style="perspective: 800px;"
>
  {#each processedImages as image (image.index)}
    <div
      bind:this={imageEls[image.index]}
      class=":uno: border border-border/50 rounded-lg shadow-lg transition-transform duration-200 ease-out inset-0 absolute overflow-hidden"
      style="z-index: {image.zIndex}; transform: {image.transform};"
    >
      <img
        src={typeof image.src === "string" ? image.src : image.src.src}
        alt=""
        loading="lazy"
        decoding="async"
        class=":uno: h-full w-full object-cover"
      />
    </div>
  {/each}

  <svg
    bind:this={frameSvgRef}
    class=":uno: opacity-0 pointer-events-none inset-0 absolute z-50"
    aria-hidden="true"
  ></svg>
</div>
