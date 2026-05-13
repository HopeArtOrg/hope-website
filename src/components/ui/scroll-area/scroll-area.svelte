<script lang="ts">
  import { ScrollArea as ScrollAreaPrimitive } from "bits-ui";

  import type { WithoutChild } from "@/lib/utils";

  import { cn } from "@/lib/utils";

  import { Scrollbar } from "./index.js";

  let {
    ref = $bindable(null),
    viewportRef = $bindable(null),
    class: className,
    orientation = "vertical",
    scrollbarXClasses = "",
    scrollbarYClasses = "",
    children,
    ...restProps
  }: WithoutChild<ScrollAreaPrimitive.RootProps> & {
    orientation?: "vertical" | "horizontal" | "both" | undefined;
    scrollbarXClasses?: string | undefined;
    scrollbarYClasses?: string | undefined;
    viewportRef?: HTMLElement | null;
  } = $props();
</script>

<ScrollAreaPrimitive.Root
  bind:ref
  data-slot="scroll-area"
  class={cn("relative", className)}
  {...restProps}
>
  <ScrollAreaPrimitive.Viewport
    bind:ref={viewportRef}
    data-slot="scroll-area-viewport"
    class="outline-ring/50 rounded-[inherit] size-full ring-ring/10 transition-[color,box-shadow] focus-visible:outline-1 dark:outline-ring/40 focus-visible:ring-4 dark:ring-ring/20"
  >
    {@render children?.()}
  </ScrollAreaPrimitive.Viewport>
  {#if orientation === "vertical" || orientation === "both"}
    <Scrollbar orientation="vertical" class={scrollbarYClasses} />
  {/if}
  {#if orientation === "horizontal" || orientation === "both"}
    <Scrollbar orientation="horizontal" class={scrollbarXClasses} />
  {/if}
  <ScrollAreaPrimitive.Corner />
</ScrollAreaPrimitive.Root>
