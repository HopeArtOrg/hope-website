<script lang="ts" module>
  export type NavbarProps = {
    homePath: string;
    links: Array<{ label: string; href: string; icon: string }>;
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

  import { setupNavbarVisibility } from "./animations";
  import NavLink from "./navlink.svelte";

  const { homePath, links }: NavbarProps = $props();
  let sheetOpen = $state(false);
  let navRef = $state<HTMLElement | null>(null);

  $effect(() => {
    if (!navRef)
      return;
    return setupNavbarVisibility(navRef);
  });
</script>

<nav
  bind:this={navRef}
  class=":uno: px-3 pt-3 flex invisible pointer-events-none inset-x-0 top-0 justify-center fixed z-50 sm:px-6 sm:pt-5"
  style="will-change: transform;"
>
  <div class=":uno: px-4 border border-border/50 rounded-xl bg-background/60 flex h-14 w-full max-w-screen-xl pointer-events-auto ring-1 ring-white/10 ring-inset shadow-lg items-center justify-between backdrop-blur-xl backdrop-saturate-150 sm:px-12 sm:h-20">
    <a
      href={homePath}
      class="flex gap-2 items-center group sm:gap-3"
    >
      <img
        src="/logo.svg"
        alt="Hope:Re"
        class="h-8 w-8 sm:h-12 sm:w-12"
      />
      <span class="text-base text-foreground tracking-tight font-mono font-semibold transition-all duration-300 sm:text-xl group-hover:text-primary group-hover:drop-shadow-[0_0_10px_oklch(0.55_0.04_255/0.6)] dark:group-hover:drop-shadow-[0_0_12px_oklch(var(--color-primary)/0.7)]">
        {SITE_NAME}
      </span>
    </a>

    <div class=":uno: flex gap-1 items-center sm:gap-2">
      <div class=":uno: hidden items-center md:flex">
        {#each links as link, i (link.href)}
          {#if i > 0}
            <span class=":uno: text-base text-border select-none">/</span>
          {/if}
          <NavLink
            label={link.label}
            href={link.href}
            icon={link.icon}
          />
        {/each}
      </div>

      <span class=":uno: text-base text-border hidden select-none md:inline">/</span>
      <ThemeToggle />

      <div class=":uno: md:hidden">
        <Sheet bind:open={sheetOpen}>
          <SheetTrigger>
            {#snippet child({ props })}
              <Button
                {...props}
                variant="ghost"
                size="icon"
                class=":uno: size-9 sm:size-10"
              >
                <Icon
                  icon="lucide:menu"
                  class=":uno: size-5 sm:size-6"
                />
                <span class=":uno: sr-only">Open menu</span>
              </Button>
            {/snippet}
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle class=":uno: sr-only">Navigation</SheetTitle>
            </SheetHeader>
            <nav class=":uno: px-2 flex flex-col gap-1">
              {#each links as link (link.href)}
                <SheetClose>
                  {#snippet child({ props })}
                    <a
                      {...props}
                      href={link.href}
                      class=":uno: text-sm text-muted-foreground font-medium px-3 py-2.5 rounded-sm transition-colors hover:text-foreground hover:bg-accent"
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
