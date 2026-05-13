<script lang="ts">
  import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";

  const { children, ...restProps }: DropdownMenuPrimitive.PortalProps = $props();
</script>

<DropdownMenuPrimitive.Portal {...restProps}>
  {@render children?.()}
</DropdownMenuPrimitive.Portal>
