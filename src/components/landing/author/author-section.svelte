<script lang="ts" module>
  export type AuthorSectionProps = {
    heading: string;
    haruyuName: string;
    haruyuQuote: string;
    noahName: string;
    noahQuote: string;
    githubLabel: string;
    vgenLabel: string;
    facebookLabel: string;
    portfolioLabel: string;
    prevSlideLabel: string;
    nextSlideLabel: string;
  };
</script>

<script lang="ts">
  import Icon from "@iconify/svelte";
  import gsap from "gsap";

  import type { CarouselAPI } from "@/components/ui/carousel/context";
  import type { AuthorSocialLink } from "@/lib/constants";

  import {
    Carousel,
    CarouselContent,
    CarouselItem,
  } from "@/components/ui/carousel";
  import { HARUYU_LINKS, NOAH_LINKS } from "@/lib/constants";
  import { prefersReducedMotion } from "@/lib/utils";

  import { animateScrollReveal } from "./animations";
  import AuthorSlide from "./author-slide.svelte";

  const {
    heading,
    haruyuName,
    haruyuQuote,
    noahName,
    noahQuote,
    githubLabel,
    vgenLabel,
    facebookLabel,
    portfolioLabel,
    prevSlideLabel,
    nextSlideLabel,
  }: AuthorSectionProps = $props();

  const labelMap: Record<string, string> = $derived({
    "author.github": githubLabel,
    "author.vgen": vgenLabel,
    "author.facebook": facebookLabel,
    "author.portfolio": portfolioLabel,
  });

  function resolveLabel(link: AuthorSocialLink): string {
    return labelMap[link.labelKey] ?? link.labelKey;
  }

  let sectionEl = $state<HTMLElement | null>(null);
  let definitionRef = $state<HTMLDivElement | null>(null);
  let carouselWrapper = $state<HTMLDivElement | null>(null);
  let carouselApi = $state<CarouselAPI | undefined>(undefined);

  function setCarouselApi(api: CarouselAPI | undefined) {
    carouselApi = api;
  }

  $effect(() => {
    if (!sectionEl || !carouselWrapper)
      return;

    if (prefersReducedMotion()) {
      gsap.set(carouselWrapper, { autoAlpha: 1 });
      if (definitionRef)
        gsap.set(definitionRef, { autoAlpha: 1 });
      return;
    }

    return animateScrollReveal(
      sectionEl,
      [carouselWrapper],
      definitionRef ?? undefined,
    );
  });
</script>

<section
  bind:this={sectionEl}
  id="author"
  class="relative mx-auto flex min-h-dvh max-w-screen-xl items-center justify-center px-4 py-12 sm:px-6 sm:py-16 lg:py-24"
>
  <div
    class="pointer-events-none absolute inset-4 sm:inset-6 lg:inset-10"
    aria-hidden="true"
  >
    <span class="absolute top-0 left-0 h-10 w-10 border-t border-l border-muted-foreground/40 sm:h-14 sm:w-14 lg:h-20 lg:w-20"></span>
    <span class="absolute top-0 right-0 h-10 w-10 border-t border-r border-muted-foreground/40 sm:h-14 sm:w-14 lg:h-20 lg:w-20"></span>
    <span class="absolute bottom-0 left-0 h-10 w-10 border-b border-l border-muted-foreground/40 sm:h-14 sm:w-14 lg:h-20 lg:w-20"></span>
    <span class="absolute right-0 bottom-0 h-10 w-10 border-b border-r border-muted-foreground/40 sm:h-14 sm:w-14 lg:h-20 lg:w-20"></span>
  </div>

  <div
    bind:this={definitionRef}
    class="invisible pointer-events-none absolute bottom-16 left-12 hidden select-none flex-col gap-3 font-primary text-xs tracking-wide text-muted-foreground/40 lg:flex xl:left-16"
    style="writing-mode: vertical-rl;"
    aria-hidden="true"
  >
    <span class="text-right text-sm">
      Hi vọng
      <Icon
        icon="lucide:star"
        class="inline size-3.5"
      />
      <br />
      <span class="font-mono">/hi vɔŋ/</span>
      <br />
      <span class="italic">danh từ</span>
    </span>
    <div class="h-8 w-px self-end bg-muted-foreground/30"></div>
    <span class="text-right text-sm italic leading-relaxed">
      Tin tưởng, mong chờ
      <br />
      điều tốt đẹp sẽ đến
      <br />
      trong tương lai.
    </span>
  </div>

  <div
    bind:this={carouselWrapper}
    class="invisible w-full"
  >
    <Carousel
      opts={{ loop: true, align: "center" }}
      setApi={setCarouselApi}
      class="w-full"
      aria-label={heading}
    >
      <CarouselContent>
        <CarouselItem aria-label="{haruyuName} - 1 / 2">
          <AuthorSlide
            {heading}
            name={haruyuName}
            quote={haruyuQuote}
            links={HARUYU_LINKS}
            {resolveLabel}
            slideLabel="{haruyuName} - 1 / 2"
          >
            {#snippet frontImage()}
              <enhanced:img
                src="./assets/haru-1.jpg"
                alt={haruyuName}
                loading="lazy"
                class="h-full w-full object-cover"
              />
            {/snippet}
            {#snippet backImage()}
              <enhanced:img
                src="./assets/haru-2.jpg"
                alt={haruyuName}
                loading="lazy"
                class="h-full w-full object-cover"
              />
            {/snippet}
          </AuthorSlide>
        </CarouselItem>

        <CarouselItem aria-label="{noahName} - 2 / 2">
          <AuthorSlide
            {heading}
            name={noahName}
            quote={noahQuote}
            links={NOAH_LINKS}
            {resolveLabel}
            slideLabel="{noahName} - 2 / 2"
          >
            {#snippet frontImage()}
              <enhanced:img
                src="./assets/noah-1.jpg"
                alt={noahName}
                loading="lazy"
                class="h-full w-full object-cover"
              />
            {/snippet}
            {#snippet backImage()}
              <enhanced:img
                src="./assets/noah-2.jpg"
                alt={noahName}
                loading="lazy"
                class="h-full w-full object-cover"
              />
            {/snippet}
          </AuthorSlide>
        </CarouselItem>
      </CarouselContent>

      <div class="mt-8 flex items-center justify-center gap-4 sm:mt-12">
        <button
          type="button"
          class="inline-flex size-9 cursor-pointer items-center justify-center rounded-full border border-border/50 text-muted-foreground transition-colors duration-200 hover:border-border hover:text-foreground disabled:pointer-events-none disabled:opacity-50"
          onclick={() => carouselApi?.scrollPrev()}
          disabled={!carouselApi?.canScrollPrev()}
          aria-label={prevSlideLabel}
        >
          <Icon icon="lucide:arrow-left" class="size-4" />
        </button>
        <button
          type="button"
          class="inline-flex size-9 cursor-pointer items-center justify-center rounded-full border border-border/50 text-muted-foreground transition-colors duration-200 hover:border-border hover:text-foreground disabled:pointer-events-none disabled:opacity-50"
          onclick={() => carouselApi?.scrollNext()}
          disabled={!carouselApi?.canScrollNext()}
          aria-label={nextSlideLabel}
        >
          <Icon icon="lucide:arrow-right" class="size-4" />
        </button>
      </div>
    </Carousel>
  </div>
</section>
