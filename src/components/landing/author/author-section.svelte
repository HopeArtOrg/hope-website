<script lang="ts" module>
  import type { Locale } from "@/i18n/ui";

  export type AuthorSectionProps = {
    lang: Locale;
  };
</script>

<script lang="ts">
  import Icon from "@iconify/svelte";

  import type { CarouselAPI } from "@/components/ui/carousel/context";

  import {
    Carousel,
    CarouselContent,
    CarouselItem,
  } from "@/components/ui/carousel";
  import { CornerBrackets } from "@/components/ui/corner-brackets";
  import { DefinitionPanel } from "@/components/ui/definition-panel";
  import { useTranslations } from "@/i18n/utils";
  import { animateScrollReveal } from "@/lib/animation-utils";

  import AuthorSlide from "./author-slide.svelte";

  const { lang = "vn" }: AuthorSectionProps = $props();
  const t = (key: any) => useTranslations(lang)(key);

  const haruyuName = $derived(t("author.haruyuName"));
  const noahName = $derived(t("author.noahName"));

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

    return animateScrollReveal({
      trigger: sectionEl,
      elements: [carouselWrapper],
      definitionEl: definitionRef ?? undefined,
    });
  });
</script>

<section
  bind:this={sectionEl}
  id="author"
  class=":uno: mx-auto px-4 py-12 flex max-w-screen-xl items-center justify-center relative min-h-dvh lg:py-24 sm:px-6 sm:py-16"
>
  <CornerBrackets />

  <DefinitionPanel
    bind:ref={definitionRef}
    position="left"
    vertical
    class="font-primary"
  >
    <span class=":uno: text-sm text-right">
      Hi vọng
      <Icon
        icon="lucide:star"
        class=":uno: size-3.5 inline"
      />
      <br />
      <span class=":uno: font-mono">/hi vɔŋ/</span>
      <br />
      <span class=":uno: italic">danh từ</span>
    </span>
    <div class=":uno: bg-muted-foreground/30 h-8 w-px self-end"></div>
    <span class=":uno: text-sm leading-relaxed text-right italic">
      Tin tưởng, mong chờ
      <br />
      điều tốt đẹp sẽ đến
      <br />
      trong tương lai.
    </span>
  </DefinitionPanel>

  <div
    bind:this={carouselWrapper}
    class=":uno: w-full invisible"
  >
    <Carousel
      opts={{ loop: true, align: "center" }}
      setApi={setCarouselApi}
      class="w-full"
      aria-label="Authors Showcase"
    >
      <CarouselContent>
        <CarouselItem aria-label="Slide 1 of 2: {haruyuName}">
          <AuthorSlide
            {lang}
            authorKey="haruyu"
          >
            {#snippet frontImage()}
              <enhanced:img
                src="./assets/haru-1.jpg"
                alt={haruyuName}
                loading="lazy"
                decoding="async"
                class=":uno: h-full w-full object-cover"
              />
            {/snippet}
            {#snippet backImage()}
              <enhanced:img
                src="./assets/haru-2.jpg"
                alt={haruyuName}
                loading="lazy"
                decoding="async"
                class=":uno: h-full w-full object-cover"
              />
            {/snippet}
          </AuthorSlide>
        </CarouselItem>

        <CarouselItem aria-label="Slide 2 of 2: {noahName}">
          <AuthorSlide
            {lang}
            authorKey="noah"
          >
            {#snippet frontImage()}
              <enhanced:img
                src="./assets/noah-1.jpg"
                alt={noahName}
                loading="lazy"
                decoding="async"
                class=":uno: h-full w-full object-cover"
              />
            {/snippet}
            {#snippet backImage()}
              <enhanced:img
                src="./assets/noah-2.jpg"
                alt={noahName}
                loading="lazy"
                decoding="async"
                class=":uno: h-full w-full object-cover"
              />
            {/snippet}
          </AuthorSlide>
        </CarouselItem>
      </CarouselContent>

      <div class=":uno: mt-8 flex gap-4 items-center justify-center sm:mt-12">
        <button
          type="button"
          class=":uno: text-muted-foreground border border-border/50 rounded-full inline-flex size-12 cursor-pointer transition-colors duration-200 items-center justify-center hover:text-foreground hover:border-border disabled:opacity-50 sm:size-10 disabled:pointer-events-none"
          onclick={() => carouselApi?.scrollPrev()}
          disabled={!carouselApi?.canScrollPrev()}
          aria-label={t("author.prevSlide")}
        >
          <Icon icon="lucide:arrow-left" class=":uno: size-5 sm:size-4" />
        </button>
        <button
          type="button"
          class=":uno: text-muted-foreground border border-border/50 rounded-full inline-flex size-12 cursor-pointer transition-colors duration-200 items-center justify-center hover:text-foreground hover:border-border disabled:opacity-50 sm:size-10 disabled:pointer-events-none"
          onclick={() => carouselApi?.scrollNext()}
          disabled={!carouselApi?.canScrollNext()}
          aria-label={t("author.nextSlide")}
        >
          <Icon icon="lucide:arrow-right" class=":uno: size-5 sm:size-4" />
        </button>
      </div>
    </Carousel>
  </div>
</section>
