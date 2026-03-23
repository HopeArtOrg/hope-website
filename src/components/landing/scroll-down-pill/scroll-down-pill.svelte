<script lang="ts" module>
  export type ScrollDownPillProps = {
    onclick?: () => void;
  };
</script>

<script lang="ts">
  import gsap from "gsap";

  import { prefersReducedMotion } from "@/lib/utils";

  const { onclick }: ScrollDownPillProps = $props();

  let pillRef = $state<HTMLButtonElement | null>(null);
  let dotRef = $state<HTMLSpanElement | null>(null);

  $effect(() => {
    if (!dotRef || !pillRef || prefersReducedMotion())
      return;

    let tween: gsap.core.Tween | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        const isVisible = entries[0]?.isIntersecting ?? false;
        if (isVisible && !tween) {
          tween = gsap.to(dotRef!, {
            y: 10,
            duration: 1.2,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        }
        else if (!isVisible && tween) {
          tween.kill();
          tween = null;
          gsap.set(dotRef!, { y: 0 });
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(pillRef);

    return () => {
      observer.disconnect();
      tween?.kill();
    };
  });

  $effect(() => {
    if (!pillRef)
      return;

    if (prefersReducedMotion()) {
      gsap.set(pillRef, { autoAlpha: 1 });
      return;
    }

    const tween = gsap.fromTo(pillRef, {
      autoAlpha: 0,
      y: 10,
    }, {
      autoAlpha: 1,
      y: 0,
      duration: 0.6,
      delay: 0.3,
      ease: "power2.out",
    });

    return () => {
      tween.kill();
    };
  });
</script>

<button
  bind:this={pillRef}
  class="p-0 outline-none rounded-full border-none bg-transparent flex flex-col gap-2 invisible cursor-pointer items-center group focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
  aria-label="Scroll down"
  {onclick}
>
  <div class="pt-2 border border-muted-foreground/40 rounded-full flex h-10 w-6 transition-colors duration-300 items-start justify-center relative group-hover:border-foreground/60">
    <span
      bind:this={dotRef}
      class="rounded-full bg-muted-foreground/60 h-2 w-1.5 block transition-colors duration-300 group-hover:bg-foreground/80"
    ></span>
  </div>
</button>
