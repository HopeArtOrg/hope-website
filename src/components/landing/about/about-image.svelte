<script lang="ts" module>
  export type AboutImageProps = {
    screenshotAlt: string;
    containerRef?: HTMLElement | null;
  };
</script>

<script lang="ts">
  import screenshot1 from "./assets/screenshot-1.png?enhanced";
  import screenshot2 from "./assets/screenshot-2.png?enhanced";
  import screenshot3 from "./assets/screenshot-3.png?enhanced";

  let {
    screenshotAlt,
    containerRef = $bindable(null),
  }: AboutImageProps = $props();

  let positions = $state([0, 1, 2]);

  function cycleCards() {
    positions = positions.map(pos => (pos + 1) % 3);
  }
</script>

<button
  bind:this={containerRef}
  type="button"
  onclick={cycleCards}
  class=":uno: mx-auto text-left max-w-[240px] w-full cursor-pointer relative group focus:outline-none lg:max-w-sm sm:max-w-[280px]"
  aria-label="Cycle screenshots"
>
  <enhanced:img
    src={screenshot2}
    alt=""
    class=":uno: opacity-0 h-auto w-full pointer-events-none select-none"
  />

  <div
    class={positions[0] === 0
      ? ":uno: border border-border/40 rounded-xl bg-card h-auto w-full pointer-events-none shadow-lg origin-bottom transition-all duration-500 ease-out left-0 top-0 absolute z-10 overflow-hidden -rotate-6 group-hover:-translate-x-14 group-hover:-rotate-18"
      : positions[0] === 1
      ? ":uno: border border-border/40 rounded-xl bg-card h-auto w-full pointer-events-none shadow-2xl origin-bottom transition-all duration-500 ease-out left-0 top-0 absolute z-20 overflow-hidden group-hover:-translate-y-6"
      : ":uno: border border-border/40 rounded-xl bg-card h-auto w-full pointer-events-none shadow-lg origin-bottom rotate-6 transition-all duration-500 ease-out left-0 top-0 absolute z-10 overflow-hidden group-hover:translate-x-14 group-hover:rotate-18"}
  >
    <enhanced:img
      src={screenshot1}
      alt={`${screenshotAlt} 1`}
      class=":uno: h-auto w-full block"
    />
    <div class=":uno: rounded-xl pointer-events-none ring-1 ring-foreground/5 ring-inset inset-0 absolute"></div>
  </div>

  <div
    class={positions[1] === 0
      ? ":uno: border border-border/40 rounded-xl bg-card h-auto w-full pointer-events-none shadow-lg origin-bottom transition-all duration-500 ease-out left-0 top-0 absolute z-10 overflow-hidden -rotate-6 group-hover:-translate-x-14 group-hover:-rotate-18"
      : positions[1] === 1
      ? ":uno: border border-border/40 rounded-xl bg-card h-auto w-full pointer-events-none shadow-2xl origin-bottom transition-all duration-500 ease-out left-0 top-0 absolute z-20 overflow-hidden group-hover:-translate-y-6"
      : ":uno: border border-border/40 rounded-xl bg-card h-auto w-full pointer-events-none shadow-lg origin-bottom rotate-6 transition-all duration-500 ease-out left-0 top-0 absolute z-10 overflow-hidden group-hover:translate-x-14 group-hover:rotate-18"}
  >
    <enhanced:img
      src={screenshot2}
      alt={`${screenshotAlt} 2`}
      class=":uno: h-auto w-full block"
    />
    <div class=":uno: rounded-xl pointer-events-none ring-1 ring-foreground/5 ring-inset inset-0 absolute"></div>
  </div>

  <div
    class={positions[2] === 0
      ? ":uno: border border-border/40 rounded-xl bg-card h-auto w-full pointer-events-none shadow-lg origin-bottom transition-all duration-500 ease-out left-0 top-0 absolute z-10 overflow-hidden -rotate-6 group-hover:-translate-x-14 group-hover:-rotate-18"
      : positions[2] === 1
      ? ":uno: border border-border/40 rounded-xl bg-card h-auto w-full pointer-events-none shadow-2xl origin-bottom transition-all duration-500 ease-out left-0 top-0 absolute z-20 overflow-hidden group-hover:-translate-y-6"
      : ":uno: border border-border/40 rounded-xl bg-card h-auto w-full pointer-events-none shadow-lg origin-bottom rotate-6 transition-all duration-500 ease-out left-0 top-0 absolute z-10 overflow-hidden group-hover:translate-x-14 group-hover:rotate-18"}
  >
    <enhanced:img
      src={screenshot3}
      alt={`${screenshotAlt} 3`}
      class=":uno: h-auto w-full block"
    />
    <div class=":uno: rounded-xl pointer-events-none ring-1 ring-foreground/5 ring-inset inset-0 absolute"></div>
  </div>

  <div class=":uno: rounded-full bg-primary/5 opacity-0 h-full w-full transition-opacity duration-500 absolute blur-3xl group-hover:opacity-100 -inset-8 -z-10"></div>
</button>
