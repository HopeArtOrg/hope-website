<script lang="ts">
  import CornerBrackets from "@/components/ui/corner-brackets/corner-brackets.svelte";
  import { cn } from "@/lib/utils";

  type Props = {
    id: string;
    title?: string;
    class?: string;
  };

  const { id, title = "YouTube video player", class: className }: Props = $props();
</script>

<div class={cn(":uno: group relative my-8 w-full overflow-hidden rounded-sm bg-muted/20 p-2 transition-colors duration-500 hover:bg-muted/30 sm:p-4", className)}>
  <CornerBrackets
    inset="inset-0"
    size="h-8 w-8"
    borderColor="border-primary/10 transition-colors duration-500 group-hover:border-primary/30"
  />

  <div class=":uno: border border-border/50 rounded-xs bg-black/5 w-full aspect-video shadow-2xl shadow-primary/5 relative overflow-hidden">
    <iframe
      src="https://www.youtube.com/embed/{id}"
      {title}
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen
      class=":uno: h-full w-full inset-0 absolute"
    ></iframe>
  </div>
</div>
