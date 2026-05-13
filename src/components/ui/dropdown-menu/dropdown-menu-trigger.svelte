<script lang="ts">
  import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";

  let { ref = $bindable(null), child, ...restProps }: DropdownMenuPrimitive.TriggerProps = $props();
</script>

<DropdownMenuPrimitive.Trigger bind:ref
                               data-slot="dropdown-menu-trigger"
                               {child}
                               {...restProps} />
