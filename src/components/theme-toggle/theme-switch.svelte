<script lang="ts">
  import Icon from "@iconify/svelte";

  import type { Locale } from "@/i18n/ui";

  import { useTranslations } from "@/i18n/utils";
  import { useThemeStore } from "@/stores/use-theme.svelte";

  const { lang }: { lang: Locale } = $props();

  const themeStore = useThemeStore();
  const t = useTranslations(lang);

  const options = [
    { value: "light" as const, icon: "lucide:sun", label: t("theme.light") },
    { value: "dark" as const, icon: "lucide:moon", label: t("theme.dark") },
    { value: "system" as const, icon: "lucide:monitor", label: t("theme.system") },
  ];
</script>

<div
  class="inline-flex h-8 w-fit items-center rounded-sm bg-muted p-0.5"
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
