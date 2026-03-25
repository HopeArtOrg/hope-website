<script lang="ts">
  import Icon from "@iconify/svelte";

  import type { Locale } from "@/i18n/ui";

  import { useTranslations } from "@/i18n/utils";
  import { useThemeStore } from "@/stores/use-theme.svelte";

  const { lang }: { lang: Locale } = $props();

  const themeStore = useThemeStore();
  const t = $derived(useTranslations(lang));

  const options = $derived([
    { value: "light" as const, icon: "lucide:sun", label: t("theme.light") },
    { value: "dark" as const, icon: "lucide:moon", label: t("theme.dark") },
    { value: "system" as const, icon: "lucide:monitor", label: t("theme.system") },
  ]);
</script>

<div
  class=":uno: p-0.5 rounded-sm bg-muted inline-flex h-8 w-fit items-center"
  role="radiogroup"
  aria-label="Theme"
>
  {#each options as option}
    <button
      role="radio"
      aria-checked={themeStore.current === option.value}
      aria-label={option.value}
      class=":uno: text-xs font-medium px-2.5 rounded-sm inline-flex gap-1.5 h-7 cursor-pointer transition-all duration-200 items-center justify-center {themeStore.current === option.value ? "text-foreground bg-background shadow-sm" : "text-muted-foreground hover:text-foreground"}"
      onclick={() => (themeStore.current = option.value)}
    >
      <Icon
        icon={option.icon}
        class=":uno: size-3.5"
      />
      <span>{option.label}</span>
    </button>
  {/each}
</div>
