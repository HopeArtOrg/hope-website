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

<div class="mt-6 flex items-center justify-center relative sm:mt-8">
  <div
    bind:this={explosionContainerRef}
    class="text-muted-foreground/60 flex pointer-events-none items-center inset-0 justify-center absolute z-10 overflow-visible"
    aria-hidden="true"
  >
  </div>
  <button
    bind:this={triggerBtnRef}
    type="button"
    class="cursor-pointer transition-transform duration-200 ease-out relative z-20 active:scale-95 hover:scale-110"
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
