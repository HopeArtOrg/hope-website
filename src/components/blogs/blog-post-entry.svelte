<script lang="ts">
  import Icon from "@iconify/svelte";

  type Props = {
    id: string;
    title: string;
    description: string;
    publishDate: Date;
    readingTime: number;
    href: string;
    lang: string;
    readMoreLabel: string;
    minReadLabel: string;
  };

  const {
    title,
    description,
    publishDate,
    readingTime,
    href,
    lang,
    readMoreLabel,
    minReadLabel,
  }: Props = $props();

  const formattedDate = $derived(
    publishDate.toLocaleDateString(lang, {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  );
</script>

<article class="post-entry opacity-0 translate-y-8 relative group">
  <a
    {href}
    class="p-8 rounded-2xl block transition-all duration-500 relative -mx-8 hover:bg-primary/5 hover:shadow-[0_0_40px_-10px_rgba(var(--un-primary),0.1)]"
  >
    <div
      class="text-primary opacity-0 pointer-events-none translate-y-4 transition-all duration-500 right-6 top-6 absolute z-10 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 group-hover:translate-y-0"
    >
      <Icon
        icon="lucide:arrow-up-right"
        class="h-10 w-10"
      />
    </div>

    <div class="flex flex-col gap-4">
      <div
        class="text-xs text-muted-foreground/60 tracking-widest font-medium flex gap-4 uppercase items-center"
      >
        <time datetime={publishDate.toISOString()}>
          {formattedDate}
        </time>
        <span class="rounded-full bg-border h-1 w-1"></span>
        <span>
          {readingTime}
          {minReadLabel}
        </span>
      </div>

      <h2
        class="text-3xl text-foreground font-bold font-primary pr-12 transition-colors duration-300 group-hover:text-primary"
      >
        {title}
      </h2>

      <p class="text-lg text-muted-foreground/80 leading-relaxed max-w-2xl">
        {description}
      </p>

      <div class="mt-4">
        <div
          class="text-sm text-foreground tracking-tight font-bold transition-colors duration-300 group-hover:text-primary"
        >
          {readMoreLabel}
        </div>
      </div>
    </div>
  </a>
</article>
