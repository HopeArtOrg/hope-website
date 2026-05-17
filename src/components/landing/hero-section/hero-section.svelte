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

  import { AuroraBackground } from "@/components/aurora-animations";
  import { animateBigBang, animateBounce, animateFloatDown, animateStarDrift } from "@/components/aurora-animations/animations";
  import { StarIcon } from "@/components/icons";
  import { ScrollDownPill } from "@/components/landing/scroll-down-pill";
  import { CornerBrackets } from "@/components/ui/corner-brackets";
  import { DefinitionPanel } from "@/components/ui/definition-panel";
  import { prefersReducedMotion } from "@/lib/utils";

  import ComingSoonBadge from "./coming-soon-badge.svelte";
  import DownloadActions from "./download-actions.svelte";

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
  let auroraWrapper = $state<HTMLDivElement | null>(null);

  $effect(() => {
    if (!mobileStar || !heroContent || !auroraWrapper)
      return;

    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (isDesktop)
      return;

    if (prefersReducedMotion()) {
      gsap.set(mobileStar, { autoAlpha: 1 });
      gsap.set(heroContent, { autoAlpha: 1 });
      gsap.set(auroraWrapper, { opacity: 1 });
      return;
    }

    const tl = gsap.timeline({ delay: 0.1 });
    tl.add(animateBigBang(mobileStar, true));
    tl.add(() => {
      animateFloatDown(heroContent!, 80, 0.8, 0.15);
    });
    tl.add(() => {
      gsap.to(auroraWrapper!, { opacity: 1, duration: 1.2, ease: "power2.inOut" });
    }, "-=0.4");

    return () => {
      tl.kill();
    };
  });

  $effect(() => {
    if (!desktopStar || !heroContent || !definitionRef || !auroraWrapper)
      return;

    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (!isDesktop)
      return;

    if (prefersReducedMotion()) {
      gsap.set(desktopStar, { autoAlpha: 1, left: "33.333%" });
      gsap.set(heroContent, { autoAlpha: 1 });
      gsap.set(definitionRef, { autoAlpha: 1 });
      gsap.set(auroraWrapper, { opacity: 1 });
      return;
    }

    const master = gsap.timeline({ delay: 0.1 });

    gsap.set(desktopStar, { left: "0%", right: "0%" });

    master.add(animateBigBang(desktopStar));
    master.add(animateStarDrift(desktopStar, "33.333%"));
    master.add(animateBounce(desktopStar));

    master.add(() => {
      animateFloatDown(heroContent!, 80, 0.8);
      animateFloatDown(definitionRef!, 60, 1, 0.15);
    });

    master.add(() => {
      gsap.to(auroraWrapper!, { opacity: 1, duration: 1.2, ease: "power2.inOut" });
    }, "-=0.5");

    return () => {
      master.kill();
    };
  });

  function scrollToNextSection() {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  }
</script>

<section
  id="download"
  class=":uno: mx-auto px-6 flex flex-col max-w-screen-xl items-center justify-center relative overflow-hidden h-dvh"
>
  <div
    bind:this={auroraWrapper}
    class=":uno: pointer-events-none inset-0 absolute"
    style="opacity: 0;"
  >
    <AuroraBackground />
  </div>

  <CornerBrackets
    inset="inset-6 sm:inset-10"
    size="h-12 w-12 sm:h-20 sm:w-20"
    borderColor="border-muted-foreground/60"
  />

  <div
    bind:this={desktopStar}
    class=":uno: hidden invisible pointer-events-none items-center inset-y-0 left-0 right-0 justify-center absolute lg:flex"
  >
    <StarIcon class=":uno: text-[oklch(0.18_0.01_60/0.35)] h-[80dvh] w-[80dvh] dark:text-[oklch(0.55_0.04_255/0.25)] xl:h-[90dvh] xl:w-[90dvh]" />
  </div>

  <div
    bind:this={mobileStar}
    class=":uno: flex invisible items-center justify-center relative lg:hidden"
  >
    <StarIcon class=":uno: text-[oklch(0.18_0.01_60/0.45)] size-48 dark:text-[oklch(0.55_0.04_255/0.35)] sm:size-64" />
  </div>

  <DefinitionPanel
    bind:ref={definitionRef}
    position="right"
    vertical
    class=":uno: bottom-32"
  >
    <span class=":uno: text-sm text-right">
      Hope
      <Icon
        icon="lucide:star"
        class=":uno: size-3.5 inline"
      />
      -
      <span class=":uno: font-mono">/h&#x0259;&#x028A;p/</span>
      <br />
      <span class=":uno: italic">noun</span>
    </span>
    <div class=":uno: bg-muted-foreground/30 h-8 w-px self-end"></div>
    <span class=":uno: text-sm text-right italic">
      [uncountable] a reason
      <br />
      to believe that something
      <br />
      good may happen
    </span>
  </DefinitionPanel>

  <div
    bind:this={heroContent}
    class=":uno: flex flex-col gap-6 w-full invisible items-center relative z-10 lg:items-start"
  >
    <h1
      aria-label="Hope:Re"
      class=":uno: text-5xl text-foreground tracking-tight font-bold font-mono lg:text-7xl sm:text-6xl"
    >
      Hope:Re
    </h1>

    <p class=":uno: text-lg text-muted-foreground text-center sm:text-xl lg:text-left">
      {description}
    </p>

    <hr class=":uno: border-0 bg-border h-px w-24 sm:w-32" />

    <DownloadActions
      {downloadLabel}
      {downloadForLabel}
      {githubLabel}
    />

    <ComingSoonBadge label={comingSoonLabel} />
  </div>

  <div class=":uno: flex inset-x-0 bottom-8 justify-center absolute z-10 sm:bottom-12">
    <ScrollDownPill onclick={scrollToNextSection} />
  </div>
</section>
