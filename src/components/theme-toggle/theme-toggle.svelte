<script lang="ts">
  import Icon from "@iconify/svelte";

  import { useThemeStore } from "@/stores/use-theme.svelte";

  const themeStore = useThemeStore();

  function toggle() {
    themeStore.current = themeStore.current === "dark" ? "light" : "dark";
  }
</script>

<button
  onclick={toggle}
  class="relative flex size-9 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-all duration-300 hover:text-primary hover:drop-shadow-[0_0_8px_oklch(0.55_0.04_255/0.5)] dark:hover:drop-shadow-[0_0_10px_oklch(var(--color-primary)/0.6)] sm:size-10"
  aria-label="Toggle theme"
>
  {#key themeStore.current}
    <Icon
      icon={themeStore.current === "dark" ? "lucide:moon" : "lucide:sun"}
      class="size-5 animate-in fade-in zoom-in-75 duration-300"
    />
  {/key}
</button>
