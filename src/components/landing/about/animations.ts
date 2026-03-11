import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { prefersReducedMotion } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const TILT_MAX_DEG = 8;
const TILT_SCALE = 1.02;
const TILT_PERSPECTIVE = 800;

const CORNER_STAR_BASE_ROTATION = 15;
const CORNER_STAR_TILT_ROTATION = 30;

const BRING_FORWARD_OFFSET_X = 80;
const BRING_FORWARD_OFFSET_Y = -50;
const BRING_FORWARD_OFFSET_X_MOBILE = 40;
const BRING_FORWARD_OFFSET_Y_MOBILE = -25;
const BRING_FORWARD_SCALE = 1.05;
const BRING_FORWARD_Z_INDEX = 20;
const BRING_FORWARD_DURATION = 0.5;

const SCROLL_REVEAL_DURATION = 1;
const SCROLL_REVEAL_DELAY = 0.2;
const SCROLL_REVEAL_Y = 80;
const SCROLL_REVEAL_Y_MOBILE = 40;
const SCROLL_TRIGGER_START = "top 85%";

const MOBILE_BREAKPOINT = 1024;
const SMALL_BREAKPOINT = 640;

function applyTilt(e: MouseEvent, el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  const offsetX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
  const offsetY = ((rect.top + rect.height / 2) - e.clientY) / (rect.height / 2);
  el.style.transform
    = `perspective(${TILT_PERSPECTIVE}px) rotateX(${offsetY * TILT_MAX_DEG}deg) rotateY(${offsetX * TILT_MAX_DEG}deg) scale(${TILT_SCALE})`;
}

function resetTilt(el: HTMLElement) {
  el.style.transform = "";
}

type BringForwardState = {
  active: boolean;
};

export function createBringForwardState(): BringForwardState {
  return { active: false };
}

export function toggleBringForward(
  el: HTMLElement,
  state: BringForwardState,
) {
  const isMobile = window.innerWidth < MOBILE_BREAKPOINT;

  if (state.active) {
    state.active = false;
    gsap.to(el, {
      x: 0,
      y: 0,
      zIndex: 1,
      scale: 1,
      duration: BRING_FORWARD_DURATION,
      ease: "power2.out",
    });
  }
  else {
    state.active = true;
    resetTilt(el);
    gsap.to(el, {
      x: isMobile ? BRING_FORWARD_OFFSET_X_MOBILE : BRING_FORWARD_OFFSET_X,
      y: isMobile ? BRING_FORWARD_OFFSET_Y_MOBILE : BRING_FORWARD_OFFSET_Y,
      zIndex: BRING_FORWARD_Z_INDEX,
      scale: BRING_FORWARD_SCALE,
      duration: BRING_FORWARD_DURATION,
      ease: "power2.out",
    });
  }
}

export function tiltCornerStar(el: HTMLElement) {
  if (prefersReducedMotion())
    return;
  gsap.timeline()
    .to(el, { rotation: CORNER_STAR_TILT_ROTATION, scale: 1.1, duration: 0.15, ease: "power2.out" })
    .to(el, { rotation: CORNER_STAR_BASE_ROTATION, scale: 1, duration: 0.3, ease: "elastic.out(1, 0.4)" });
}

export function setupImageInteractions(
  appImg: HTMLElement,
  repoBtn: HTMLElement,
  state: BringForwardState,
): () => void {
  const controller = new AbortController();
  const { signal } = controller;

  appImg.addEventListener("mousemove", e => applyTilt(e, appImg), { signal });
  appImg.addEventListener("mouseleave", () => resetTilt(appImg), { signal });

  repoBtn.addEventListener("mousemove", (e) => {
    if (!state.active)
      applyTilt(e, repoBtn);
  }, { signal });

  repoBtn.addEventListener("mouseleave", () => {
    if (!state.active)
      resetTilt(repoBtn);
  }, { signal });

  repoBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleBringForward(repoBtn, state);
  }, { signal });

  document.addEventListener("click", () => {
    if (state.active)
      toggleBringForward(repoBtn, state);
  }, { signal });

  return () => controller.abort();
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

  const tween1 = gsap.from(leftCol, {
    y: yOffset,
    autoAlpha: 0,
    duration: SCROLL_REVEAL_DURATION,
    ease: "power3.out",
    scrollTrigger: {
      trigger,
      start: SCROLL_TRIGGER_START,
      toggleActions: "play none none none",
    },
  });

  const tween2 = gsap.from(rightCol, {
    y: yOffset,
    autoAlpha: 0,
    duration: SCROLL_REVEAL_DURATION,
    delay: SCROLL_REVEAL_DELAY,
    ease: "power3.out",
    scrollTrigger: {
      trigger,
      start: SCROLL_TRIGGER_START,
      toggleActions: "play none none none",
    },
  });

  let tween3: gsap.core.Tween | undefined;
  if (definitionEl) {
    tween3 = gsap.from(definitionEl, {
      y: yOffset * 0.75,
      autoAlpha: 0,
      duration: SCROLL_REVEAL_DURATION,
      delay: SCROLL_REVEAL_DELAY * 2,
      ease: "power3.out",
      scrollTrigger: {
        trigger,
        start: SCROLL_TRIGGER_START,
        toggleActions: "play none none none",
      },
    });
  }

  return () => {
    tween1.scrollTrigger?.kill();
    tween1.kill();
    tween2.scrollTrigger?.kill();
    tween2.kill();
    tween3?.scrollTrigger?.kill();
    tween3?.kill();
  };
}

const RIPPLE_RADIUS = 60;
const RIPPLE_APPEAR_DURATION = 0.3;
const RIPPLE_SHRINK_DURATION = 0.25;
const RIPPLE_MOVE_DURATION = 0.15;
const RIPPLE_OVERFLOW = 64;

export function setupHeadingRipple(
  container: HTMLElement,
  jpLayer: HTMLElement,
): () => void {
  if (prefersReducedMotion())
    return () => {};

  const controller = new AbortController();
  const { signal } = controller;

  const state = {
    active: false,
    moveTween: null as gsap.core.Tween | null,
    sizeTween: null as gsap.core.Tween | null,
  };
  const pos = { x: 0, y: 0, r: 0 };

  function toLayerX(clientX: number, rect: DOMRect) {
    return clientX - rect.left + RIPPLE_OVERFLOW;
  }

  function toLayerY(clientY: number, rect: DOMRect) {
    return clientY - rect.top + RIPPLE_OVERFLOW;
  }

  function applyClip() {
    jpLayer.style.clipPath = `circle(${pos.r}px at ${pos.x}px ${pos.y}px)`;
  }

  gsap.set(jpLayer, { clipPath: "circle(0px at 0px 0px)" });

  container.addEventListener("mouseenter", (e) => {
    const rect = container.getBoundingClientRect();
    pos.x = toLayerX(e.clientX, rect);
    pos.y = toLayerY(e.clientY, rect);
    state.active = true;

    state.sizeTween?.kill();
    state.sizeTween = gsap.to(pos, {
      r: RIPPLE_RADIUS,
      duration: RIPPLE_APPEAR_DURATION,
      ease: "back.out(1.7)",
      onUpdate: applyClip,
    });
  }, { signal });

  container.addEventListener("mousemove", (e) => {
    if (!state.active)
      return;

    const rect = container.getBoundingClientRect();
    const x = toLayerX(e.clientX, rect);
    const y = toLayerY(e.clientY, rect);

    state.moveTween?.kill();
    state.moveTween = gsap.to(pos, {
      x,
      y,
      duration: RIPPLE_MOVE_DURATION,
      ease: "power2.out",
      onUpdate: applyClip,
    });
  }, { signal });

  container.addEventListener("mouseleave", (e) => {
    const rect = container.getBoundingClientRect();
    pos.x = toLayerX(e.clientX, rect);
    pos.y = toLayerY(e.clientY, rect);
    state.active = false;

    state.moveTween?.kill();
    state.sizeTween?.kill();
    state.sizeTween = gsap.to(pos, {
      r: 0,
      duration: RIPPLE_SHRINK_DURATION,
      ease: "power2.in",
      onUpdate: applyClip,
    });
  }, { signal });

  return () => {
    controller.abort();
    state.moveTween?.kill();
    state.sizeTween?.kill();
  };
}

const DOODLE_ARROW_SCROLL_START = "top 75%";
const DOODLE_ARROW_DURATION = 0.8;
const DOODLE_ARROW_STAGGER = 0.2;

export function animateDoodleArrows(
  trigger: HTMLElement,
  arrows: HTMLElement[],
): () => void {
  if (prefersReducedMotion()) {
    gsap.set(arrows, { autoAlpha: 1 });
    return () => {};
  }

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger,
      start: DOODLE_ARROW_SCROLL_START,
      toggleActions: "play none none none",
    },
  });

  arrows.forEach((el, i) => {
    tl.from(el, {
      autoAlpha: 0,
      scale: 0.2,
      rotate: -30,
      duration: DOODLE_ARROW_DURATION,
      ease: "back.out(2.5)",
    }, i * DOODLE_ARROW_STAGGER);
  });

  return () => {
    tl.scrollTrigger?.kill();
    tl.kill();
  };
}
