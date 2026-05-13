<script lang="ts">
  import Icon from "@iconify/svelte";
  import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";

  import { cn } from "@/lib/utils";

  let {
    ref = $bindable(null),
    class: className,
    child: childSnippet,
    children,
    ...restProps
  }: DropdownMenuPrimitive.RadioItemProps = $props();
</script>

<DropdownMenuPrimitive.RadioItem
  bind:ref
  data-slot="dropdown-menu-radio-item"
  {...restProps}
>
  {#snippet child({ props, checked })}
    {#if childSnippet}
      {@render childSnippet({ props, checked })}
    {:else}
      <div
        {...props}
        class={cn(
          "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 ps-8 pe-2 text-sm outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
          className,
        )}
      >
        <span
          class="flex size-3.5 pointer-events-none items-center start-2 justify-center absolute"
        >
          {#if checked}
            <Icon icon="lucide:circle" class="size-2 fill-current" />
          {/if}
        </span>
        {@render children?.({ checked })}
      </div>
    {/if}
  {/snippet}
</DropdownMenuPrimitive.RadioItem>
