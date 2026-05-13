<script lang="ts">
  import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";

  import { cn } from "@/lib/utils";

  let {
    ref = $bindable(null),
    class: className,
    inset,
    children,
    ...restProps
  }: DropdownMenuPrimitive.GroupHeadingProps & {
    inset?: boolean;
  } = $props();
</script>

<DropdownMenuPrimitive.GroupHeading
  bind:ref
  data-slot="dropdown-menu-group-heading"
  data-inset={inset}
  class={cn("px-2 py-1.5 text-sm font-semibold data-[inset]:ps-8", className)}
  {...restProps}
>
  {@render children?.()}
</DropdownMenuPrimitive.GroupHeading>
