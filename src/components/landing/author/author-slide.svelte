<script lang="ts" module>
  import type { Snippet } from "svelte";

  import type { Locale } from "@/i18n/ui";

  export type AuthorSlideProps = {
    lang: Locale;
    authorKey: "haruyu" | "noah";
    frontImage: Snippet;
    backImage: Snippet;
  };
</script>

<script lang="ts">
  import Icon from "@iconify/svelte";

  import { useTranslations } from "@/i18n/utils";
  import { HARUYU_LINKS, NOAH_LINKS } from "@/lib/constants";

  import {
    createShuffleState,
    explodeStars,
    setupImageShuffle,
    setupImageTilt,
  } from "./animations";

  const {
    lang = "vn",
    authorKey,
    frontImage,
    backImage,
  }: AuthorSlideProps = $props();

  const t = (key: any) => useTranslations(lang)(key);

  const name = $derived(authorKey === "haruyu" ? t("author.haruyuName") : t("author.noahName"));
  const quote = $derived(authorKey === "haruyu" ? t("author.haruyuQuote") : t("author.noahQuote"));
  const heading = $derived(t("author.heading"));
  const slideLabel = $derived(name);

  const links = $derived(authorKey === "haruyu" ? HARUYU_LINKS : NOAH_LINKS);
  const resolvedLinks = $derived(
    links.map(link => ({
      ...link,
      resolvedLabel: t(link.labelKey as any),
    })),
  );

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
  class=":uno: gap-8 grid w-full items-center lg:gap-16 sm:gap-12 lg:grid-cols-2"
  aria-label={slideLabel}
>
  <div class=":uno: pb-6 pr-6 flex items-center justify-center relative">
    <div
      bind:this={imageContainer}
      class=":uno: max-w-[240px] w-full aspect-3/4 relative overflow-visible md:max-w-[320px] sm:max-w-[280px]"
    >
      <div
        bind:this={frontImg}
        class=":uno: border border-border/50 rounded-lg shadow-lg inset-0 absolute"
        style="z-index: 10;"
      >
        <div class=":uno: rounded-lg h-full w-full overflow-hidden">
          {@render frontImage()}
        </div>
      </div>
      <div
        bind:this={backImg}
        role="button"
        tabindex="0"
        aria-label="Shuffle {name} photos"
        class=":uno: border border-border/50 rounded-lg cursor-pointer shadow-lg inset-0 absolute focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        style="z-index: 1;"
      >
        <div class=":uno: rounded-lg h-full w-full overflow-hidden">
          {@render backImage()}
        </div>
      </div>
    </div>
  </div>

  <div class=":uno: text-center flex flex-col items-center lg:text-left lg:items-start">
    <span class=":uno: text-xs text-muted-foreground/60 tracking-widest font-mono uppercase sm:text-sm">
      {heading}
    </span>
    <h2
      bind:this={nameHeading}
      class=":uno: text-2xl text-foreground tracking-tight font-bold font-mono mt-2 relative overflow-visible lg:text-5xl md:text-4xl sm:text-3xl"
    >
      <button
        type="button"
        class=":uno: text-inherit font-inherit p-0 bg-transparent cursor-pointer select-none"
        aria-label="Reveal effects for {name}"
        onclick={handleNameClick}
      >
        {name}
      </button>
    </h2>
    <blockquote class=":uno: text-lg text-muted-foreground leading-relaxed font-semibold mt-4 pl-4 border-l-2 border-primary/40 max-w-md italic sm:text-xl sm:mt-6">
      &ldquo;{quote}&rdquo;
    </blockquote>
    <div class=":uno: mt-6 flex flex-wrap gap-3 items-center sm:mt-8">
      {#each resolvedLinks as link (link.href)}
        <a
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          class=":uno: text-xs font-medium px-3 py-1.5 border border-border/50 rounded-sm inline-flex gap-1.5 transition-colors duration-200 items-center sm:text-sm hover:border-border"
          style="color: {link.color};"
          aria-label="{link.resolvedLabel} (opens in a new tab)"
        >
          <Icon icon={link.icon} class=":uno: size-3.5 sm:size-4" />
          {link.resolvedLabel}
        </a>
      {/each}
    </div>
  </div>
</div>
