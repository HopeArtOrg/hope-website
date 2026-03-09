<script lang="ts" module>
  export type NavLinkProps = {
    label: string;
    href: string;
    icon: string;
  };
</script>

<script lang="ts">
  import Icon from "@iconify/svelte";

  const { label, href, icon }: NavLinkProps = $props();
</script>

<a
  {href}
  aria-label={label}
  class="group relative flex items-center justify-center rounded-sm px-3 py-2.5 text-base font-medium text-muted-foreground outline-none transition-all duration-300 hover:text-primary focus-visible:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background hover:drop-shadow-[0_0_8px_oklch(0.55_0.04_255/0.5)] dark:hover:drop-shadow-[0_0_10px_oklch(var(--color-primary)/0.6)]"
>
  <Icon
    {icon}
    class="size-5 transition-all duration-500 ease-in-out group-hover:scale-0 group-hover:opacity-0 group-focus-visible:scale-0 group-focus-visible:opacity-0"
    aria-hidden="true"
  />
  <span class="absolute whitespace-nowrap opacity-0 scale-0 transition-all duration-500 ease-in-out group-hover:relative group-hover:scale-100 group-hover:opacity-100 group-focus-visible:relative group-focus-visible:scale-100 group-focus-visible:opacity-100" aria-hidden="true">
    {label}
  </span>
</a>
