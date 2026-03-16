<script lang="ts" module>
  export type TechRowProps = {
    name: string;
    color: string;
    repeatCount: number;
    centerIndex: number;
  };
</script>

<script lang="ts">
  import Icon from "@iconify/svelte";

  const { name, color, repeatCount, centerIndex }: TechRowProps = $props();
</script>

{#each Array.from({ length: repeatCount }) as _, colIndex}
  <span
    class="shrink-0 font-mono text-2xl font-semibold lowercase tracking-tight text-muted-foreground/15 select-none sm:text-3xl md:text-4xl"
    style={colIndex === centerIndex ? `color: ${color}` : undefined}
  >
    {name}
  </span>
  <span class="shrink-0 text-muted-foreground/15" aria-hidden="true">
    <Icon
      icon="lucide:star"
      class="size-1.5 fill-current stroke-0 sm:size-2"
    />
  </span>
{/each}
