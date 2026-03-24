<script lang="ts">
  import Icon from "@iconify/svelte";
  import gsap from "gsap";

  import { DefinitionPanel } from "@/components/ui/definition-panel";
  import { prefersReducedMotion } from "@/lib/utils";

  import { animateFloatDown } from "./animations";
  import ComingSoonBadge from "./coming-soon-badge.svelte";
  import DownloadActions from "./download-actions.svelte";

  export type HeroContentProps = {
    description: string;
    downloadLabel: string;
    downloadForLabel: string;
    githubLabel: string;
    comingSoonLabel: string;
  };

  const {
    description,
    downloadLabel,
    downloadForLabel,
    githubLabel,
    comingSoonLabel,
  }: HeroContentProps = $props();

  let heroContent = $state<HTMLDivElement | null>(null);
  let definitionRef = $state<HTMLDivElement | null>(null);

  $effect(() => {
    if (!heroContent || !definitionRef)
      return;

    if (prefersReducedMotion()) {
      gsap.set(heroContent, { autoAlpha: 1 });
      gsap.set(definitionRef, { autoAlpha: 1 });
      return;
    }

    // Hero content and definition animation timing
    gsap.delayedCall(1.2, () => {
      if (heroContent)
        animateFloatDown(heroContent, 80, 0.8);
      if (definitionRef)
        animateFloatDown(definitionRef, 60, 1, 0.15);
    });
  });
</script>

<DefinitionPanel
  bind:ref={definitionRef}
  position="right"
  vertical
  class="bottom-32"
>
  <span class="text-sm text-right">
    Hope
    <Icon
      icon="lucide:star"
      class="size-3.5 inline"
    />
    -
    <span class="font-mono">/h&#x0259;&#x028A;p/</span>
    <br />
    <span class="italic">noun</span>
  </span>
  <div class="bg-muted-foreground/30 h-8 w-px self-end"></div>
  <span class="text-sm text-right italic">
    [uncountable] a reason
    <br />
    to believe that something
    <br />
    good may happen
  </span>
</DefinitionPanel>

<div
  bind:this={heroContent}
  class="flex flex-col gap-6 w-full invisible items-center relative z-10 lg:items-start"
>
  <h1
    aria-label="Hope:Re"
    class="text-5xl text-foreground tracking-tight font-bold font-mono lg:text-7xl sm:text-6xl"
  >
    Hope:Re
  </h1>

  <p class="text-lg text-muted-foreground text-center sm:text-xl lg:text-left">
    {description}
  </p>

  <hr class="border-0 bg-border h-px w-24 sm:w-32" />

  <DownloadActions
    {downloadLabel}
    {downloadForLabel}
    {githubLabel}
  />

  <ComingSoonBadge label={comingSoonLabel} />
</div>
