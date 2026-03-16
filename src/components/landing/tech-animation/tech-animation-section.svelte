<script lang="ts" module>
  export type TechAnimationSectionProps = {
    label: string;
  };
</script>

<script lang="ts">
  import { CornerBrackets } from "@/components/ui/corner-brackets";
  import { TECH_LIST } from "@/lib/constants";

  import { animateTechRows } from "./animations";
  import TechRow from "./tech-row.svelte";

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
  <CornerBrackets size="h-8 w-8 sm:h-12 sm:w-12 lg:h-16 lg:w-16" />
  {#each TECH_LIST as tech, rowIndex}
    <div
      bind:this={rowEls[rowIndex]}
      class="mb-0.5 flex w-max items-center gap-3 last:mb-0 sm:mb-1"
      aria-hidden="true"
    >
      <TechRow
        techName={tech.name}
        techColor={tech.color}
        repeatCount={REPEAT_COUNT}
        centerIndex={CENTER_INDEX}
      />
    </div>
  {/each}
</section>
