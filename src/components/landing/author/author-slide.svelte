<script lang="ts" module>
  import type { Snippet } from "svelte";

  import type { AuthorSocialLink } from "@/lib/constants";

  export type AuthorSlideProps = {
    heading: string;
    name: string;
    quote: string;
    links: AuthorSocialLink[];
    resolveLabel: (link: AuthorSocialLink) => string;
    slideLabel: string;
    frontImage: Snippet;
    backImage: Snippet;
  };
</script>

<script lang="ts">
  import Icon from "@iconify/svelte";

  import {
    createShuffleState,
    explodeStars,
    setupImageShuffle,
    setupImageTilt,
  } from "./animations";

  const {
    heading,
    name,
    quote,
    links,
    resolveLabel,
    slideLabel,
    frontImage,
    backImage,
  }: AuthorSlideProps = $props();

  let imageContainer = $state<HTMLDivElement | null>(null);
  let frontImg = $state<HTMLDivElement | null>(null);
  let backImg = $state<HTMLDivElement | null>(null);
  let nameHeading = $state<HTMLHeadingElement | null>(null);

  const shuffleState = createShuffleState();

  $effect(() => {
    if (!imageContainer || !frontImg || !backImg)
      return;
    const tiltCleanup = setupImageTilt(imageContainer, frontImg, backImg, shuffleState);
    const shuffleCleanup = setupImageShuffle(frontImg, backImg, shuffleState);
    return () => {
      tiltCleanup();
      shuffleCleanup();
    };
  });

  function handleNameClick() {
    if (nameHeading)
      explodeStars(nameHeading);
  }
</script>

<div
  class="gap-8 grid w-full items-center lg:gap-16 sm:gap-12 lg:grid-cols-2"
  aria-label={slideLabel}
>
  <div class="pb-6 pr-6 flex items-center justify-center relative">
    <div
      bind:this={imageContainer}
      class="max-w-[240px] w-full aspect-3/4 relative overflow-visible md:max-w-[320px] sm:max-w-[280px]"
    >
      <div
        bind:this={frontImg}
        class="border border-border/50 rounded-lg shadow-lg inset-0 absolute"
        style="z-index: 10;"
      >
        <div class="rounded-lg h-full w-full overflow-hidden">
          {@render frontImage()}
        </div>
      </div>
      <div
        bind:this={backImg}
        role="button"
        tabindex="0"
        aria-label="Shuffle {name} photos"
        class="border border-border/50 rounded-lg cursor-pointer shadow-lg inset-0 absolute focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        style="z-index: 1;"
      >
        <div class="rounded-lg h-full w-full overflow-hidden">
          {@render backImage()}
        </div>
      </div>
    </div>
  </div>

  <div class="text-center flex flex-col items-center lg:text-left lg:items-start">
    <span class="text-xs text-muted-foreground/60 tracking-widest font-mono uppercase sm:text-sm">
      {heading}
    </span>
    <h2
      bind:this={nameHeading}
      class="text-2xl text-foreground tracking-tight font-bold font-mono mt-2 relative overflow-visible lg:text-5xl md:text-4xl sm:text-3xl"
    >
      <button
        type="button"
        class="text-inherit font-inherit p-0 bg-transparent cursor-pointer select-none"
        onclick={handleNameClick}
      >
        {name}
      </button>
    </h2>
    <blockquote class="text-sm text-muted-foreground leading-relaxed mt-4 pl-4 border-l-2 border-muted-foreground/20 max-w-md italic md:text-lg sm:text-base sm:mt-6">
      &ldquo;{quote}&rdquo;
    </blockquote>
    <div class="mt-6 flex flex-wrap gap-3 items-center sm:mt-8">
      {#each links as link}
        <a
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          class="text-xs font-medium px-3 py-1.5 border border-border/50 rounded-sm inline-flex gap-1.5 transition-colors duration-200 items-center sm:text-sm hover:border-border"
          style="color: {link.color};"
        >
          <Icon icon={link.icon} class="size-3.5 sm:size-4" />
          {resolveLabel(link)}
          <span class="sr-only">(opens in a new tab)</span>
        </a>
      {/each}
    </div>
  </div>
</div>
