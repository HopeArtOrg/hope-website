<script lang="ts" module>
  export type AboutImageProps = {
    screenshotAlt: string;
    containerRef?: HTMLDivElement | null;
  };
</script>

<script lang="ts">
  import screenshot from "./assets/full-screenshot.png?enhanced";

  let {
    screenshotAlt,
    containerRef = $bindable(null),
  }: AboutImageProps = $props();
</script>

<div
  bind:this={containerRef}
  class=":uno: mx-auto max-w-[240px] w-full relative group lg:max-w-sm sm:max-w-[280px]"
>
  <div class=":uno: border border-border/40 rounded-xl bg-card shadow-2xl transition-all duration-500 ease-out overflow-hidden">
    <enhanced:img
      src={screenshot}
      alt={screenshotAlt}
      class=":uno: h-auto w-full block transition-transform duration-700 group-hover:scale-[1.01]"
    />
    <div class=":uno: rounded-xl pointer-events-none ring-1 ring-foreground/5 ring-inset inset-0 absolute"></div>
  </div>

  <div class=":uno: rounded-full bg-primary/5 opacity-0 h-full w-full transition-opacity duration-500 absolute blur-3xl group-hover:opacity-100 -inset-4 -z-10"></div>
</div>
