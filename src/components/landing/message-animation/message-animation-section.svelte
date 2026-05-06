<script lang="ts" module>
  export type MessageAnimationSectionProps = {
    label: string;
  };
</script>

<script lang="ts">
  import { CornerBrackets } from "@/components/ui/corner-brackets";
  import { MESSAGE_LIST } from "@/lib/constants";

  import { animateMessageRows } from "./animations";
  import MessageRow from "./message-row.svelte";

  const REPEAT_COUNT = 15;
  const CENTER_INDEX = Math.floor(REPEAT_COUNT / 2);

  const { label }: MessageAnimationSectionProps = $props();

  let sectionEl = $state<HTMLElement | null>(null);
  const rowEls = $state<HTMLDivElement[]>([]);

  $effect(() => {
    if (!sectionEl || rowEls.length !== MESSAGE_LIST.length)
      return;

    return animateMessageRows(sectionEl, rowEls);
  });
</script>

<section
  bind:this={sectionEl}
  id="message-animation"
  aria-label={label}
  class=":uno: mx-auto px-4 pb-2 pt-4 max-w-screen-xl relative overflow-hidden sm:px-6 sm:pb-3 sm:pt-6"
>
  <CornerBrackets size="h-8 w-8 sm:h-12 sm:w-12 lg:h-16 lg:w-16" />
  {#each MESSAGE_LIST as item, rowIndex}
    <div
      bind:this={rowEls[rowIndex]}
      class=":uno: mb-0.5 flex gap-3 w-max items-center last:mb-0 sm:mb-1"
      aria-hidden="true"
    >
      <MessageRow
        messageText={item.name}
        messageColor={item.color}
        repeatCount={REPEAT_COUNT}
        centerIndex={CENTER_INDEX}
      />
    </div>
  {/each}
</section>
