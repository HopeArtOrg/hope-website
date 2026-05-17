<script lang="ts">
  import { onMount } from "svelte";

  import { setupAuroraBg } from "./aurora-bg";

  let canvasRef = $state<HTMLCanvasElement | null>(null);

  onMount(() => {
    if (!canvasRef)
      return;
    const cleanup = setupAuroraBg(canvasRef);
    canvasRef.style.opacity = "1";
    canvasRef.style.transition = "opacity 1.2s ease-in-out";
    return cleanup;
  });
</script>

<canvas
  bind:this={canvasRef}
  class=":uno: h-full w-full pointer-events-none inset-0 absolute"
  style="opacity: 0;"
  aria-hidden="true"
></canvas>
