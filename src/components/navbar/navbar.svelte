<script lang="ts" module>
  export type { NavLinkProps as NavLink } from "./navlink.svelte";

  export type NavbarProps = {
    homePath: string;
    links: Array<{ label: string; href: string }>;
  };
</script>

<script lang="ts">
  import Icon from "@iconify/svelte";

  import { ThemeToggle } from "@/components/theme-toggle";
  import { Button } from "@/components/ui/button";
  import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet";
  import { SITE_NAME } from "@/lib/constants";

  import NavLink from "./navlink.svelte";

  const { homePath, links }: NavbarProps = $props();
  let sheetOpen = $state(false);
</script>

<nav class="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 pointer-events-none sm:px-6 sm:pt-5">
  <div class="pointer-events-auto flex h-14 w-full max-w-screen-xl items-center justify-between rounded-full border border-border/50 bg-background/60 px-4 shadow-lg ring-1 ring-inset ring-white/10 backdrop-blur-xl backdrop-saturate-150 sm:h-20 sm:px-12">
    <a
      href={homePath}
      class="group flex items-center gap-2 sm:gap-3"
    >
      <img
        src="/logo.svg"
        alt="Hope:Re"
        class="h-8 w-8 sm:h-12 sm:w-12"
      />
      <span class="font-mono text-base font-semibold tracking-tight text-foreground transition-all duration-300 group-hover:text-primary group-hover:drop-shadow-[0_0_10px_oklch(0.55_0.04_255/0.6)] dark:group-hover:drop-shadow-[0_0_12px_oklch(var(--color-primary)/0.7)] sm:text-xl">
        {SITE_NAME}
      </span>
    </a>

    <div class="flex items-center gap-1 sm:gap-2">
      <div class="hidden items-center md:flex">
        {#each links as link, i}
          {#if i > 0}
            <span class="select-none text-base text-border">/</span>
          {/if}
          <NavLink
            label={link.label}
            href={link.href}
          />
        {/each}
      </div>

      <span class="hidden select-none text-base text-border md:inline">/</span>
      <ThemeToggle />

      <div class="md:hidden">
        <Sheet bind:open={sheetOpen}>
          <SheetTrigger>
            {#snippet child({ props })}
              <Button
                {...props}
                variant="ghost"
                size="icon"
                class="size-9 sm:size-10"
              >
                <Icon
                  icon="lucide:menu"
                  class="size-5 sm:size-6"
                />
                <span class="sr-only">Open menu</span>
              </Button>
            {/snippet}
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle class="sr-only">Navigation</SheetTitle>
            </SheetHeader>
            <nav class="flex flex-col gap-1 px-2">
              {#each links as link}
                <SheetClose>
                  {#snippet child({ props })}
                    <a
                      {...props}
                      href={link.href}
                      class="rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  {/snippet}
                </SheetClose>
              {/each}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  </div>
</nav>
