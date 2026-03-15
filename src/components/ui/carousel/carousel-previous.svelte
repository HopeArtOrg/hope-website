<script lang="ts">
  import type { WithoutChildren } from "bits-ui";

  import Icon from "@iconify/svelte";

  import type { Props } from "@/components/ui/button";

  import { Button } from "@/components/ui/button";
  import { cn } from "@/lib/utils";

  import { getEmblaContext } from "./context";

  let {
    ref = $bindable(null),
    class: className,
    variant = "outline",
    size = "icon",
    ...restProps
  }: WithoutChildren<Props> = $props();

  const emblaCtx = getEmblaContext("<Carousel.Previous/>");
</script>

<Button
  data-slot="carousel-previous"
  {variant}
  {size}
  aria-disabled={!emblaCtx.canScrollPrev}
  class={cn(
    "absolute size-8 rounded-full",
    emblaCtx.orientation === "horizontal"
      ? "-start-12 top-1/2 -translate-y-1/2"
      : "start-1/2 -top-12 -translate-x-1/2 rotate-90",
    className,
  )}
  onclick={emblaCtx.scrollPrev}
  onkeydown={emblaCtx.handleKeyDown}
  {...restProps}
  bind:ref
>
  <Icon icon="lucide:arrow-left" class="size-4" />
  <span class="sr-only">Previous slide</span>
</Button>
