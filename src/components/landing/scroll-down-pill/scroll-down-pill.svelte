<script lang="ts" module>
  export type ScrollDownPillProps = {
    onclick?: () => void;
  };
</script>

<script lang="ts">
  import gsap from "gsap";

  const { onclick }: ScrollDownPillProps = $props();

  let pillRef = $state<HTMLButtonElement | null>(null);
  let dotRef = $state<HTMLSpanElement | null>(null);

  $effect(() => {
    if (!dotRef)
      return;

    const tween = gsap.to(dotRef, {
      y: 10,
      duration: 1.2,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    return () => {
      tween.kill();
    };
  });

  $effect(() => {
    if (!pillRef)
      return;

    const tween = gsap.fromTo(pillRef, {
      autoAlpha: 0,
      y: 10,
    }, {
      autoAlpha: 1,
      y: 0,
      duration: 0.8,
      delay: 0.5,
      ease: "power2.out",
    });

    return () => {
      tween.kill();
    };
  });
</script>

<button
  bind:this={pillRef}
  class="invisible group flex cursor-pointer flex-col items-center gap-2 border-none bg-transparent p-0"
  aria-label="Scroll down"
  {onclick}
>
  <div class="relative flex h-10 w-6 items-start justify-center rounded-full border border-muted-foreground/40 pt-2 transition-colors duration-300 group-hover:border-foreground/60">
    <span
      bind:this={dotRef}
      class="block h-2 w-1.5 rounded-full bg-muted-foreground/60 transition-colors duration-300 group-hover:bg-foreground/80"
    ></span>
  </div>
</button>
