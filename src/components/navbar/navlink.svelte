<script lang="ts" module>
  export type NavLinkProps = {
    label: string;
    href: string;
  };
</script>

<script lang="ts">
  const { label, href }: NavLinkProps = $props();
</script>

<a
  {href}
  class="rounded-md px-5 py-2.5 text-base font-medium text-muted-foreground transition-all duration-300 hover:text-primary hover:drop-shadow-[0_0_8px_oklch(0.55_0.04_255/0.5)] dark:hover:drop-shadow-[0_0_10px_oklch(var(--color-primary)/0.6)]"
>
  {label}
</a>
