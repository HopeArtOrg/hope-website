<script lang="ts">
  import Icon from "@iconify/svelte";

  export type BlogPostEntryProps = {
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
  }: BlogPostEntryProps = $props();

  const formattedDate = $derived(
    publishDate.toLocaleDateString(lang, {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  );
</script>

<article class="post-entry opacity-0 translate-y-8 relative">
  <a
    {href}
    class="post-link p-4 rounded-xl block transition-all duration-300 relative -mx-4 sm:p-8 hover:bg-primary/5 sm:-mx-8"
  >
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
        class="post-title text-3xl font-bold font-primary transition-colors duration-300"
      >
        {title}
      </h2>

      <p class="text-lg text-muted-foreground/80 leading-relaxed max-w-2xl">
        {description}
      </p>

      <div class="mt-4">
        <div
          class="read-more text-sm text-foreground tracking-tight font-bold flex gap-1 transition-colors duration-300 items-center"
        >
          {readMoreLabel}
          <Icon
            icon="lucide:arrow-up-right"
            width="18"
            height="18"
            class="transition-transform duration-300"
          />
        </div>
      </div>
    </div>
  </a>
</article>

<style>
  .post-link:hover .post-title,
  .post-link:hover .read-more {
    color: oklch(var(--primary));
  }

  .post-link:hover .read-more :global(svg) {
    transform: translate(2px, -2px);
  }
</style>
