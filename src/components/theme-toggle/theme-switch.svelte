<script lang="ts">
  import Icon from "@iconify/svelte";

  import { useThemeStore } from "@/stores/use-theme.svelte";

  const themeStore = useThemeStore();

  const options = [
    { value: "light" as const, icon: "lucide:sun", label: "Light" },
    { value: "dark" as const, icon: "lucide:moon", label: "Dark" },
    { value: "system" as const, icon: "lucide:monitor", label: "System" },
  ];
</script>

<div
  class="inline-flex h-8 w-fit items-center rounded-md bg-muted p-0.5"
  role="radiogroup"
  aria-label="Theme"
>
  {#each options as option}
    <button
      role="radio"
      aria-checked={themeStore.current === option.value}
      aria-label={option.value}
      class="inline-flex h-7 cursor-pointer items-center justify-center gap-1.5 rounded-sm px-2.5 text-xs font-medium transition-all duration-200 {themeStore.current === option.value ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}"
      onclick={() => (themeStore.current = option.value)}
    >
      <Icon
        icon={option.icon}
        class="size-3.5"
      />
      <span>{option.label}</span>
    </button>
  {/each}
</div>
