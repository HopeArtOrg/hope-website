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
  import { CornerBrackets } from "@/components/ui/corner-brackets";
  import { DefinitionPanel } from "@/components/ui/definition-panel";
  import { prefersReducedMotion } from "@/lib/utils";

  import { animateBigBang, animateBounce, animateFloatDown, animateStarDrift } from "./animations";
  import { setupAuroraBg } from "./aurora-bg";
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
  let auroraRef = $state<HTMLCanvasElement | null>(null);

  let auroraCleanup: (() => void) | undefined;

  $effect(() => {
    if (!mobileStar || !heroContent || !auroraRef)
      return;

    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (isDesktop)
      return;

    if (prefersReducedMotion()) {
      gsap.set(mobileStar, { autoAlpha: 1 });
      gsap.set(heroContent, { autoAlpha: 1 });
      auroraCleanup = setupAuroraBg(auroraRef);
      gsap.set(auroraRef, { opacity: 1 });
      return;
    }

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

    if (prefersReducedMotion()) {
      gsap.set(desktopStar, { autoAlpha: 1, left: "33.333%" });
      gsap.set(heroContent, { autoAlpha: 1 });
      gsap.set(definitionRef, { autoAlpha: 1 });
      auroraCleanup = setupAuroraBg(auroraRef);
      gsap.set(auroraRef, { opacity: 1 });
      return;
    }

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

  function scrollToNextSection() {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
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

  <CornerBrackets
    inset="inset-6 sm:inset-10"
    size="h-12 w-12 sm:h-20 sm:w-20"
    borderColor="border-muted-foreground/60"
  />

  <div
    bind:this={desktopStar}
    class="invisible pointer-events-none absolute inset-y-0 left-0 right-0 hidden items-center justify-center lg:flex"
  >
    <StarIcon class="h-[80dvh] w-[80dvh] text-[oklch(0.18_0.01_60/0.35)] dark:text-[oklch(0.55_0.04_255/0.25)] xl:h-[90dvh] xl:w-[90dvh]" />
  </div>

  <div
    bind:this={mobileStar}
    class="invisible relative flex items-center justify-center lg:hidden"
  >
    <StarIcon class="size-48 text-[oklch(0.18_0.01_60/0.45)] dark:text-[oklch(0.55_0.04_255/0.35)] sm:size-64" />
  </div>

  <DefinitionPanel
    bind:ref={definitionRef}
    position="right"
    vertical
    class="bottom-32"
  >
    <span class="text-right text-sm">
      Hope
      <Icon
        icon="lucide:star"
        class="inline size-3.5"
      />
      -
      <span class="font-mono">/h&#x0259;&#x028A;p/</span>
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
  </DefinitionPanel>

  <div
    bind:this={heroContent}
    class="invisible relative z-10 flex w-full flex-col items-center gap-6 lg:items-start"
  >
    <h1
      aria-label="Hope:Re"
      class="font-mono text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl"
    >
      Hope:Re
    </h1>

    <p class="text-center text-lg text-muted-foreground sm:text-xl lg:text-left">
      {description}
    </p>

    <hr class="h-px w-24 border-0 bg-border sm:w-32" />

    <DownloadActions
      {downloadLabel}
      {downloadForLabel}
      {githubLabel}
    />

    <ComingSoonBadge label={comingSoonLabel} />
  </div>

  <div class="absolute inset-x-0 bottom-8 z-10 flex justify-center sm:bottom-12">
    <ScrollDownPill onclick={scrollToNextSection} />
  </div>
</section>
