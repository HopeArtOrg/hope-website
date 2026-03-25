<script lang="ts">
  import type { Snippet } from "svelte";

  import Icon from "@iconify/svelte";
  import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";

  import type { WithoutChildrenOrChild } from "@/lib/utils";

  import { cn } from "@/lib/utils";

  let {
    ref = $bindable(null),
    checked = $bindable(false),
    indeterminate = $bindable(false),
    class: className,
    children: childrenProp,
    ...restProps
  }: WithoutChildrenOrChild<DropdownMenuPrimitive.CheckboxItemProps> & {
    children?: Snippet;
  } = $props();
</script>

<DropdownMenuPrimitive.CheckboxItem
  bind:ref
  bind:checked
  bind:indeterminate
  data-slot="dropdown-menu-checkbox-item"
  class={cn(
    "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 ps-8 pe-2 text-sm outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    className,
  )}
  {...restProps}
>
  {#snippet children({ checked, indeterminate })}
    <span
      class=":uno: flex size-3.5 pointer-events-none items-center start-2 justify-center absolute"
    >
      {#if indeterminate}
        <Icon icon="lucide:minus" class=":uno: size-4" />
      {:else}
        <Icon icon="lucide:check" class={cn("size-4", !checked && "text-transparent")} />
      {/if}
    </span>
    {@render childrenProp?.()}
  {/snippet}
</DropdownMenuPrimitive.CheckboxItem>
