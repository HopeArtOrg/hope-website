import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { explodeStars as sharedExplodeStars } from "@/lib/animation-utils";
import {
  AUTHOR_SHUFFLE_DURATION,
  AUTHOR_SHUFFLE_OFFSET_X,
  AUTHOR_SHUFFLE_OFFSET_Y,
  AUTHOR_STAR_EXPLOSION_COUNT,
  AUTHOR_STAR_EXPLOSION_DURATION,
  AUTHOR_STAR_EXPLOSION_RADIUS,
  AUTHOR_TILT_MAX_DEG,
  AUTHOR_TILT_PERSPECTIVE,
} from "@/lib/constants";
import { prefersReducedMotion } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

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

  if (prefersReducedMotion() || "ontouchstart" in window)
    return () => {};

  const frontRx = gsap.quickTo(frontEl, "rotateX", { duration: 0.2, ease: "power1.out" });
  const frontRy = gsap.quickTo(frontEl, "rotateY", { duration: 0.2, ease: "power1.out" });
  const backRx = gsap.quickTo(backEl, "rotateX", { duration: 0.2, ease: "power1.out" });
  const backRy = gsap.quickTo(backEl, "rotateY", { duration: 0.2, ease: "power1.out" });

  const controller = new AbortController();
  const { signal } = controller;

  let rect = container.getBoundingClientRect();
  const updateRect = () => {
    rect = container.getBoundingClientRect();
  };

  window.addEventListener("resize", updateRect, { signal, passive: true });
  container.addEventListener("mouseenter", updateRect, { signal, passive: true });

  container.addEventListener("mousemove", (e) => {
    const offsetX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const offsetY = ((rect.top + rect.height / 2) - e.clientY) / (rect.height / 2);
    const rx = offsetY * AUTHOR_TILT_MAX_DEG;
    const ry = offsetX * AUTHOR_TILT_MAX_DEG;

    if (state.flipped) {
      backRx(rx);
      backRy(ry);
    }
    else {
      frontRx(rx);
      frontRy(ry);
    }
  }, { signal, passive: true });

  container.addEventListener("mouseleave", () => {
    const target = state.flipped ? { rx: backRx, ry: backRy } : { rx: frontRx, ry: frontRy };
    target.rx(0);
    target.ry(0);
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

export function explodeStars(container: HTMLElement): gsap.core.Timeline {
  return sharedExplodeStars(container, {
    count: AUTHOR_STAR_EXPLOSION_COUNT,
    radius: AUTHOR_STAR_EXPLOSION_RADIUS,
    duration: AUTHOR_STAR_EXPLOSION_DURATION,
  });
}
