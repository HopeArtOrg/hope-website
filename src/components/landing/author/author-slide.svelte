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
  class="grid w-full items-center gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16"
  aria-label={slideLabel}
>
  <div class="relative flex items-center justify-center pb-6 pr-6">
    <div
      bind:this={imageContainer}
      class="relative aspect-3/4 w-full max-w-[240px] overflow-visible sm:max-w-[280px] md:max-w-[320px]"
    >
      <div
        bind:this={frontImg}
        class="absolute inset-0 rounded-lg border border-border/50 shadow-lg"
        style="z-index: 10;"
      >
        <div class="h-full w-full overflow-hidden rounded-lg">
          {@render frontImage()}
        </div>
      </div>
      <div
        bind:this={backImg}
        role="button"
        tabindex="0"
        aria-label="Shuffle {name} photos"
        class="absolute inset-0 cursor-pointer rounded-lg border border-border/50 shadow-lg focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
        style="z-index: 1;"
      >
        <div class="h-full w-full overflow-hidden rounded-lg">
          {@render backImage()}
        </div>
      </div>
    </div>
  </div>

  <div class="flex flex-col items-center text-center lg:items-start lg:text-left">
    <span class="font-mono text-xs uppercase tracking-widest text-muted-foreground/60 sm:text-sm">
      {heading}
    </span>
    <h2
      bind:this={nameHeading}
      class="relative mt-2 overflow-visible font-mono text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl"
    >
      <button
        type="button"
        class="cursor-pointer select-none bg-transparent p-0 font-inherit text-inherit"
        onclick={handleNameClick}
      >
        {name}
      </button>
    </h2>
    <blockquote class="mt-4 max-w-md border-l-2 border-muted-foreground/20 pl-4 text-sm italic leading-relaxed text-muted-foreground sm:mt-6 sm:text-base md:text-lg">
      &ldquo;{quote}&rdquo;
    </blockquote>
    <div class="mt-6 flex flex-wrap items-center gap-3 sm:mt-8">
      {#each links as link}
        <a
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1.5 rounded-sm border border-border/50 px-3 py-1.5 text-xs font-medium transition-colors duration-200 hover:border-border sm:text-sm"
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
