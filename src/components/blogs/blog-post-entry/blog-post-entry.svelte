<script lang="ts" module>
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
</script>

<script lang="ts">
  import Icon from "@iconify/svelte";

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

<article class="post-entry opacity-0 translate-y-8 relative group">
  <a
    {href}
    class="post-link p-4 rounded-xl block transition-all duration-300 relative -mx-4 sm:p-8 hover:bg-primary/5 sm:-mx-8"
  >
    <div
      class="text-muted-foreground/40 transition-all duration-300 right-6 top-6 absolute group-hover:text-primary group-hover:translate-x-1 sm:right-10 sm:top-10 group-hover:-translate-y-1"
    >
      <Icon
        icon="lucide:arrow-up-right"
        class="h-8 w-8"
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
        class="post-title text-3xl font-bold font-primary pr-12 transition-colors duration-300"
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
</style>
