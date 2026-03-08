<script lang="ts" module>
  export type LanguageSwitchProps = {
    currentLocale: string;
    locales: Array<{ code: string; href: string }>;
  };
</script>

<script lang="ts">
  const { currentLocale, locales }: LanguageSwitchProps = $props();
</script>

<div
  class="inline-flex h-8 w-fit items-center rounded-sm bg-muted p-0.5"
  role="radiogroup"
  aria-label="Language"
>
  {#each locales as locale}
    <a
      role="radio"
      aria-checked={locale.code === currentLocale}
      href={locale.href}
      class="inline-flex h-7 cursor-pointer items-center justify-center rounded-sm px-2.5 text-xs font-medium tracking-wide transition-all duration-200 {locale.code === currentLocale ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}"
    >
      {locale.code.toUpperCase()}
    </a>
  {/each}
</div>
