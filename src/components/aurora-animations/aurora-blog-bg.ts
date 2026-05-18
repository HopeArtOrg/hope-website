import gsap from "gsap";

import type { AuroraConfig } from "./utils";

import {
  buildThresholds,
  computeAuroraGrid,
  resolveBaseColor,
  traceAndStrokeAurora,
} from "./utils";

const GRID_STEP = 16;
const THRESHOLD_COUNT = 4;
const THRESHOLD_MIN = -0.6;
const THRESHOLD_MAX = 0.6;
const NOISE_SCALE = 0.0015;
const Z_SPEED = 0.00012;
const LINE_WIDTH_MIN = 0.8;
const LINE_WIDTH_MAX = 1.8;
const LINE_OPACITY_MIN = 0.25;
const LINE_OPACITY_MAX = 0.5;
const MOUSE_RADIUS = 250;
const MOUSE_STRENGTH = 0.45;
const MOUSE_LERP = 0.1;
const MOUSE_FADE_DURATION = 0.8;
const RESIZE_DEBOUNCE = 150;
const MOUSE_R_SQ = MOUSE_RADIUS * MOUSE_RADIUS;

export function setupAuroraBlogBg(canvas: HTMLCanvasElement): () => void {
  const ctx = canvas.getContext("2d", { alpha: true, desynchronized: true })!;
  const isMobile = "ontouchstart" in window;

  const thresholds = buildThresholds(
    THRESHOLD_COUNT,
    THRESHOLD_MIN,
    THRESHOLD_MAX,
    LINE_OPACITY_MIN,
    LINE_OPACITY_MAX,
    LINE_WIDTH_MIN,
    LINE_WIDTH_MAX,
  );

  const config: AuroraConfig = {
    gridStep: GRID_STEP,
    noiseScale: NOISE_SCALE,
    thresholds,
    mouse: {
      radiusSq: MOUSE_R_SQ,
      strength: MOUSE_STRENGTH,
    },
  };

  let cols = 0;
  let rows = 0;
  let w = 0;
  let h = 0;
  let zOffset = 0;
  let grid = new Float64Array(0);
  let baseColor = resolveBaseColor();
  let frameCount = 0;

  const mouse = { x: -9999, y: -9999, s: 0 };
  const smoothX = gsap.quickTo(mouse, "x", { duration: MOUSE_LERP, ease: "none" });
  const smoothY = gsap.quickTo(mouse, "y", { duration: MOUSE_LERP, ease: "none" });

  const themeObserver = new MutationObserver(() => {
    baseColor = resolveBaseColor();
  });
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });

  function resize() {
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;
    cols = Math.ceil(w / GRID_STEP) + 1;
    rows = Math.ceil(h / GRID_STEP) + 1;
    grid = new Float64Array(cols * rows);
  }

  function render() {
    ctx.clearRect(0, 0, w, h);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = baseColor;

    for (let i = 0; i < THRESHOLD_COUNT; i++) {
      ctx.globalAlpha = thresholds.opacities[i];
      ctx.lineWidth = thresholds.widths[i];
      traceAndStrokeAurora(ctx, grid, cols, rows, GRID_STEP, thresholds.values[i]);
    }
  }

  resize();

  let resizeTimer: ReturnType<typeof setTimeout> | undefined;

  function onResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      resize();
      computeAuroraGrid(grid, cols, rows, GRID_STEP, zOffset, config, mouse);
      render();
    }, RESIZE_DEBOUNCE);
  }

  function onMouseMove(e: MouseEvent) {
    smoothX(e.clientX);
    smoothY(e.clientY);
    if (mouse.s < 0.001)
      gsap.to(mouse, { s: 1, duration: 0.3, ease: "power2.out" });
  }

  function onMouseLeave() {
    gsap.to(mouse, { s: 0, duration: MOUSE_FADE_DURATION, ease: "power2.out" });
  }

  function tick(_: number, dt: number) {
    frameCount++;
    if (frameCount % 2 !== 0)
      return;
    zOffset += Z_SPEED * dt;
    computeAuroraGrid(grid, cols, rows, GRID_STEP, zOffset, config, mouse);
    render();
  }

  window.addEventListener("resize", onResize, { passive: true });
  if (!isMobile) {
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseleave", onMouseLeave, { passive: true });
  }
  gsap.ticker.add(tick);

  return () => {
    clearTimeout(resizeTimer);
    themeObserver.disconnect();
    window.removeEventListener("resize", onResize);
    if (!isMobile) {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
    }
    gsap.ticker.remove(tick);
  };
}
