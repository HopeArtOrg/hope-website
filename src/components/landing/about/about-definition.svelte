<script lang="ts">
  import Icon from "@iconify/svelte";

  import { DefinitionPanel } from "@/components/ui/definition-panel";

  export type AboutDefinitionProps = {
    ref?: HTMLDivElement | null;
  };

  let { ref = $bindable(null) }: AboutDefinitionProps = $props();
</script>

<DefinitionPanel
  bind:ref
  position="left"
  class="font-notojp"
>
  <span class="text-sm">
    <span class="text-base font-semibold">望</span>
    <Icon
      icon="lucide:star"
      class="size-3.5 inline"
    />
    <span class="text-xs font-mono font-primary">/bou/</span>
    <br />
    <span class="italic">名詞</span>
  </span>
  <div class="bg-muted-foreground/30 h-px w-8"></div>
  <span class="text-sm leading-relaxed italic">
    望み、願い、希望。
    <br />
    良いことが起こると
    <br />
    信じる理由。
  </span>
</DefinitionPanel>
