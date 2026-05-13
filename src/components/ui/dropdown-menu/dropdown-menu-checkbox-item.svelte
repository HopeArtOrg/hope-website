<script lang="ts">
  import Icon from "@iconify/svelte";
  import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";

  import { cn } from "@/lib/utils";

  let {
    ref = $bindable(null),
    checked = $bindable(false),
    indeterminate = $bindable(false),
    class: className,
    child: childSnippet,
    children,
    ...restProps
  }: DropdownMenuPrimitive.CheckboxItemProps = $props();
</script>

<DropdownMenuPrimitive.CheckboxItem
  bind:ref
  bind:checked
  bind:indeterminate
  data-slot="dropdown-menu-checkbox-item"
  {...restProps}
>
  {#snippet child({ props })}
    {#if childSnippet}
      {@render childSnippet({ props })}
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
          {#if indeterminate}
            <Icon icon="lucide:minus" class="size-4" />
          {:else}
            <Icon icon="lucide:check" class={cn("size-4", !checked && "text-transparent")} />
          {/if}
        </span>
        {@render children?.()}
      </div>
    {/if}
  {/snippet}
</DropdownMenuPrimitive.CheckboxItem>
