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
  class=":uno: text-base text-muted-foreground font-medium px-3 py-2.5 outline-none rounded-sm flex transition-all duration-300 items-center justify-center relative group focus-visible:text-primary hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background hover:drop-shadow-[0_0_8px_oklch(0.55_0.04_255/0.5)] dark:hover:drop-shadow-[0_0_10px_oklch(var(--color-primary)/0.6)]"
>
  <Icon
    {icon}
    class=":uno: size-5 transition-all duration-500 ease-in-out group-focus-visible:opacity-0 group-hover:opacity-0 group-focus-visible:scale-0 group-hover:scale-0 group-focus-visible:absolute group-hover:absolute"
    aria-hidden="true"
  />
  <span
    class=":uno: opacity-0 whitespace-nowrap scale-0 transition-all duration-500 ease-in-out absolute group-focus-visible:opacity-100 group-hover:opacity-100 group-focus-visible:scale-100 group-hover:scale-100 group-focus-visible:relative group-hover:relative"
    aria-hidden="true"
  >
    {label}
  </span>
</a>
