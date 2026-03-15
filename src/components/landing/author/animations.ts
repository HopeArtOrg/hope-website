import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  AUTHOR_SCROLL_REVEAL_DELAY,
  AUTHOR_SCROLL_REVEAL_DURATION,
  AUTHOR_SCROLL_REVEAL_Y,
  AUTHOR_SCROLL_REVEAL_Y_MOBILE,
  AUTHOR_SCROLL_TRIGGER_START,
  AUTHOR_SHUFFLE_DURATION,
  AUTHOR_SHUFFLE_OFFSET_X,
  AUTHOR_SHUFFLE_OFFSET_Y,
  AUTHOR_SMALL_BREAKPOINT,
  AUTHOR_STAR_EXPLOSION_COUNT,
  AUTHOR_STAR_EXPLOSION_DURATION,
  AUTHOR_STAR_EXPLOSION_RADIUS,
  AUTHOR_TILT_MAX_DEG,
  AUTHOR_TILT_PERSPECTIVE,
  STAR_SVG_PATH,
  STAR_SVG_STROKE_WIDTH,
} from "@/lib/constants";
import { prefersReducedMotion } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

function applyTilt(e: MouseEvent, el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  const offsetX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
  const offsetY = ((rect.top + rect.height / 2) - e.clientY) / (rect.height / 2);
  gsap.to(el, {
    rotateX: offsetY * AUTHOR_TILT_MAX_DEG,
    rotateY: offsetX * AUTHOR_TILT_MAX_DEG,
    duration: 0.2,
    ease: "power1.out",
    overwrite: "auto",
  });
}

function resetTilt(el: HTMLElement) {
  gsap.to(el, {
    rotateX: 0,
    rotateY: 0,
    duration: 0.3,
    ease: "power2.out",
    overwrite: "auto",
  });
}

export type ShuffleState = {
  flipped: boolean;
  animating: boolean;
};

export function createShuffleState(): ShuffleState {
  return { flipped: false, animating: false };
}

export function toggleShuffle(
  frontEl: HTMLElement,
  backEl: HTMLElement,
  state: ShuffleState,
) {
  if (state.animating)
    return;
  state.animating = true;

  if (state.flipped) {
    state.flipped = false;
    gsap.to(backEl, {
      x: AUTHOR_SHUFFLE_OFFSET_X,
      y: AUTHOR_SHUFFLE_OFFSET_Y,
      zIndex: 1,
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      duration: AUTHOR_SHUFFLE_DURATION,
      ease: "power2.out",
      onComplete: () => { state.animating = false; },
    });
    gsap.to(frontEl, {
      zIndex: 10,
      rotateX: 0,
      rotateY: 0,
      duration: 0.01,
    });
  }
  else {
    state.flipped = true;
    gsap.to(backEl, {
      x: 0,
      y: 0,
      zIndex: 20,
      scale: 1.02,
      rotateX: 0,
      rotateY: 0,
      duration: AUTHOR_SHUFFLE_DURATION,
      ease: "power2.out",
      onComplete: () => { state.animating = false; },
    });
    gsap.to(frontEl, {
      zIndex: 1,
      rotateX: 0,
      rotateY: 0,
      duration: 0.01,
    });
  }
}

export function setupImageTilt(
  container: HTMLElement,
  frontEl: HTMLElement,
  backEl: HTMLElement,
  state: ShuffleState,
): () => void {
  gsap.set(frontEl, { transformPerspective: AUTHOR_TILT_PERSPECTIVE });
  gsap.set(backEl, {
    transformPerspective: AUTHOR_TILT_PERSPECTIVE,
    x: AUTHOR_SHUFFLE_OFFSET_X,
    y: AUTHOR_SHUFFLE_OFFSET_Y,
  });

  if (prefersReducedMotion())
    return () => {};

  const controller = new AbortController();
  const { signal } = controller;

  container.addEventListener("mousemove", (e) => {
    const target = state.flipped ? backEl : frontEl;
    applyTilt(e, target);
  }, { signal });

  container.addEventListener("mouseleave", () => {
    resetTilt(frontEl);
    resetTilt(backEl);
  }, { signal });

  return () => controller.abort();
}

export function setupImageShuffle(
  frontEl: HTMLElement,
  backEl: HTMLElement,
  state: ShuffleState,
): () => void {
  const controller = new AbortController();
  const { signal } = controller;

  backEl.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleShuffle(frontEl, backEl, state);
  }, { signal });

  backEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      e.stopPropagation();
      toggleShuffle(frontEl, backEl, state);
    }
  }, { signal });

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

  for (let i = 0; i < AUTHOR_STAR_EXPLOSION_COUNT; i++) {
    const size = 6 + Math.random() * 14;
    stars.push(createMiniStar(container, size));
  }

  const angles = stars.map((_, i) =>
    (i / AUTHOR_STAR_EXPLOSION_COUNT) * Math.PI * 2 + (Math.random() - 0.5) * 0.4,
  );

  tl.set(stars, { opacity: 1, scale: 0 });

  tl.to(stars, {
    x: (i: number) => Math.cos(angles[i]) * (AUTHOR_STAR_EXPLOSION_RADIUS * (0.5 + Math.random() * 0.5)),
    y: (i: number) => Math.sin(angles[i]) * (AUTHOR_STAR_EXPLOSION_RADIUS * (0.5 + Math.random() * 0.5)),
    scale: () => 0.5 + Math.random() * 1,
    rotation: () => Math.random() * 360,
    opacity: 1,
    duration: AUTHOR_STAR_EXPLOSION_DURATION * 0.5,
    ease: "power2.out",
    stagger: { amount: 0.1, from: "random" },
  });

  tl.to(stars, {
    opacity: 0,
    scale: 0,
    duration: AUTHOR_STAR_EXPLOSION_DURATION * 0.5,
    ease: "power1.in",
    stagger: { amount: 0.05, from: "random" },
    onComplete: () => stars.forEach(el => el.remove()),
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
  elements: HTMLElement[],
  definitionEl?: HTMLElement,
): () => void {
  if (prefersReducedMotion()) {
    elements.forEach(el => gsap.set(el, { autoAlpha: 1 }));
    if (definitionEl)
      gsap.set(definitionEl, { autoAlpha: 1 });
    return () => {};
  }

  if (isTriggerAlreadyPassed(trigger)) {
    elements.forEach(el => gsap.set(el, { autoAlpha: 1 }));
    if (definitionEl)
      gsap.set(definitionEl, { autoAlpha: 1 });
    return () => {};
  }

  const yOffset = window.innerWidth < AUTHOR_SMALL_BREAKPOINT
    ? AUTHOR_SCROLL_REVEAL_Y_MOBILE
    : AUTHOR_SCROLL_REVEAL_Y;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger,
      start: AUTHOR_SCROLL_TRIGGER_START,
      toggleActions: "play none none none",
    },
  });

  elements.forEach((el, i) => {
    tl.from(el, {
      y: yOffset,
      autoAlpha: 0,
      duration: AUTHOR_SCROLL_REVEAL_DURATION,
      ease: "power3.out",
    }, i * AUTHOR_SCROLL_REVEAL_DELAY);
  });

  if (definitionEl) {
    tl.from(definitionEl, {
      y: yOffset * 0.75,
      autoAlpha: 0,
      duration: AUTHOR_SCROLL_REVEAL_DURATION,
      ease: "power3.out",
    }, elements.length * AUTHOR_SCROLL_REVEAL_DELAY);
  }

  return () => {
    tl.scrollTrigger?.kill();
    tl.kill();
  };
}
