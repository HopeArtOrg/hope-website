<script lang="ts">
  import AboutImage from "./about-image.svelte";
  import { setupSingleImageInteraction } from "./animations";

  export type AboutVisualsProps = {
    screenshotAlt: string;
    leftCol?: HTMLDivElement | null;
  };

  let {
    screenshotAlt,
    leftCol = $bindable(null),
  }: AboutVisualsProps = $props();

  let containerRef = $state<HTMLElement | null>(null);

  $effect(() => {
    if (!containerRef)
      return;

    return setupSingleImageInteraction(containerRef);
  });
</script>

<div
  bind:this={leftCol}
  class=":uno: flex invisible items-center justify-center order-2 relative lg:order-1"
  style="perspective: 1200px;"
>
  <AboutImage
    {screenshotAlt}
    bind:containerRef
  />
</div>
