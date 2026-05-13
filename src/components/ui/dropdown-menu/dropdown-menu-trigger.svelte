<script lang="ts">
  import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";

  let {
    ref = $bindable(null),
    child: childProp,
    children,
    ...restProps
  }: DropdownMenuPrimitive.TriggerProps = $props();
</script>

<DropdownMenuPrimitive.Trigger
  bind:ref
  data-slot="dropdown-menu-trigger"
  {...restProps}
>
  {#snippet child({ props })}
    {#if childProp}
      {@render childProp({ props })}
    {:else}
      <button
        {...props}
        type="button"
      >
        {@render children?.()}
      </button>
    {/if}
  {/snippet}
</DropdownMenuPrimitive.Trigger>
