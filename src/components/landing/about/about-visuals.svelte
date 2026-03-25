<script lang="ts">
  import AboutImages from "./about-images.svelte";
  import { createBringForwardState, setupImageInteractions } from "./animations";

  export type AboutVisualsProps = {
    appScreenshotAlt: string;
    repoScreenshotAlt: string;
    leftCol?: HTMLDivElement | null;
  };

  let {
    appScreenshotAlt,
    repoScreenshotAlt,
    leftCol = $bindable(null),
  }: AboutVisualsProps = $props();

  let appImgRef = $state<HTMLImageElement | null>(null);
  let repoBtnRef = $state<HTMLButtonElement | null>(null);

  const bringForwardState = createBringForwardState();

  $effect(() => {
    if (!appImgRef || !repoBtnRef)
      return;

    return setupImageInteractions(appImgRef, repoBtnRef, bringForwardState);
  });
</script>

<div
  bind:this={leftCol}
  class=":uno: flex invisible items-center justify-center order-2 relative lg:order-1"
  style="perspective: 800px;"
>
  <AboutImages
    {appScreenshotAlt}
    {repoScreenshotAlt}
    bind:appImgRef
    bind:repoBtnRef
  />
</div>
