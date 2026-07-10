<script lang="ts" module>
  import type { Locale } from "@/i18n/ui";

  export type ComingSoonBadgeProps = {
    lang: Locale;
  };
</script>

<script lang="ts">
  import Icon from "@iconify/svelte";

  import { useTranslations } from "@/i18n/utils";

  const { lang = "vn" }: ComingSoonBadgeProps = $props();
  const t = (key: any) => useTranslations(lang)(key);
</script>

<div class=":uno: text-sm text-muted-foreground mt-8 flex gap-2 items-center sm:text-base sm:mt-12">
  <span>{t("hero.comingSoon")}</span>
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
