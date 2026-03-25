<script lang="ts" module>
  export type LanguageSwitchProps = {
    currentLocale: string;
    locales: Array<{ code: string; href: string }>;
  };
</script>

<script lang="ts">
  import { cn } from "@/lib/utils";

  const { currentLocale, locales }: LanguageSwitchProps = $props();
</script>

<div
  class=":uno: p-0.5 rounded-sm bg-muted inline-flex h-8 w-fit items-center"
  role="radiogroup"
  aria-label="Language"
>
  {#each locales as locale}
    <a
      role="radio"
      aria-checked={locale.code === currentLocale}
      href={locale.href}
      class={cn(
        ":uno: text-xs tracking-wide font-medium px-2.5 rounded-sm inline-flex h-7 cursor-pointer transition-all duration-200 items-center justify-center",
        locale.code === currentLocale
          ? "text-foreground bg-background shadow-sm"
          : "text-muted-foreground hover:text-foreground",
      )}
    >
      {locale.code.toUpperCase()}
    </a>
  {/each}
</div>
