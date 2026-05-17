import gsap from "gsap";
import { createNoise3D } from "simplex-noise";

const GRID_STEP = 16;
const THRESHOLD_COUNT = 4;
const THRESHOLD_MIN = -0.6;
const THRESHOLD_MAX = 0.6;
const NOISE_SCALE = 0.0015;
const Z_SPEED = 0.00012;
const LINE_WIDTH_MIN = 0.5;
const LINE_WIDTH_MAX = 1.2;
const LINE_OPACITY_MIN = 0.15;
const LINE_OPACITY_MAX = 0.35;
const RESIZE_DEBOUNCE = 150;

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
    opacities[i] = LINE_OPACITY_MIN + (0.4 + Math.random() * 0.6) * opRange;
    widths[i] = LINE_WIDTH_MIN + (0.3 + Math.random() * 0.7) * wRange;
  }
  return { values, opacities, widths };
}

function resolveBaseColor(): string {
  const isDark = document.documentElement.classList.contains("dark");
  return isDark ? "rgb(180, 185, 175)" : "rgb(100, 105, 95)";
}

export function setupAuroraBlogBg(canvas: HTMLCanvasElement): () => void {
  const ctx = canvas.getContext("2d", { alpha: true, desynchronized: true })!;
  const noise3D = createNoise3D();
  const { values, opacities, widths } = buildThresholds();

  let cols = 0;
  let rows = 0;
  let w = 0;
  let h = 0;
  let zOffset = 0;
  let grid = new Float64Array(0);
  let baseColor = resolveBaseColor();
  let frameCount = 0;
  let isVisible = false;

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

  function computeGrid() {
    for (let r = 0; r < rows; r++) {
      const py = r * GRID_STEP;
      const rowOff = r * cols;
      const pyNoise = py * NOISE_SCALE;
      for (let c = 0; c < cols; c++) {
        const px = c * GRID_STEP;
        grid[rowOff + c] = noise3D(px * NOISE_SCALE, pyNoise, zOffset);
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

        if (cfg === 0 || cfg === 15) {
          continue;
        }

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
    }, RESIZE_DEBOUNCE);
  }

  function tick(_: number, dt: number) {
    if (!isVisible) {
      return;
    }
    frameCount++;
    if (frameCount % 2 !== 0) {
      return;
    }
    zOffset += Z_SPEED * dt;
    computeGrid();
    render();
  }

  const observer = new IntersectionObserver(
    (entries) => {
      isVisible = entries[0].isIntersecting;
    },
    { threshold: 0.01 },
  );
  observer.observe(canvas);

  window.addEventListener("resize", onResize, { passive: true });
  gsap.ticker.add(tick);

  return () => {
    clearTimeout(resizeTimer);
    themeObserver.disconnect();
    observer.disconnect();
    window.removeEventListener("resize", onResize);
    gsap.ticker.remove(tick);
  };
}
