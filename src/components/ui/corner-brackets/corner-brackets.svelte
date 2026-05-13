<script lang="ts" module>
  export type Corner = "tl" | "tr" | "bl" | "br";

  export type CornerBracketsProps = {
    corners?: Corner[];
    inset?: string;
    size?: string;
    borderColor?: string;
    class?: string;
  };

  const cornerClasses: Record<Corner, string> = {
    tl: "top-0 left-0 border-t border-l",
    tr: "top-0 right-0 border-t border-r",
    bl: "bottom-0 left-0 border-b border-l",
    br: "right-0 bottom-0 border-b border-r",
  };
</script>

<script lang="ts">
  import { cn } from "@/lib/utils";

  const {
    corners = ["tl", "tr", "bl", "br"],
    inset = "inset-4 sm:inset-6 lg:inset-10",
    size = "h-10 w-10 sm:h-14 sm:w-14 lg:h-20 lg:w-20",
    borderColor = "border-muted-foreground/40",
    class: className,
  }: CornerBracketsProps = $props();
</script>

<div
  class={cn(":uno: pointer-events-none absolute", inset, className)}
  aria-hidden="true"
>
  {#each corners as corner (corner)}
    <span
      class={cn(":uno: absolute", cornerClasses[corner], size, borderColor)}
    ></span>
  {/each}
</div>
