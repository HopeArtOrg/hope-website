<script lang="ts" module>
  import type { Locale } from "@/i18n/ui";

  export type DemoSectionProps = {
    lang: Locale;
  };
</script>

<script lang="ts">
  import Icon from "@iconify/svelte";
  import gsap from "gsap";

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
  import { prefersReducedMotion } from "@/lib/utils";

  import DemoAdversarialSlide from "./demo-adversarial-slide.svelte";
  import DemoWatermarkSlide from "./demo-watermark-slide.svelte";

  const { lang = "vn" }: DemoSectionProps = $props();
  const t = (key: any) => useTranslations(lang)(key);

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
      gsap.set(carouselWrapper, { opacity: 1 });
      if (definitionRef)
        gsap.set(definitionRef, { autoAlpha: 1 });
      return;
    }

    return animateScrollReveal({
      trigger: sectionEl,
      elements: [carouselWrapper],
      definitionEl: definitionRef ?? undefined,
    });
  });
</script>

<section
  bind:this={sectionEl}
  id="demo"
  class=":uno: mx-auto px-4 py-12 flex max-w-screen-xl items-center justify-center relative min-h-dvh lg:py-24 sm:px-6 sm:py-16"
>
  <CornerBrackets corners={["tr", "bl"]} />

  <DefinitionPanel
    bind:ref={definitionRef}
    position="right"
    class=":uno: font-primary text-right"
  >
    <span class=":uno: text-sm">
      <span class=":uno: text-base font-semibold">l'espoir</span>
      <Icon
        icon="lucide:star"
        class=":uno: size-3.5 inline"
      />
      <br />
      <span class=":uno: text-xs font-mono">/l.ɛs.pwaʁ/</span>
      <br />
      <span class=":uno: italic">nom masculin</span>
    </span>
    <div class=":uno: ml-auto bg-muted-foreground/30 h-px w-8"></div>
    <span class=":uno: text-sm leading-relaxed italic">
      Sentiment de confiance en
      <br />
      l'avenir, qui porte a attendre
      <br />
      avec confiance la realisation
      <br />
      de ce que l'on desire.
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
      aria-label="Demo Showcase"
    >
      <CarouselContent>
        <CarouselItem aria-label="Slide 1 of 2: Adversarial Protection">
          <DemoAdversarialSlide {lang} />
        </CarouselItem>

        <CarouselItem aria-label="Slide 2 of 2: Frequency Watermarking">
          <DemoWatermarkSlide {lang} />
        </CarouselItem>
      </CarouselContent>

      <div class=":uno: mt-8 flex gap-4 items-center justify-center sm:mt-12">
        <button
          type="button"
          class=":uno: text-muted-foreground border border-border/50 rounded-full inline-flex size-12 cursor-pointer transition-colors duration-200 items-center justify-center hover:text-foreground hover:border-border disabled:opacity-50 sm:size-10 disabled:pointer-events-none"
          onclick={() => carouselApi?.scrollPrev()}
          disabled={!carouselApi?.canScrollPrev()}
          aria-label={t("demo.prevSlide")}
        >
          <Icon icon="lucide:arrow-left" class=":uno: size-5 sm:size-4" />
        </button>
        <button
          type="button"
          class=":uno: text-muted-foreground border border-border/50 rounded-full inline-flex size-12 cursor-pointer transition-colors duration-200 items-center justify-center hover:text-foreground hover:border-border disabled:opacity-50 sm:size-10 disabled:pointer-events-none"
          onclick={() => carouselApi?.scrollNext()}
          disabled={!carouselApi?.canScrollNext()}
          aria-label={t("demo.nextSlide")}
        >
          <Icon icon="lucide:arrow-right" class=":uno: size-5 sm:size-4" />
        </button>
      </div>
    </Carousel>
  </div>
</section>
