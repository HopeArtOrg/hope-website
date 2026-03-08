<script lang="ts" module>
  export type HeroSectionProps = {
    description: string;
    downloadLabel: string;
    downloadForLabel: string;
    githubLabel: string;
    comingSoonLabel: string;
  };
</script>

<script lang="ts">
  import Icon from "@iconify/svelte";
  import gsap from "gsap";

  import { StarIcon } from "@/components/icons";
  import { ScrollDownPill } from "@/components/landing/scroll-down-pill";
  import { Button } from "@/components/ui/button";
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import { detectPlatform, GITHUB_REPO, GITHUB_REPO_URL, platforms } from "@/lib/constants";

  import { animateBigBang, animateBounce, animateFloatDown, animateStarDrift } from "./animations";
  import { setupAuroraBg } from "./aurora-bg";

  const {
    description,
    downloadLabel,
    downloadForLabel,
    githubLabel,
    comingSoonLabel,
  }: HeroSectionProps = $props();

  let mobileStar = $state<HTMLDivElement | null>(null);
  let desktopStar = $state<HTMLDivElement | null>(null);
  let heroContent = $state<HTMLDivElement | null>(null);
  let definitionRef = $state<HTMLDivElement | null>(null);
  let auroraRef = $state<HTMLCanvasElement | null>(null);
  let starCount = $state<number | null>(null);
  let downloadOpen = $state(false);

  const detectedPlatform = detectPlatform();
  const altPlatforms = $derived(
    detectedPlatform
      ? platforms.filter(p => p !== detectedPlatform)
      : platforms,
  );

  let auroraCleanup: (() => void) | undefined;

  $effect(() => {
    if (!mobileStar || !heroContent || !auroraRef)
      return;

    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (isDesktop)
      return;

    const tl = gsap.timeline();
    tl.add(animateBigBang(mobileStar, true));
    tl.add(() => {
      animateFloatDown(heroContent!, 80, 1, 0.2);
      auroraCleanup = setupAuroraBg(auroraRef!);
      gsap.to(auroraRef!, { opacity: 1, duration: 1.5, ease: "power2.inOut" });
    });

    return () => {
      tl.kill();
      auroraCleanup?.();
    };
  });

  $effect(() => {
    if (!desktopStar || !heroContent || !definitionRef || !auroraRef)
      return;

    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (!isDesktop)
      return;

    const master = gsap.timeline();

    gsap.set(desktopStar, { left: "0%", right: "0%" });

    master.add(animateBigBang(desktopStar));

    master.add(animateStarDrift(desktopStar, "33.333%"));

    master.add(animateBounce(desktopStar));

    master.add(() => {
      animateFloatDown(heroContent!, 80, 1);
      animateFloatDown(definitionRef!, 60, 1.2, 0.2);
      auroraCleanup = setupAuroraBg(auroraRef!);
      gsap.to(auroraRef!, { opacity: 1, duration: 1.5, ease: "power2.inOut" });
    });

    return () => {
      master.kill();
      auroraCleanup?.();
    };
  });

  $effect(() => {
    const controller = new AbortController();
    fetch(`https://api.github.com/repos/${GITHUB_REPO}`, { signal: controller.signal })
      .then(res => res.json())
      .then((data) => {
        if (typeof data.stargazers_count === "number")
          starCount = data.stargazers_count;
      })
      .catch(() => {});
    return () => controller.abort();
  });

  function formatStars(count: number): string {
    if (count >= 1000)
      return `${(count / 1000).toFixed(1)}k`;
    return count.toString();
  }

  function scrollToNextSection() {
    document.querySelector("footer")?.scrollIntoView({ behavior: "smooth" });
  }
</script>

<section
  id="download"
  class="relative mx-auto flex h-dvh max-w-screen-xl flex-col items-center justify-center overflow-hidden px-6"
>
  <canvas
    bind:this={auroraRef}
    class="pointer-events-none absolute inset-0 h-full w-full"
    style="opacity: 0;"
    aria-hidden="true"
  ></canvas>
  <div class="pointer-events-none absolute inset-6 sm:inset-10" aria-hidden="true">
    <span class="absolute top-0 left-0 h-12 w-12 border-t border-l border-muted-foreground/60 sm:h-20 sm:w-20"></span>
    <span class="absolute top-0 right-0 h-12 w-12 border-t border-r border-muted-foreground/60 sm:h-20 sm:w-20"></span>
    <span class="absolute bottom-0 left-0 h-12 w-12 border-b border-l border-muted-foreground/60 sm:h-20 sm:w-20"></span>
    <span class="absolute right-0 bottom-0 h-12 w-12 border-b border-r border-muted-foreground/60 sm:h-20 sm:w-20"></span>
  </div>
  <div bind:this={desktopStar} class="invisible pointer-events-none absolute inset-y-0 left-0 right-0 hidden items-center justify-center lg:flex">
    <StarIcon class="h-[80dvh] w-[80dvh] text-[oklch(0.18_0.01_60/0.35)] dark:text-[oklch(0.55_0.04_255/0.25)] xl:h-[90dvh] xl:w-[90dvh]" />
  </div>

  <div bind:this={mobileStar} class="invisible relative flex items-center justify-center lg:hidden">
    <StarIcon class="size-48 text-[oklch(0.18_0.01_60/0.45)] dark:text-[oklch(0.55_0.04_255/0.35)] sm:size-64" />
  </div>

  <div
    bind:this={definitionRef}
    class="invisible pointer-events-none absolute bottom-32 right-12 hidden select-none flex-col gap-3 text-xs tracking-wide text-muted-foreground/40 lg:flex xl:right-16"
    style="writing-mode: vertical-rl;"
  >
    <span class="text-right text-sm">
      Hope
      <Icon
        icon="lucide:star"
        class="inline size-3.5"
      />
      -
      <span class="font-mono">/həʊp/</span>
      <br />
      <span class="italic">noun</span>
    </span>
    <div class="h-8 w-px self-end bg-muted-foreground/30"></div>
    <span class="text-right text-sm italic">
      [uncountable] a reason
      <br />
      to believe that something
      <br />
      good may happen
    </span>
  </div>

  <div bind:this={heroContent} class="invisible relative z-10 flex w-full flex-col items-center gap-6 lg:items-start">
    <h1 class="font-mono text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
      Hope:Re
    </h1>

    <p class="text-center text-lg text-muted-foreground sm:text-xl lg:text-left">
      {description}
    </p>

    <hr class="h-px w-24 border-0 bg-border sm:w-32" />

    <div class="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
      <div class="inline-flex items-center">
        <Button
          size="lg"
          href={detectedPlatform?.href}
          target="_blank"
          rel="noopener noreferrer"
          class="gap-2 rounded-r-none"
          onclick={detectedPlatform ? undefined : () => { downloadOpen = !downloadOpen; }}
        >
          <Icon
            icon={detectedPlatform?.icon ?? "lucide:download"}
            class="size-4"
          />
          {#if detectedPlatform}
            {downloadForLabel} {detectedPlatform.name}
            <span class="font-mono text-primary-foreground/70">{detectedPlatform.arch}</span>
          {:else}
            {downloadLabel}
          {/if}
        </Button>
        <DropdownMenu bind:open={downloadOpen}>
          <DropdownMenuTrigger>
            {#snippet child({ props })}
              <Button
                {...props}
                size="lg"
                class="rounded-l-none border-l border-primary-foreground/20 px-2.5"
              >
                <Icon
                  icon="lucide:chevron-down"
                  class="size-3.5 transition-transform duration-200 {downloadOpen ? "rotate-180" : ""}"
                />
              </Button>
            {/snippet}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {#each altPlatforms as platform, i}
              {#if i > 0}
                <DropdownMenuSeparator />
              {/if}
              <DropdownMenuItem>
                <a
                  href={platform.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex w-full items-center gap-2"
                >
                  <Icon
                    icon={platform.icon}
                    class="size-4"
                  />
                  {platform.name}
                  <span class="font-mono text-muted-foreground">{platform.arch}</span>
                </a>
              </DropdownMenuItem>
            {/each}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Button
        variant="outline"
        size="lg"
        href={GITHUB_REPO_URL}
        target="_blank"
        rel="noopener noreferrer"
        class="gap-2"
      >
        <Icon
          icon="lucide:github"
          class="size-4"
        />
        {githubLabel}
        {#if starCount !== null}
          <span class="flex items-center gap-1 border-l border-border pl-2 text-muted-foreground">
            <Icon
              icon="lucide:star"
              class="size-3.5"
            />
            {formatStars(starCount)}
          </span>
        {/if}
      </Button>
    </div>

    <div class="mt-8 flex items-center gap-2 text-sm text-muted-foreground sm:mt-12 sm:text-base">
      <span>{comingSoonLabel}</span>
      <Icon
        icon="cib:apple"
        class="size-4 sm:size-5"
      />
      <span>iOS</span>
      <span class="text-border">/</span>
      <Icon
        icon="cib:android"
        class="size-4 sm:size-5"
      />
      <span>Android</span>
    </div>
  </div>

  <div class="absolute inset-x-0 bottom-8 z-10 flex justify-center sm:bottom-12">
    <ScrollDownPill onclick={scrollToNextSection} />
  </div>
</section>
