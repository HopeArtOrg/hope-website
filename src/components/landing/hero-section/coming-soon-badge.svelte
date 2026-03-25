<script lang="ts" module>
  export type ComingSoonBadgeProps = {
    label: string;
  };
</script>

<script lang="ts">
  import Icon from "@iconify/svelte";

  const { label }: ComingSoonBadgeProps = $props();
</script>

<div class=":uno: text-sm text-muted-foreground mt-8 flex gap-2 items-center sm:text-base sm:mt-12">
  <span>{label}</span>
  <Icon
    icon="cib:apple"
    class=":uno: size-4 sm:size-5"
  />
  <span>iOS</span>
  <span class=":uno: text-border">/</span>
  <Icon
    icon="cib:android"
    class=":uno: size-4 sm:size-5"
  />
  <span>Android</span>
</div>
