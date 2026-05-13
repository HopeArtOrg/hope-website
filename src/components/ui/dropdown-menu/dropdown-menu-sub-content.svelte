<script lang="ts">
  import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";

  import { cn } from "@/lib/utils";

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: DropdownMenuPrimitive.SubContentProps = $props();
</script>

<DropdownMenuPrimitive.SubContent
  bind:ref
  data-slot="dropdown-menu-sub-content"
  class={cn("bg-popover text-popover-foreground z-50 min-w-[8rem] origin-[var(--bits-dropdown-menu-content-transform-origin)] overflow-hidden rounded-sm border p-1 shadow-lg", className)}
  {...restProps}
>
  {@render children?.()}
</DropdownMenuPrimitive.SubContent>
