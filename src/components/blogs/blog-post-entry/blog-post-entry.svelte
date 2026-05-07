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
    class="post-link p-8 rounded-2xl block transition-all duration-500 relative -mx-8 hover:bg-primary/5 hover:shadow-primary/5 hover:shadow-xl"
  >
    <!-- Arrow Icon (@iconify/svelte + CSS for reliability) -->
    <div class="hover-arrow pointer-events-none z-20">
      <Icon
        icon="lucide:arrow-up-right"
        width="40"
        height="40"
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
        class="post-title text-3xl font-bold font-primary pr-16 transition-colors duration-300"
      >
        {title}
      </h2>

      <p class="text-lg text-muted-foreground/80 leading-relaxed max-w-2xl">
        {description}
      </p>

      <div class="mt-4">
        <span
          class="read-more text-sm text-foreground tracking-tight font-bold transition-colors duration-300"
        >
          {readMoreLabel}
        </span>
      </div>
    </div>
  </a>
</article>

<style>
  .hover-arrow {
    position: absolute;
    top: 2rem;
    right: 2rem;
    opacity: 0;
    transform: translate(-1rem, 1rem);
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    /* Explicitly use the primary color from the theme */
    color: oklch(var(--primary));
  }

  /* Fallback color if variable is missing */
  :global(.dark) .hover-arrow {
    color: oklch(0.68 0.04 255);
  }

  .post-link:hover .hover-arrow {
    opacity: 1;
    transform: translate(0, 0);
  }

  .post-link:hover .post-title,
  .post-link:hover .read-more {
    color: oklch(var(--primary));
  }
</style>
