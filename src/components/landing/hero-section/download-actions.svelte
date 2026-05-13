<script lang="ts" module>
  export type DownloadActionsProps = {
    downloadLabel: string;
    downloadForLabel: string;
    githubLabel: string;
  };
</script>

<script lang="ts">
  import Icon from "@iconify/svelte";

  import { Button } from "@/components/ui/button";
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import { detectPlatform, GITHUB_REPO, GITHUB_REPO_URL, platforms } from "@/lib/constants";
  import { cn } from "@/lib/utils";

  const {
    downloadLabel,
    downloadForLabel,
    githubLabel,
  }: DownloadActionsProps = $props();

  let starCount = $state<number | null>(null);
  let downloadOpen = $state(false);
  let mounted = $state(false);

  let detectedPlatform = $state<ReturnType<typeof detectPlatform>>(null);
  const altPlatforms = $derived(
    detectedPlatform
      ? platforms.filter(p => p !== detectedPlatform)
      : platforms,
  );

  $effect(() => {
    mounted = true;
    detectedPlatform = detectPlatform();
  });

  $effect(() => {
    const controller = new AbortController();
    fetch(`https://api.github.com/repos/${GITHUB_REPO}`, { signal: controller.signal })
      .then(res => res.json())
      .then((data) => {
        if (typeof data.stargazers_count === "number")
          starCount = data.stargazers_count;
      })
      .catch(() => {});
    return () => controller.abort();
  });

  function formatStars(count: number): string {
    if (count >= 1000)
      return `${(count / 1000).toFixed(1)}k`;
    return count.toString();
  }
</script>

<div class="flex flex-wrap gap-3 items-center justify-center lg:justify-start">
  <div class="inline-flex items-center">
    <Button
      size="lg"
      href={detectedPlatform?.href}
      target="_blank"
      rel="noopener noreferrer"
      class="rounded-r-none gap-2"
      aria-label={detectedPlatform ? `${downloadForLabel} ${detectedPlatform.name}` : downloadLabel}
      onclick={detectedPlatform ? undefined : () => { downloadOpen = !downloadOpen; }}
    >
      <Icon
        icon={detectedPlatform?.icon ?? "lucide:download"}
        class="size-4"
      />
      {#if detectedPlatform}
        {downloadForLabel} {detectedPlatform.name}
        <span class="text-primary-foreground/70 font-mono">{detectedPlatform.arch}</span>
      {:else}
        {downloadLabel}
      {/if}
    </Button>

    {#if mounted}
      <DropdownMenu bind:open={downloadOpen}>
        <DropdownMenuTrigger>
          {#snippet child({ props })}
            <Button
              {...props}
              size="lg"
              class="px-2.5 border-l border-primary-foreground/20 rounded-l-none"
              aria-label="More download options"
            >
              <Icon
                icon="lucide:chevron-down"
                class={cn("size-3.5 transition-transform duration-200", downloadOpen && "rotate-180")}
              />
            </Button>
          {/snippet}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {#each altPlatforms as platform, i (platform.name)}
            {#if i > 0}
              <DropdownMenuSeparator />
            {/if}
            <DropdownMenuItem
              onSelect={() => window.open(platform.href, "_blank", "noopener,noreferrer")}
              class="flex gap-2 cursor-pointer items-center"
            >
              <Icon
                icon={platform.icon}
                class="size-4"
                aria-hidden="true"
              />
              {platform.name}
              <span class="text-muted-foreground font-mono">{platform.arch}</span>
            </DropdownMenuItem>
          {/each}
        </DropdownMenuContent>
      </DropdownMenu>
    {:else}
      <Button
        size="lg"
        class="px-2.5 border-l border-primary-foreground/20 rounded-l-none"
        aria-label="More download options"
        disabled
      >
        <Icon
          icon="lucide:chevron-down"
          class="size-3.5"
        />
      </Button>
    {/if}
  </div>

  <Button
    variant="outline"
    size="lg"
    href={GITHUB_REPO_URL}
    target="_blank"
    rel="noopener noreferrer"
    class="gap-2"
    aria-label={githubLabel}
  >
    <Icon
      icon="lucide:github"
      class="size-4"
    />
    {githubLabel}
    {#if starCount !== null}
      <span class="text-muted-foreground pl-2 border-l border-border flex gap-1 items-center">
        <Icon
          icon="lucide:star"
          class="size-3.5"
        />
        {formatStars(starCount)}
      </span>
    {/if}
  </Button>
</div>
