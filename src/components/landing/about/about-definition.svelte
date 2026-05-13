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
  class=":uno: font-notojp"
>
  <span class=":uno: text-sm">
    <span class=":uno: text-base font-semibold">望</span>
    <Icon
      icon="lucide:star"
      class=":uno: size-3.5 inline"
    />
    <span class=":uno: text-xs font-mono font-primary">/bou/</span>
    <br />
    <span class=":uno: italic">名詞</span>
  </span>
  <div class=":uno: bg-muted-foreground/30 h-px w-8"></div>
  <span class=":uno: text-sm leading-relaxed italic">
    望み、願い、希望。
    <br />
    良いことが起こると
    <br />
    信じる理由。
  </span>
</DefinitionPanel>
