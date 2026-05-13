<script lang="ts" module>
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  import type { WithElementRef } from "@/lib/utils";

  export type DefinitionPanelPosition = "left" | "right";

  export type DefinitionPanelProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
    position?: DefinitionPanelPosition;
    vertical?: boolean;
    gap?: string;
    children?: Snippet;
  };
</script>

<script lang="ts">
  import { cn } from "@/lib/utils";

  let {
    position = "left",
    vertical = false,
    gap = "gap-3",
    class: className,
    ref = $bindable(null),
    children,
    ...restProps
  }: DefinitionPanelProps = $props();

  const positionClasses = $derived(
    position === "left"
      ? "left-12 xl:left-16"
      : "right-12 xl:right-16",
  );
</script>

<div
  bind:this={ref}
  class={cn(
    "invisible pointer-events-none absolute bottom-16 hidden select-none flex-col text-xs tracking-wide text-muted-foreground/40 lg:flex",
    gap,
    positionClasses,
    className,
  )}
  style={vertical ? "writing-mode: vertical-rl;" : undefined}
  aria-hidden="true"
  {...restProps}
>
  {@render children?.()}
</div>
