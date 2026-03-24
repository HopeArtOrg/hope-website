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

<div class="max-w-xs w-full aspect-video relative lg:max-w-lg sm:max-w-md">
  <button
    bind:this={repoBtnRef}
    type="button"
    class="p-0 border border-border/50 rounded-sm h-full w-full cursor-pointer shadow-lg transition-transform duration-200 ease-out inset-0 absolute overflow-hidden"
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
    class="border border-border/50 rounded-sm h-full w-full shadow-lg translate-x-4 transition-transform duration-200 ease-out inset-0 absolute object-cover -translate-y-3 lg:translate-x-10 sm:translate-x-8 lg:-translate-y-6 sm:-translate-y-5"
    style="z-index: 10;"
  />
</div>
