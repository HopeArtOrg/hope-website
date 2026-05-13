<script lang="ts">
  import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";

  import { cn } from "@/lib/utils";

  let {
    ref = $bindable(null),
    sideOffset = 4,
    class: className,
    children,
    ...restProps
  }: DropdownMenuPrimitive.ContentProps = $props();
</script>

<DropdownMenuPrimitive.Content
  bind:ref
  data-slot="dropdown-menu-content"
  {sideOffset}
  class={cn("bg-popover text-popover-foreground z-50 max-h-[var(--bits-dropdown-menu-content-available-height)] min-w-[8rem] origin-[var(--bits-dropdown-menu-content-transform-origin)] overflow-x-hidden overflow-y-auto rounded-sm border p-1 shadow-md outline-none", className)}
  {...restProps}
>
  {@render children?.()}
</DropdownMenuPrimitive.Content>
