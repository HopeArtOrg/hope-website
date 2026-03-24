<script lang="ts">
  import gsap from "gsap";

  import { setupAuroraBg } from "./aurora-bg";

  let auroraRef = $state<HTMLCanvasElement | null>(null);
  let auroraCleanup: (() => void) | undefined;

  $effect(() => {
    if (!auroraRef)
      return;
    auroraCleanup = setupAuroraBg(auroraRef);
    gsap.to(auroraRef, { opacity: 1, duration: 1.2, ease: "power2.inOut", delay: 0.5 });

    return () => {
      auroraCleanup?.();
    };
  });
</script>

<canvas
  bind:this={auroraRef}
  class="h-full w-full pointer-events-none inset-0 absolute"
  style="opacity: 0;"
  aria-hidden="true"
></canvas>
