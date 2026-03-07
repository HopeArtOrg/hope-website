<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";

  import type { WithElementRef } from "@/lib/utils";

  import { cn } from "@/lib/utils";

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
  bind:this={ref}
  data-slot="card-header"
  class={cn(
    "grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6",
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</div>
