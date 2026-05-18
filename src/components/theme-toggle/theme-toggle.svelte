<script lang="ts">
  import Icon from "@iconify/svelte";

  import { useThemeStore } from "@/stores/use-theme.svelte";

  const themeStore = useThemeStore();
</script>

<button
  onclick={() => themeStore.toggle()}
  class=":uno: text-muted-foreground rounded-sm flex size-9 cursor-pointer transition-all duration-500 items-center justify-center relative hover:text-primary sm:size-10 hover:drop-shadow-[0_0_8px_oklch(0.55_0.04_255/0.5)] dark:hover:drop-shadow-[0_0_10px_oklch(var(--color-primary)/0.6)]"
  aria-label="Toggle theme"
>
  {#key themeStore.current}
    <Icon
      icon={themeStore.current === "dark" ? "lucide:moon" : "lucide:sun"}
      class=":uno: size-5 duration-500 animate-in fade-in zoom-in-75"
    />
  {/key}
</button>
