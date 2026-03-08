<script lang="ts" module>
  import type { SVGAttributes } from "svelte/elements";

  export type StarIconProps = SVGAttributes<SVGSVGElement>;
</script>

<script lang="ts">
  import { STAR_SVG_PATH, STAR_SVG_STROKE_WIDTH } from "@/lib/constants";

  const { class: className, ...restProps }: StarIconProps = $props();
</script>

<svg
  viewBox="0 0 3000 3000"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  class={className}
  {...restProps}
>
  <clipPath id="star-clip">
    <rect
      x="525.739"
      y="525.739"
      width="1948.521"
      height="1948.521"
    />
  </clipPath>
  <g clip-path="url(#star-clip)">
    <path
      d={STAR_SVG_PATH}
      fill="none"
      stroke="currentColor"
      stroke-width={STAR_SVG_STROKE_WIDTH}
    />
  </g>
</svg>
