<script lang="ts" module>
  import type { Locale } from "@/i18n/ui";

  export type AboutVisualsProps = {
    lang: Locale;
    leftCol?: HTMLDivElement | null;
  };
</script>

<script lang="ts">
  import AboutImage from "./about-image.svelte";
  import { setupSingleImageInteraction } from "./animations";

  let {
    lang = "vn",
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
    {lang}
    bind:containerRef
  />
</div>
