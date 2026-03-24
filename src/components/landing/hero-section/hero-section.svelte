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
  import { ScrollDownPill } from "@/components/landing/scroll-down-pill";
  import { CornerBrackets } from "@/components/ui/corner-brackets";

  import HeroBackground from "./hero-background.svelte";
  import HeroContent from "./hero-content.svelte";
  import HeroStarIcon from "./hero-star-icon.svelte";

  const {
    description,
    downloadLabel,
    downloadForLabel,
    githubLabel,
    comingSoonLabel,
  }: HeroSectionProps = $props();

  function scrollToNextSection() {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  }
</script>

<section
  id="download"
  class="mx-auto px-6 flex flex-col max-w-screen-xl items-center justify-center relative overflow-hidden h-dvh"
>
  <HeroBackground />

  <CornerBrackets
    inset="inset-6 sm:inset-10"
    size="h-12 w-12 sm:h-20 sm:w-20"
    borderColor="border-muted-foreground/60"
  />

  <HeroStarIcon />

  <HeroContent
    {description}
    {downloadLabel}
    {downloadForLabel}
    {githubLabel}
    {comingSoonLabel}
  />

  <div class="flex inset-x-0 bottom-8 justify-center absolute z-10 sm:bottom-12">
    <ScrollDownPill onclick={scrollToNextSection} />
  </div>
</section>
