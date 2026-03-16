<script lang="ts" module>
  export type DemoTriggerButtonProps = {
    onclick: () => void;
    explosionContainerRef: HTMLDivElement | null;
    triggerBtnRef: HTMLButtonElement | null;
  };
</script>

<script lang="ts">
  let {
    onclick,
    explosionContainerRef = $bindable(null),
    triggerBtnRef = $bindable(null),
  }: DemoTriggerButtonProps = $props();
</script>

<div class="relative mt-6 flex items-center justify-center sm:mt-8">
  <div
    bind:this={explosionContainerRef}
    class="pointer-events-none absolute inset-0 z-10 flex items-center justify-center overflow-visible text-muted-foreground/60"
    aria-hidden="true"
  >
  </div>
  <button
    bind:this={triggerBtnRef}
    type="button"
    class="relative z-20 cursor-pointer transition-transform duration-200 ease-out hover:scale-110 active:scale-95"
    {onclick}
    aria-label="Cycle demo images"
  >
    <img
      src="/logo.svg"
      alt=""
      loading="lazy"
      decoding="async"
      class="size-10 sm:size-12"
      aria-hidden="true"
    />
  </button>
</div>
