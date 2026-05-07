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

  let isHovered = $state(false);

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
    onmouseenter={() => (isHovered = true)}
    onmouseleave={() => (isHovered = false)}
  >
    <!-- Arrow Icon -->
    <div
      class="hover-arrow text-primary pointer-events-none right-8 top-8 absolute z-20"
      class:is-active={isHovered}
    >
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
        class="text-3xl font-bold font-primary pr-12 transition-colors duration-300"
        class:text-primary={isHovered}
        class:text-foreground={!isHovered}
      >
        {title}
      </h2>

      <p class="text-lg text-muted-foreground/80 leading-relaxed max-w-2xl">
        {description}
      </p>

      <div class="mt-4">
        <span
          class="text-sm tracking-tight font-bold transition-colors duration-300"
          class:text-primary={isHovered}
          class:text-foreground={!isHovered}
        >
          {readMoreLabel}
        </span>
      </div>
    </div>
  </a>
</article>

<style>
  .hover-arrow {
    opacity: 0;
    transform: translate(-1rem, 1rem);
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .hover-arrow.is-active {
    opacity: 1;
    transform: translate(0, 0);
  }
</style>
