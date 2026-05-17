<script lang="ts">
  import { onMount } from "svelte";

  import { initNotFoundAnimations } from "./animations";

  const { homeHref } = $props<{
    homeHref: string;
  }>();

  let container: HTMLElement;
  let title: HTMLElement;
  let content: HTMLElement;

  onMount(() => {
    const cleanup = initNotFoundAnimations(container, title, content);
    return cleanup;
  });
</script>

<div
  bind:this={container}
  class=":uno: px-6 text-center flex flex-col min-h-[70vh] items-center justify-center relative overflow-hidden"
>
  <div class=":uno: bg-[radial-gradient(circle_at_center,var(--un-preset-shadcn-accent)_0%,transparent_70%)] opacity-20 pointer-events-none inset-0 absolute"></div>

  <h1
    bind:this={title}
    class=":uno: text-[12rem] text-muted-foreground/20 leading-none font-outline select-none md:text-[20rem]"
  >
    404
  </h1>

  <div
    bind:this={content}
    class=":uno: flex flex-col gap-6 items-center z-10 -mt-12 md:-mt-20"
  >
    <div class=":uno: space-y-2">
      <h2 class=":uno: text-2xl tracking-tight font-medium md:text-3xl">
        Mist and shadows.
      </h2>
      <p class=":uno: text-muted-foreground mx-auto max-w-md">
        The path you seek has dissolved into the void.
        Return to the source.
      </p>
    </div>

    <a
      href={homeHref}
      class=":uno: text-primary-foreground font-medium px-8 py-3 rounded-full bg-primary inline-flex shadow-lg shadow-primary/20 transition-all duration-300 items-center justify-center active:scale-95 hover:scale-105"
    >
      Back to Home
    </a>
  </div>
</div>
