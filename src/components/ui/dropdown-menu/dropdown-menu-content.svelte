<script lang="ts">
  import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";

  import { cn } from "@/lib/utils";

  let {
    ref = $bindable(null),
    class: className,
    sideOffset = 4,
    child: childSnippet,
    children,
    ...restProps
  }: DropdownMenuPrimitive.ContentProps = $props();
</script>

<DropdownMenuPrimitive.Portal>
  <DropdownMenuPrimitive.Content
    bind:ref
    data-slot="dropdown-menu-content"
    {sideOffset}
    {...restProps}
  >
    {#snippet child({ wrapperProps, props })}
      {#if childSnippet}
        {@render childSnippet({ wrapperProps, props })}
      {:else}
        <div {...wrapperProps}>
          <div
            {...props}
            class={cn(
              "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-end-2 data-[side=right]:slide-in-from-start-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-[var(--bits-dropdown-menu-content-available-height)] min-w-[8rem] origin-[var(--bits-dropdown-menu-content-transform-origin)] overflow-x-hidden overflow-y-auto rounded-sm border p-1 shadow-md outline-none",
              className,
            )}
          >
            {@render children?.()}
          </div>
        </div>
      {/if}
    {/snippet}
  </DropdownMenuPrimitive.Content>
</DropdownMenuPrimitive.Portal>
