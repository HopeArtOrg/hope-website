import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  resetTilt,
  applyTilt as sharedApplyTilt,
  explodeStars as sharedExplodeStars,
} from "@/lib/animation-utils";
import {
  DEMO_CYCLE_TRANSITION_DURATION,
  DEMO_FRAME_BORDER_RADIUS,
  DEMO_FRAME_DASH_ARRAY,
  DEMO_FRAME_JUMP_DURATION,
  DEMO_FRAME_PADDING,
  DEMO_FRAME_STROKE_WIDTH,
  DEMO_STAR_EXPLOSION_COUNT,
  DEMO_STAR_EXPLOSION_DURATION,
  DEMO_STAR_EXPLOSION_RADIUS,
  DEMO_TILT_MAX_DEG,
  DEMO_TILT_PERSPECTIVE,
  DEMO_TILT_SCALE,
  PROTECTION_METHODS,
} from "@/lib/constants";
import { prefersReducedMotion } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export function applyTilt(e: MouseEvent, el: HTMLElement) {
  sharedApplyTilt(e, el, DEMO_TILT_MAX_DEG, DEMO_TILT_PERSPECTIVE, DEMO_TILT_SCALE);
}

export function explodeStars(container: HTMLElement): gsap.core.Timeline {
  return sharedExplodeStars(container, {
    count: DEMO_STAR_EXPLOSION_COUNT,
    radius: DEMO_STAR_EXPLOSION_RADIUS,
    duration: DEMO_STAR_EXPLOSION_DURATION,
  });
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
    duration: DEMO_CYCLE_TRANSITION_DURATION * 0.5,
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
    duration: DEMO_CYCLE_TRANSITION_DURATION,
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
  rect.setAttribute("stroke-width", String(DEMO_FRAME_STROKE_WIDTH));
  rect.setAttribute("stroke-dasharray", DEMO_FRAME_DASH_ARRAY);
  rect.setAttribute("rx", String(DEMO_FRAME_BORDER_RADIUS));
  rect.setAttribute("ry", String(DEMO_FRAME_BORDER_RADIUS));
  rect.setAttribute("x", String(DEMO_FRAME_PADDING));
  rect.setAttribute("y", String(DEMO_FRAME_PADDING));
  rect.setAttribute("width", String(w - DEMO_FRAME_PADDING * 2));
  rect.setAttribute("height", String(h - DEMO_FRAME_PADDING * 2));
  rect.setAttribute("fill", "none");
  frameEl.appendChild(rect);

  const clipRect = document.createElementNS("http://www.w3.org/2000/svg", "clipPath");
  const clipId = `frame-clip-${methodIndex}`;
  clipRect.setAttribute("id", clipId);
  const clipR = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  clipR.setAttribute("x", String(DEMO_FRAME_PADDING));
  clipR.setAttribute("y", String(DEMO_FRAME_PADDING));
  clipR.setAttribute("width", String(w - DEMO_FRAME_PADDING * 2));
  clipR.setAttribute("height", String(h - DEMO_FRAME_PADDING * 2));
  clipR.setAttribute("rx", String(DEMO_FRAME_BORDER_RADIUS));
  clipR.setAttribute("ry", String(DEMO_FRAME_BORDER_RADIUS));
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
    duration: DEMO_FRAME_JUMP_DURATION,
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
