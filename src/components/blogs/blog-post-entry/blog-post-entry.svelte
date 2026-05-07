<script lang="ts">
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
    class="p-8 rounded-2xl block transition-all duration-500 relative group -mx-8 hover:bg-primary/5 hover:shadow-primary/5 hover:shadow-xl"
  >
    <!-- Arrow Icon (Pure SVG for maximum reliability) -->
    <div
      class="text-primary opacity-0 pointer-events-none translate-y-4 transition-all duration-500 right-8 top-8 absolute z-20 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 group-hover:translate-y-0"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M7 7h10v10" />
        <path d="M7 17 17 7" />
      </svg>
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
        class="text-3xl font-bold font-primary pr-16 transition-colors duration-300 group-hover:text-primary"
      >
        {title}
      </h2>

      <p class="text-lg text-muted-foreground/80 leading-relaxed max-w-2xl">
        {description}
      </p>

      <div class="mt-4">
        <span
          class="text-sm text-foreground tracking-tight font-bold transition-colors duration-300 group-hover:text-primary"
        >
          {readMoreLabel}
        </span>
      </div>
    </div>
  </a>
</article>
