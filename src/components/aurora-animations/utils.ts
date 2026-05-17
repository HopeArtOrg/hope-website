import { createNoise3D } from "simplex-noise";

export type AuroraConfig = {
  gridStep: number;
  noiseScale: number;
  thresholds: {
    values: Float64Array;
    opacities: Float64Array;
    widths: Float64Array;
  };
  mouse?: {
    radiusSq: number;
    strength: number;
  };
};

export function buildThresholds(count: number, min: number, max: number, opacityMin: number, opacityMax: number, widthMin: number, widthMax: number) {
  const values = new Float64Array(count);
  const opacities = new Float64Array(count);
  const widths = new Float64Array(count);
  const range = max - min;
  const opRange = opacityMax - opacityMin;
  const wRange = widthMax - widthMin;

  for (let i = 0; i < count; i++) {
    const t = count > 1 ? i / (count - 1) : 0.5;
    values[i] = min + t * range;
    opacities[i] = opacityMin + (0.3 + Math.random() * 0.7) * opRange;
    widths[i] = widthMin + (0.2 + Math.random() * 0.8) * wRange;
  }
  return { values, opacities, widths };
}

export function resolveBaseColor(): string {
  return document.documentElement.classList.contains("dark")
    ? "rgb(150, 153, 148)"
    : "rgb(122, 120, 115)";
}

const noise3D = createNoise3D();

export function computeAuroraGrid(
  grid: Float64Array,
  cols: number,
  rows: number,
  gridStep: number,
  zOffset: number,
  config: AuroraConfig,
  mouse?: { x: number; y: number; s: number },
) {
  const { noiseScale, mouse: mouseCfg } = config;
  const mx = mouse?.x ?? -9999;
  const my = mouse?.y ?? -9999;
  const ms = mouse?.s ?? 0;
  const useM = mouseCfg && ms > 0.001;

  for (let r = 0; r < rows; r++) {
    const py = r * gridStep;
    const rowOff = r * cols;
    const pyNoise = py * noiseScale;
    for (let c = 0; c < cols; c++) {
      const px = c * gridStep;
      let v = noise3D(px * noiseScale, pyNoise, zOffset);
      if (useM) {
        const dx = px - mx;
        const dy = py - my;
        const dSq = dx * dx + dy * dy;
        if (dSq < mouseCfg.radiusSq) {
          const t = dSq / mouseCfg.radiusSq;
          v += (1 - t) * (1 - t) * ms * mouseCfg.strength;
        }
      }
      grid[rowOff + c] = v;
    }
  }
}

export function traceAndStrokeAurora(
  ctx: CanvasRenderingContext2D,
  grid: Float64Array,
  cols: number,
  rows: number,
  gridStep: number,
  threshold: number,
) {
  ctx.beginPath();
  for (let r = 0; r < rows - 1; r++) {
    const y0 = r * gridStep;
    const y1 = y0 + gridStep;
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

      const x0 = c * gridStep;
      const x1 = x0 + gridStep;

      const topX = x0 + ((threshold - tl) / (tr - tl || 1e-10)) * gridStep;
      const rightY = y0 + ((threshold - tr) / (br - tr || 1e-10)) * gridStep;
      const bottomX = x0 + ((threshold - bl) / (br - bl || 1e-10)) * gridStep;
      const leftY = y0 + ((threshold - tl) / (bl - tl || 1e-10)) * gridStep;

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
