import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { STAR_SVG_PATH, STAR_SVG_STROKE_WIDTH } from "@/lib/constants";
import { prefersReducedMotion } from "@/lib/utils";

import {
  CYCLE_TRANSITION_DURATION,
  FRAME_BORDER_RADIUS,
  FRAME_DASH_ARRAY,
  FRAME_JUMP_DURATION,
  FRAME_PADDING,
  FRAME_STROKE_WIDTH,
  PROTECTION_METHODS,
  SCROLL_REVEAL_DELAY,
  SCROLL_REVEAL_DURATION,
  SCROLL_REVEAL_Y,
  SCROLL_REVEAL_Y_MOBILE,
  SCROLL_TRIGGER_START,
  SMALL_BREAKPOINT,
  STAR_EXPLOSION_COUNT,
  STAR_EXPLOSION_DURATION,
  STAR_EXPLOSION_RADIUS,
  TILT_MAX_DEG,
  TILT_PERSPECTIVE,
  TILT_SCALE,
} from "./constants";

gsap.registerPlugin(ScrollTrigger);

export function applyTilt(e: MouseEvent, el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  const offsetX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
  const offsetY = ((rect.top + rect.height / 2) - e.clientY) / (rect.height / 2);
  el.style.transform
    = `perspective(${TILT_PERSPECTIVE}px) rotateX(${offsetY * TILT_MAX_DEG}deg) rotateY(${offsetX * TILT_MAX_DEG}deg) scale(${TILT_SCALE})`;
}

export function resetTilt(el: HTMLElement) {
  el.style.transform = "";
}

export function setupImageTilt(
  images: HTMLElement[],
): () => void {
  if (prefersReducedMotion())
    return () => {};

  const controller = new AbortController();
  const { signal } = controller;

  images.forEach((img) => {
    img.addEventListener("mousemove", e => applyTilt(e, img), { signal });
    img.addEventListener("mouseleave", () => resetTilt(img), { signal });
  });

  return () => controller.abort();
}

function createMiniStar(
  container: HTMLElement,
  size: number,
): HTMLDivElement {
  const wrapper = document.createElement("div");
  wrapper.style.cssText = `position:absolute;top:50%;left:50%;pointer-events:none;opacity:0;`;
  wrapper.style.color = "currentColor";
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

export function explodeStars(
  container: HTMLElement,
): gsap.core.Timeline {
  const tl = gsap.timeline();
  const stars: HTMLDivElement[] = [];

  for (let i = 0; i < STAR_EXPLOSION_COUNT; i++) {
    const size = 6 + Math.random() * 14;
    stars.push(createMiniStar(container, size));
  }

  const angles = stars.map((_, i) =>
    (i / STAR_EXPLOSION_COUNT) * Math.PI * 2 + (Math.random() - 0.5) * 0.4,
  );

  tl.set(stars, { opacity: 1, scale: 0 });

  tl.to(stars, {
    x: (i: number) => Math.cos(angles[i]) * (STAR_EXPLOSION_RADIUS * (0.5 + Math.random() * 0.5)),
    y: (i: number) => Math.sin(angles[i]) * (STAR_EXPLOSION_RADIUS * (0.5 + Math.random() * 0.5)),
    scale: () => 0.5 + Math.random() * 1,
    rotation: () => Math.random() * 360,
    opacity: 1,
    duration: STAR_EXPLOSION_DURATION * 0.5,
    ease: "power2.out",
    stagger: { amount: 0.1, from: "random" },
  });

  tl.to(stars, {
    opacity: 0,
    scale: 0,
    duration: STAR_EXPLOSION_DURATION * 0.5,
    ease: "power1.in",
    stagger: { amount: 0.05, from: "random" },
    onComplete: () => stars.forEach(el => el.remove()),
  });

  return tl;
}

export function cycleImage(
  images: HTMLElement[],
  currentIndex: number,
): number {
  const nextIndex = (currentIndex + 1) % images.length;
  const currentTop = images[currentIndex];
  const nextTop = images[nextIndex];

  gsap.to(currentTop, {
    scale: 0.95,
    opacity: 0.7,
    duration: CYCLE_TRANSITION_DURATION * 0.5,
    ease: "power2.in",
    onComplete: () => {
      currentTop.style.zIndex = "1";
      gsap.set(currentTop, { scale: 1, opacity: 1 });
    },
  });

  nextTop.style.zIndex = String(images.length + 1);
  gsap.fromTo(nextTop, {
    scale: 1.05,
    opacity: 0.8,
  }, {
    scale: 1,
    opacity: 1,
    duration: CYCLE_TRANSITION_DURATION,
    ease: "power2.out",
  });

  images.forEach((img, i) => {
    if (i !== currentIndex && i !== nextIndex) {
      img.style.zIndex = String(i + 1);
    }
  });

  return nextIndex;
}

export function animateDottedFrame(
  frameEl: SVGSVGElement,
  containerEl: HTMLElement,
  methodIndex: number,
): gsap.core.Timeline {
  const tl = gsap.timeline();
  const method = PROTECTION_METHODS[methodIndex % PROTECTION_METHODS.length];

  while (frameEl.firstChild)
    frameEl.removeChild(frameEl.firstChild);

  const containerRect = containerEl.getBoundingClientRect();
  const w = containerRect.width;
  const h = containerRect.height;

  frameEl.setAttribute("width", String(w));
  frameEl.setAttribute("height", String(h));

  const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  rect.setAttribute("stroke", method.color);
  rect.setAttribute("stroke-width", String(FRAME_STROKE_WIDTH));
  rect.setAttribute("stroke-dasharray", FRAME_DASH_ARRAY);
  rect.setAttribute("rx", String(FRAME_BORDER_RADIUS));
  rect.setAttribute("ry", String(FRAME_BORDER_RADIUS));
  rect.setAttribute("x", String(FRAME_PADDING));
  rect.setAttribute("y", String(FRAME_PADDING));
  rect.setAttribute("width", String(w - FRAME_PADDING * 2));
  rect.setAttribute("height", String(h - FRAME_PADDING * 2));
  rect.setAttribute("fill", "none");
  frameEl.appendChild(rect);

  const clipRect = document.createElementNS("http://www.w3.org/2000/svg", "clipPath");
  const clipId = `frame-clip-${methodIndex}`;
  clipRect.setAttribute("id", clipId);
  const clipR = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  clipR.setAttribute("x", String(FRAME_PADDING));
  clipR.setAttribute("y", String(FRAME_PADDING));
  clipR.setAttribute("width", String(w - FRAME_PADDING * 2));
  clipR.setAttribute("height", String(h - FRAME_PADDING * 2));
  clipR.setAttribute("rx", String(FRAME_BORDER_RADIUS));
  clipR.setAttribute("ry", String(FRAME_BORDER_RADIUS));
  clipRect.appendChild(clipR);
  frameEl.appendChild(clipRect);

  const diagGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
  diagGroup.setAttribute("clip-path", `url(#${clipId})`);
  const spacing = 40;
  const diagonal = Math.sqrt(w * w + h * h);
  const lineCount = Math.ceil(diagonal / spacing) * 2;
  const pathParts: string[] = [];
  for (let i = 0; i < lineCount; i++) {
    const offset = -diagonal + i * spacing;
    pathParts.push(`M${offset},0L${offset + h},${h}`);
  }
  const diagPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
  diagPath.setAttribute("d", pathParts.join(""));
  diagPath.setAttribute("stroke", method.color);
  diagPath.setAttribute("stroke-width", "0.8");
  diagPath.setAttribute("stroke-dasharray", "4 6");
  diagPath.setAttribute("stroke-opacity", "0.3");
  diagPath.setAttribute("fill", "none");
  diagGroup.appendChild(diagPath);
  frameEl.appendChild(diagGroup);

  tl.fromTo(frameEl, {
    y: -60,
    opacity: 0,
    scale: 1.05,
  }, {
    y: 0,
    opacity: 1,
    scale: 1,
    duration: FRAME_JUMP_DURATION,
    ease: "back.out(2)",
  });

  tl.to(frameEl, {
    opacity: 0,
    duration: 0.8,
    delay: 1.2,
    ease: "power1.in",
  });

  return tl;
}

function isTriggerAlreadyPassed(trigger: HTMLElement): boolean {
  const rect = trigger.getBoundingClientRect();
  const threshold = window.innerHeight * 0.85;
  return rect.top < threshold;
}

export function animateScrollReveal(
  trigger: HTMLElement,
  leftCol: HTMLElement,
  rightCol: HTMLElement,
  definitionEl?: HTMLElement,
): () => void {
  if (prefersReducedMotion()) {
    gsap.set(leftCol, { autoAlpha: 1 });
    gsap.set(rightCol, { autoAlpha: 1 });
    if (definitionEl)
      gsap.set(definitionEl, { autoAlpha: 1 });
    return () => {};
  }

  if (isTriggerAlreadyPassed(trigger)) {
    gsap.set(leftCol, { autoAlpha: 1 });
    gsap.set(rightCol, { autoAlpha: 1 });
    if (definitionEl)
      gsap.set(definitionEl, { autoAlpha: 1 });
    return () => {};
  }

  const yOffset = window.innerWidth < SMALL_BREAKPOINT
    ? SCROLL_REVEAL_Y_MOBILE
    : SCROLL_REVEAL_Y;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger,
      start: SCROLL_TRIGGER_START,
      toggleActions: "play none none none",
    },
  });

  tl.from(leftCol, {
    y: yOffset,
    autoAlpha: 0,
    duration: SCROLL_REVEAL_DURATION,
    ease: "power3.out",
  }, 0);

  tl.from(rightCol, {
    y: yOffset,
    autoAlpha: 0,
    duration: SCROLL_REVEAL_DURATION,
    ease: "power3.out",
  }, SCROLL_REVEAL_DELAY);

  if (definitionEl) {
    tl.from(definitionEl, {
      y: yOffset * 0.75,
      autoAlpha: 0,
      duration: SCROLL_REVEAL_DURATION,
      ease: "power3.out",
    }, SCROLL_REVEAL_DELAY * 2);
  }

  return () => {
    tl.scrollTrigger?.kill();
    tl.kill();
  };
}
