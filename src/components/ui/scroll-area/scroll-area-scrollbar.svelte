<script lang="ts">
  import { ScrollArea as ScrollAreaPrimitive } from "bits-ui";

  import type { WithoutChild } from "@/lib/utils";

  import { cn } from "@/lib/utils";

  let {
    ref = $bindable(null),
    class: className,
    orientation = "vertical",
    children,
    ...restProps
  }: WithoutChild<ScrollAreaPrimitive.ScrollbarProps> = $props();
</script>

<ScrollAreaPrimitive.Scrollbar
  bind:ref
  data-slot="scroll-area-scrollbar"
  {orientation}
  class={cn(":uno: flex touch-none p-px transition-colors select-none", orientation === "vertical" && "h-full w-2.5 border-s border-s-transparent", orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent", className)}
  {...restProps}
>
  {@render children?.()}
  <ScrollAreaPrimitive.Thumb
    data-slot="scroll-area-thumb"
    class=":uno: rounded-full bg-border flex-1 relative"
  />
</ScrollAreaPrimitive.Scrollbar>
