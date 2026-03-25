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
  class=":uno: mx-auto px-4 pb-2 pt-4 max-w-screen-xl relative overflow-hidden sm:px-6 sm:pb-3 sm:pt-6"
>
  <CornerBrackets size="h-8 w-8 sm:h-12 sm:w-12 lg:h-16 lg:w-16" />
  {#each TECH_LIST as tech, rowIndex}
    <div
      bind:this={rowEls[rowIndex]}
      class=":uno: mb-0.5 flex gap-3 w-max items-center last:mb-0 sm:mb-1"
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
