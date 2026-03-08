import gsap from "gsap";
import { createNoise3D } from "simplex-noise";

const GRID_STEP = 12;
const THRESHOLD_COUNT = 3;
const THRESHOLD_MIN = -0.6;
const THRESHOLD_MAX = 0.6;
const NOISE_SCALE = 0.0018;
const Z_SPEED = 0.00015;
const LINE_WIDTH_MIN = 0.4;
const LINE_WIDTH_MAX = 1.0;
const LINE_OPACITY_MIN = 0.1;
const LINE_OPACITY_MAX = 0.22;
const MOUSE_RADIUS = 200;
const MOUSE_STRENGTH = 0.4;
const MOUSE_LERP = 0.08;
const MOUSE_FADE_DURATION = 0.6;
const RESIZE_DEBOUNCE = 200;
const MOUSE_R_SQ = MOUSE_RADIUS * MOUSE_RADIUS;

function buildThresholds() {
  const values = new Float64Array(THRESHOLD_COUNT);
  const opacities = new Float64Array(THRESHOLD_COUNT);
  const widths = new Float64Array(THRESHOLD_COUNT);
  const range = THRESHOLD_MAX - THRESHOLD_MIN;
  const opRange = LINE_OPACITY_MAX - LINE_OPACITY_MIN;
  const wRange = LINE_WIDTH_MAX - LINE_WIDTH_MIN;
  for (let i = 0; i < THRESHOLD_COUNT; i++) {
    const t = THRESHOLD_COUNT > 1 ? i / (THRESHOLD_COUNT - 1) : 0.5;
    values[i] = THRESHOLD_MIN + t * range;
    opacities[i] = LINE_OPACITY_MIN + (0.3 + Math.random() * 0.7) * opRange;
    widths[i] = LINE_WIDTH_MIN + (0.2 + Math.random() * 0.8) * wRange;
  }
  return { values, opacities, widths };
}

function resolveBaseColor(): string {
  return document.documentElement.classList.contains("dark")
    ? "rgb(150,153,148)"
    : "rgb(122,120,115)";
}

export function setupAuroraBg(canvas: HTMLCanvasElement): () => void {
  const ctx = canvas.getContext("2d")!;
  const noise3D = createNoise3D();
  const { values, opacities, widths } = buildThresholds();

  let cols = 0;
  let rows = 0;
  let w = 0;
  let h = 0;
  let zOffset = 0;
  let grid = new Float64Array(0);
  let baseColor = resolveBaseColor();

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
    const rect = canvas.parentElement!.getBoundingClientRect();
    w = rect.width;
    h = rect.height;
    canvas.width = w;
    canvas.height = h;
    cols = Math.ceil(w / GRID_STEP) + 1;
    rows = Math.ceil(h / GRID_STEP) + 1;
    grid = new Float64Array(cols * rows);
  }

  function computeGrid() {
    const mx = mouse.x;
    const my = mouse.y;
    const ms = mouse.s;
    const useM = ms > 0.001;

    for (let r = 0; r < rows; r++) {
      const py = r * GRID_STEP;
      const rowOff = r * cols;
      for (let c = 0; c < cols; c++) {
        const px = c * GRID_STEP;
        let v = noise3D(px * NOISE_SCALE, py * NOISE_SCALE, zOffset);
        if (useM) {
          const dx = px - mx;
          const dy = py - my;
          const dSq = dx * dx + dy * dy;
          if (dSq < MOUSE_R_SQ) {
            const t = dSq / MOUSE_R_SQ;
            v += (1 - t) * (1 - t) * ms * MOUSE_STRENGTH;
          }
        }
        grid[rowOff + c] = v;
      }
    }
  }

  function traceAndStroke(threshold: number) {
    ctx.beginPath();
    for (let r = 0; r < rows - 1; r++) {
      const y0 = r * GRID_STEP;
      const y1 = y0 + GRID_STEP;
      const r0 = r * cols;
      const r1 = r0 + cols;

      for (let c = 0; c < cols - 1; c++) {
        const tl = grid[r0 + c];
        const tr = grid[r0 + c + 1];
        const br = grid[r1 + c + 1];
        const bl = grid[r1 + c];

        const cfg = (tl >= threshold ? 8 : 0)
          | (tr >= threshold ? 4 : 0)
          | (br >= threshold ? 2 : 0)
          | (bl >= threshold ? 1 : 0);

        if (cfg === 0 || cfg === 15)
          continue;

        const x0 = c * GRID_STEP;
        const x1 = x0 + GRID_STEP;

        const topX = x0 + ((threshold - tl) / (tr - tl || 1e-10)) * GRID_STEP;
        const rightY = y0 + ((threshold - tr) / (br - tr || 1e-10)) * GRID_STEP;
        const bottomX = x0 + ((threshold - bl) / (br - bl || 1e-10)) * GRID_STEP;
        const leftY = y0 + ((threshold - tl) / (bl - tl || 1e-10)) * GRID_STEP;

        switch (cfg) {
          case 1: case 14:
            ctx.moveTo(bottomX, y1);
            ctx.lineTo(x0, leftY);
            break;
          case 2: case 13:
            ctx.moveTo(x1, rightY);
            ctx.lineTo(bottomX, y1);
            break;
          case 3: case 12:
            ctx.moveTo(x1, rightY);
            ctx.lineTo(x0, leftY);
            break;
          case 4: case 11:
            ctx.moveTo(topX, y0);
            ctx.lineTo(x1, rightY);
            break;
          case 5: {
            const avg = (tl + tr + br + bl) * 0.25;
            if (avg >= threshold) {
              ctx.moveTo(topX, y0);
              ctx.lineTo(x0, leftY);
              ctx.moveTo(x1, rightY);
              ctx.lineTo(bottomX, y1);
            }
            else {
              ctx.moveTo(topX, y0);
              ctx.lineTo(x1, rightY);
              ctx.moveTo(bottomX, y1);
              ctx.lineTo(x0, leftY);
            }
            break;
          }
          case 6: case 9:
            ctx.moveTo(topX, y0);
            ctx.lineTo(bottomX, y1);
            break;
          case 7: case 8:
            ctx.moveTo(topX, y0);
            ctx.lineTo(x0, leftY);
            break;
          case 10: {
            const avg = (tl + tr + br + bl) * 0.25;
            if (avg >= threshold) {
              ctx.moveTo(topX, y0);
              ctx.lineTo(x1, rightY);
              ctx.moveTo(bottomX, y1);
              ctx.lineTo(x0, leftY);
            }
            else {
              ctx.moveTo(topX, y0);
              ctx.lineTo(x0, leftY);
              ctx.moveTo(x1, rightY);
              ctx.lineTo(bottomX, y1);
            }
            break;
          }
        }
      }
    }
    ctx.stroke();
  }

  function render() {
    ctx.clearRect(0, 0, w, h);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = baseColor;

    for (let i = 0; i < THRESHOLD_COUNT; i++) {
      ctx.globalAlpha = opacities[i];
      ctx.lineWidth = widths[i];
      traceAndStroke(values[i]);
    }
  }

  resize();

  let resizeTimer: ReturnType<typeof setTimeout> | undefined;

  function onResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      resize();
      computeGrid();
      render();
    }, RESIZE_DEBOUNCE);
  }

  function onMouseMove(e: MouseEvent) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
      smoothX(x);
      smoothY(y);
      if (mouse.s < 0.001)
        gsap.to(mouse, { s: 1, duration: 0.3, ease: "power2.out" });
    }
  }

  function onMouseLeave() {
    gsap.to(mouse, { s: 0, duration: MOUSE_FADE_DURATION, ease: "power2.out" });
  }

  function tick(_: number, dt: number) {
    zOffset += Z_SPEED * dt;
    computeGrid();
    render();
  }

  window.addEventListener("resize", onResize);
  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("mouseleave", onMouseLeave);
  gsap.ticker.add(tick);

  return () => {
    clearTimeout(resizeTimer);
    themeObserver.disconnect();
    window.removeEventListener("resize", onResize);
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseleave", onMouseLeave);
    gsap.ticker.remove(tick);
  };
}
