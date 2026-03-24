<script lang="ts">
  import gsap from "gsap";

  import { StarIcon } from "@/components/icons";
  import { prefersReducedMotion } from "@/lib/utils";

  import { animateBigBang, animateBounce, animateStarDrift } from "./animations";

  let mobileStar = $state<HTMLDivElement | null>(null);
  let desktopStar = $state<HTMLDivElement | null>(null);

  $effect(() => {
    if (!mobileStar)
      return;

    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (isDesktop)
      return;

    if (prefersReducedMotion()) {
      gsap.set(mobileStar, { autoAlpha: 1 });
      return;
    }

    const tl = animateBigBang(mobileStar, true);
    return () => tl.kill();
  });

  $effect(() => {
    if (!desktopStar)
      return;

    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (!isDesktop)
      return;

    if (prefersReducedMotion()) {
      gsap.set(desktopStar, { autoAlpha: 1, left: "33.333%" });
      return;
    }

    const master = gsap.timeline({ delay: 0.1 });
    gsap.set(desktopStar, { left: "0%", right: "0%" });
    master.add(animateBigBang(desktopStar));
    master.add(animateStarDrift(desktopStar, "33.333%"));
    master.add(animateBounce(desktopStar));

    return () => master.kill();
  });
</script>

<div
  bind:this={desktopStar}
  class="hidden invisible pointer-events-none items-center inset-y-0 left-0 right-0 justify-center absolute lg:flex"
>
  <StarIcon class="text-[oklch(0.18_0.01_60/0.35)] h-[80dvh] w-[80dvh] dark:text-[oklch(0.55_0.04_255/0.25)] xl:h-[90dvh] xl:w-[90dvh]" />
</div>

<div
  bind:this={mobileStar}
  class="flex invisible items-center justify-center relative lg:hidden"
>
  <StarIcon class="text-[oklch(0.18_0.01_60/0.45)] size-48 dark:text-[oklch(0.55_0.04_255/0.35)] sm:size-64" />
</div>
