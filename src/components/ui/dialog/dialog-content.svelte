<script lang="ts">
  import type { ComponentProps, Snippet } from "svelte";

  import Icon from "@iconify/svelte";
  import { Dialog as DialogPrimitive } from "bits-ui";

  import type { WithoutChildrenOrChild } from "@/lib/utils";

  import { cn } from "@/lib/utils";

  import DialogPortal from "./dialog-portal.svelte";
  import * as Dialog from "./index.js";

  let {
    ref = $bindable(null),
    class: className,
    portalProps,
    children,
    showCloseButton = true,
    ...restProps
  }: WithoutChildrenOrChild<DialogPrimitive.ContentProps> & {
    portalProps?: WithoutChildrenOrChild<ComponentProps<typeof DialogPortal>>;
    children: Snippet;
    showCloseButton?: boolean;
  } = $props();
</script>

<DialogPortal {...portalProps}>
  <Dialog.Overlay />
  <DialogPrimitive.Content
    bind:ref
    data-slot="dialog-content"
    class={cn(":uno: bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-sm border p-6 shadow-lg duration-200 sm:max-w-lg", className)}
    {...restProps}
  >
    {@render children?.()}
    {#if showCloseButton}
      <DialogPrimitive.Close
        class=":uno: rounded-sm opacity-70 ring-offset-background transition-opacity end-4 top-4 absolute focus:outline-none hover:opacity-100 [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none disabled:pointer-events-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        <Icon icon="lucide:x" />
        <span class=":uno: sr-only">Close</span>
      </DialogPrimitive.Close>
    {/if}
  </DialogPrimitive.Content>
</DialogPortal>
