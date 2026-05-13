<script lang="ts" module>
  export type MessageRowProps = {
    messageText: string;
    messageColor: string;
    repeatCount: number;
    centerIndex: number;
  };
</script>

<script lang="ts">
  import Icon from "@iconify/svelte";

  const { messageText, messageColor, repeatCount, centerIndex }: MessageRowProps = $props();
</script>

{#each Array.from({ length: repeatCount }) as _, colIndex (colIndex)}
  <span
    class="text-2xl text-muted-foreground/15 tracking-tight font-mono font-semibold shrink-0 select-none lowercase md:text-4xl sm:text-3xl"
    style={colIndex === centerIndex ? `color: ${messageColor}` : undefined}
  >
    {messageText}
  </span>
  <span class="text-muted-foreground/15 shrink-0" aria-hidden="true">
    <Icon
      icon="lucide:star"
      class="size-1.5 fill-current stroke-0 sm:size-2"
    />
  </span>
{/each}
