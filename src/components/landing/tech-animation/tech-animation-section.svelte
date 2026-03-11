<script lang="ts" module>
  export type TechAnimationSectionProps = {
    label: string;
  };
</script>

<script lang="ts">
  import Icon from "@iconify/svelte";

  import { TECH_LIST } from "@/lib/constants";

  import { animateTechRows } from "./animations";

  const REPEAT_COUNT = 15;
  const CENTER_INDEX = Math.floor(REPEAT_COUNT / 2);

  const { label }: TechAnimationSectionProps = $props();

  let sectionEl = $state<HTMLElement | null>(null);
  const rowEls = $state<HTMLDivElement[]>([]);

  $effect(() => {
    if (!sectionEl || rowEls.length !== TECH_LIST.length)
      return;

    return animateTechRows(sectionEl, rowEls);
  });
</script>

<section
  bind:this={sectionEl}
  id="tech-animation"
  aria-label={label}
  class="relative mx-auto max-w-screen-xl overflow-hidden px-4 pt-4 pb-2 sm:px-6 sm:pt-6 sm:pb-3"
>
  <div class="pointer-events-none absolute inset-4 sm:inset-6 lg:inset-10" aria-hidden="true">
    <span class="absolute top-0 left-0 h-8 w-8 border-t border-l border-muted-foreground/40 sm:h-12 sm:w-12 lg:h-16 lg:w-16"></span>
    <span class="absolute top-0 right-0 h-8 w-8 border-t border-r border-muted-foreground/40 sm:h-12 sm:w-12 lg:h-16 lg:w-16"></span>
    <span class="absolute bottom-0 left-0 h-8 w-8 border-b border-l border-muted-foreground/40 sm:h-12 sm:w-12 lg:h-16 lg:w-16"></span>
    <span class="absolute right-0 bottom-0 h-8 w-8 border-b border-r border-muted-foreground/40 sm:h-12 sm:w-12 lg:h-16 lg:w-16"></span>
  </div>
  {#each TECH_LIST as tech, rowIndex}
    <div
      bind:this={rowEls[rowIndex]}
      class="mb-0.5 flex w-max items-center gap-3 last:mb-0 sm:mb-1"
      aria-hidden="true"
    >
      {#each Array.from({ length: REPEAT_COUNT }) as _, colIndex}
        <span
          class="shrink-0 font-mono text-2xl font-semibold lowercase tracking-tight text-muted-foreground/15 select-none sm:text-3xl md:text-4xl"
          style={colIndex === CENTER_INDEX ? `color: ${tech.color}` : undefined}
        >
          {tech.name}
        </span>
        <span class="shrink-0 text-muted-foreground/15" aria-hidden="true">
          <Icon
            icon="lucide:star"
            class="size-1.5 fill-current stroke-0 sm:size-2"
          />
        </span>
      {/each}
    </div>
  {/each}
</section>
