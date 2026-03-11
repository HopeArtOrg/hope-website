import gsap from "gsap";

import { STAR_SVG_PATH, STAR_SVG_STROKE_WIDTH } from "@/lib/constants";

const FRAGMENT_COUNT = 10;
const DESKTOP_STAR_COUNT = 36;
const MOBILE_STAR_COUNT = 18;
const HERO_STAR_X_RATIO = 0.25;
const HERO_STAR_Y_RATIO = -0.2;
const HERO_STAR_SIZE = 18;
const HERO_STAR_SCALE = 1.2;
const HERO_STAR_OPACITY = 0.7;

type StarMeta = {
  el: HTMLDivElement;
  targetX: number;
  targetY: number;
  targetScale: number;
  targetOpacity: number;
  baseSize: number;
};

type UniverseResult = {
  wrapper: HTMLDivElement;
  stars: StarMeta[];
  heroStar: StarMeta;
};

function createMiniStar(
  container: HTMLElement,
  size: number,
  color: string,
): HTMLDivElement {
  const wrapper = document.createElement("div");
  wrapper.style.cssText = `position:absolute;top:50%;left:50%;pointer-events:none;opacity:0;color:${color}`;
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 3000 3000");
  svg.setAttribute("fill", "none");
  svg.style.width = `${size}px`;
  svg.style.height = `${size}px`;
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", STAR_SVG_PATH);
  path.setAttribute("fill", "none");
  path.setAttribute("stroke", "currentColor");
  path.setAttribute("stroke-width", STAR_SVG_STROKE_WIDTH);
  svg.appendChild(path);
  wrapper.appendChild(svg);
  container.appendChild(wrapper);
  return wrapper;
}

function cleanupElements(elements: HTMLElement[]) {
  elements.forEach(el => el.remove());
}

function addFragmentCirclePhase(
  tl: gsap.core.Timeline,
  container: HTMLElement,
  color: string,
): HTMLDivElement[] {
  const fragments: HTMLDivElement[] = [];
  for (let i = 0; i < FRAGMENT_COUNT; i++) {
    const size = 20 + Math.random() * 25;
    fragments.push(createMiniStar(container, size, color));
  }
  const circleRadius = Math.min(container.offsetWidth, container.offsetHeight) * 0.3;

  gsap.set(container, { autoAlpha: 1 });

  fragments.forEach((fragment, i) => {
    const angle = (i / FRAGMENT_COUNT) * Math.PI * 2;
    gsap.set(fragment, {
      x: Math.cos(angle) * circleRadius,
      y: Math.sin(angle) * circleRadius,
      rotation: Math.random() * 360,
      opacity: 0,
    });
  });

  tl.to(fragments, {
    opacity: 0.7,
    duration: 0.5,
    ease: "power1.out",
    stagger: { amount: 0.2, from: "random" },
  });

  return fragments;
}

function addCollapsePhase(
  tl: gsap.core.Timeline,
  fragments: HTMLDivElement[],
) {
  tl.to(fragments, {
    x: 0,
    y: 0,
    scale: 0.3,
    rotation: 0,
    opacity: 1,
    duration: 0.7,
    ease: "power3.in",
    stagger: 0.08,
  }, "+=0.2");

  tl.to(fragments, {
    scale: 0,
    opacity: 0,
    duration: 0.15,
    ease: "power2.in",
  });
}

function distributePositions(
  count: number,
  spreadX: number,
  spreadY: number,
): { x: number; y: number }[] {
  const cols = Math.ceil(Math.sqrt(count * (spreadX / spreadY)));
  const rows = Math.ceil(count / cols);
  const cellW = (spreadX * 2) / cols;
  const cellH = (spreadY * 2) / rows;
  const positions: { x: number; y: number }[] = [];

  for (let row = 0; row < rows && positions.length < count; row++) {
    for (let col = 0; col < cols && positions.length < count; col++) {
      const baseX = -spreadX + col * cellW + cellW / 2;
      const baseY = -spreadY + row * cellH + cellH / 2;
      positions.push({
        x: baseX + (Math.random() - 0.5) * cellW * 0.7,
        y: baseY + (Math.random() - 0.5) * cellH * 0.7,
      });
    }
  }

  for (let i = positions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [positions[i], positions[j]] = [positions[j], positions[i]];
  }

  return positions;
}

function addExplodePhase(
  tl: gsap.core.Timeline,
  container: HTMLElement,
  starCount: number,
  mobile: boolean,
  color: string,
): UniverseResult {
  const universeWrapper = document.createElement("div");
  universeWrapper.style.cssText = "position:absolute;inset:0;pointer-events:none";
  container.appendChild(universeWrapper);

  const spreadX = container.offsetWidth * 0.45;
  const spreadY = container.offsetHeight * 0.45;
  const positions = distributePositions(starCount, spreadX, spreadY);

  const sizeBase = mobile ? 4 : 6;
  const sizeRange = mobile ? 12 : 24;
  const scaleBase = mobile ? 0.3 : 0.4;
  const scaleRange = mobile ? 0.9 : 1.6;

  const stars: StarMeta[] = [];
  for (let i = 0; i < starCount; i++) {
    const size = sizeBase + Math.random() * sizeRange;
    const el = createMiniStar(universeWrapper, size, color);
    const targetScale = scaleBase + Math.random() * scaleRange;
    const targetOpacity = 0.2 + Math.random() * 0.6;
    gsap.set(el, { x: 0, y: 0, scale: 0, opacity: 0 });
    stars.push({
      el,
      targetX: positions[i].x,
      targetY: positions[i].y,
      targetScale,
      targetOpacity,
      baseSize: size,
    });
  }

  const heroEl = createMiniStar(universeWrapper, HERO_STAR_SIZE, color);
  gsap.set(heroEl, { x: 0, y: 0, scale: 0, opacity: 0 });
  const heroStar: StarMeta = {
    el: heroEl,
    targetX: spreadX * HERO_STAR_X_RATIO,
    targetY: spreadY * HERO_STAR_Y_RATIO,
    targetScale: HERO_STAR_SCALE,
    targetOpacity: HERO_STAR_OPACITY,
    baseSize: HERO_STAR_SIZE,
  };
  stars.push(heroStar);

  tl.add("explode");

  const els = stars.map(s => s.el);

  tl.to(els, {
    x: (i: number) => stars[i].targetX,
    y: (i: number) => stars[i].targetY,
    rotation: () => Math.random() * 540 - 270,
    scale: (i: number) => stars[i].targetScale,
    opacity: (i: number) => stars[i].targetOpacity,
    duration: 1.0,
    ease: "power2.out",
    stagger: { amount: 0.25, from: "center" },
  }, "explode");

  return { wrapper: universeWrapper, stars, heroStar };
}

function addUniverseLingerPhase(
  tl: gsap.core.Timeline,
  stars: StarMeta[],
) {
  const els = stars.map(s => s.el);
  tl.to(els, {
    y: "+=8",
    duration: 0.8,
    ease: "sine.inOut",
    yoyo: true,
    repeat: 1,
    stagger: { amount: 0.3, from: "random" },
  }, "explode+=0.8");
}

function addZoomIntoStarPhase(
  tl: gsap.core.Timeline,
  starSvg: SVGElement,
  starSvgNaturalSize: number,
  universe: UniverseResult,
  fragments: HTMLDivElement[],
) {
  const chosen = universe.heroStar;
  const otherEls = universe.stars
    .filter(s => s !== chosen)
    .map(s => s.el);
  const targetScale = starSvgNaturalSize / chosen.baseSize;

  tl.add("zoom");

  tl.to(otherEls, {
    opacity: 0,
    duration: 0.5,
    ease: "power1.in",
    stagger: { amount: 0.15, from: "random" },
  }, "zoom");

  tl.to(chosen.el, {
    x: 0,
    y: 0,
    scale: targetScale,
    rotation: 0,
    opacity: 1,
    duration: 1.0,
    ease: "power2.inOut",
  }, "zoom");

  tl.add(() => {
    gsap.set(starSvg, { scale: 1, opacity: 1 });
    cleanupElements([universe.wrapper]);
    cleanupElements(fragments);
  });
}

export function animateFloatDown(
  el: HTMLElement,
  offset: number,
  duration: number,
  delay = 0,
) {
  gsap.from(el, {
    y: -offset,
    autoAlpha: 0,
    duration,
    delay,
    ease: "power3.out",
  });
}

export function animateBigBang(
  el: HTMLElement,
  mobile = false,
) {
  const tl = gsap.timeline();
  const starSvg = el.querySelector("svg")!;
  const starSvgNaturalSize = starSvg.getBoundingClientRect().width;
  const starCount = mobile ? MOBILE_STAR_COUNT : DESKTOP_STAR_COUNT;
  const starColor = getComputedStyle(starSvg).color;

  gsap.set(starSvg, { scale: 0, opacity: 0 });

  const fragments = addFragmentCirclePhase(tl, el, starColor);

  addCollapsePhase(tl, fragments);

  const universe = addExplodePhase(tl, el, starCount, mobile, starColor);

  addUniverseLingerPhase(tl, universe.stars);

  addZoomIntoStarPhase(tl, starSvg, starSvgNaturalSize, universe, fragments);

  return tl;
}

export function animateStarDrift(
  el: HTMLElement,
  targetLeft: string,
) {
  const tl = gsap.timeline();
  const starSvg = el.querySelector("svg")!;

  tl.to(el, {
    left: targetLeft,
    duration: 2,
    ease: "power1.inOut",
  });

  tl.to(starSvg, {
    rotation: 15,
    duration: 1,
    ease: "sine.inOut",
    yoyo: true,
    repeat: 1,
  }, "<");

  tl.to(starSvg, {
    scale: 1.05,
    duration: 1,
    ease: "sine.inOut",
    yoyo: true,
    repeat: 1,
  }, "<");

  return tl;
}

export function animateBounce(el: HTMLElement) {
  const tl = gsap.timeline();
  tl.to(el, {
    y: "-8vh",
    duration: 0.25,
    ease: "power2.out",
  });
  tl.to(el, {
    y: 0,
    duration: 0.25,
    ease: "power2.in",
  });
  return tl;
}
