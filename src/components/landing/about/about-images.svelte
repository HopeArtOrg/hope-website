<script lang="ts" module>
  export type AboutImagesProps = {
    appScreenshotAlt: string;
    repoScreenshotAlt: string;
    appImgRef?: HTMLImageElement | null;
    repoBtnRef?: HTMLButtonElement | null;
  };
</script>

<script lang="ts">
  let {
    appScreenshotAlt,
    repoScreenshotAlt,
    appImgRef = $bindable(null),
    repoBtnRef = $bindable(null),
  }: AboutImagesProps = $props();
</script>

<div class="relative aspect-video w-full max-w-xs sm:max-w-md lg:max-w-lg">
  <button
    bind:this={repoBtnRef}
    type="button"
    class="absolute inset-0 h-full w-full cursor-pointer overflow-hidden rounded-sm border border-border/50 p-0 shadow-lg transition-transform duration-200 ease-out"
    style="z-index: 1; background: none;"
  >
    <img
      src="/landing/about/repo-screenshot.jpg"
      alt={repoScreenshotAlt}
      loading="lazy"
      decoding="async"
      class="h-full w-full object-cover"
    />
  </button>
  <img
    bind:this={appImgRef}
    src="/landing/about/app-screenshot.png"
    alt={appScreenshotAlt}
    loading="lazy"
    decoding="async"
    class="absolute inset-0 h-full w-full translate-x-4 -translate-y-3 rounded-sm border border-border/50 object-cover shadow-lg transition-transform duration-200 ease-out sm:translate-x-8 sm:-translate-y-5 lg:translate-x-10 lg:-translate-y-6"
    style="z-index: 10;"
  />
</div>
