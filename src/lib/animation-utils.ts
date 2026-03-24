import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { STAR_SVG_PATH, STAR_SVG_STROKE_WIDTH } from "@/lib/constants";
import { prefersReducedMotion } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.config({
  limitCallbacks: true,
  ignoreMobileResize: true,
});

export function createMiniStar(
  container: HTMLElement,
  size: number,
  color: string = "currentColor",
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

export function applyTilt(
  e: MouseEvent,
  el: HTMLElement,
  maxDeg: number,
  perspective: number,
  scale: number,
) {
  const rect = el.getBoundingClientRect();
  const offsetX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
  const offsetY = ((rect.top + rect.height / 2) - e.clientY) / (rect.height / 2);
  el.style.transform
    = `perspective(${perspective}px) rotateX(${offsetY * maxDeg}deg) rotateY(${offsetX * maxDeg}deg) scale(${scale})`;
}

export function resetTilt(el: HTMLElement) {
  el.style.transform = "";
}

export function isTriggerAlreadyPassed(trigger: HTMLElement, thresholdPercent = 0.85): boolean {
  const rect = trigger.getBoundingClientRect();
  const threshold = window.innerHeight * thresholdPercent;
  return rect.top < threshold;
}

export type ExplodeStarsConfig = {
  count: number;
  radius: number;
  duration: number;
};

export function explodeStars(
  container: HTMLElement,
  config: ExplodeStarsConfig,
): gsap.core.Timeline {
  const tl = gsap.timeline();
  const stars: HTMLDivElement[] = [];

  for (let i = 0; i < config.count; i++) {
    const size = 6 + Math.random() * 14;
    stars.push(createMiniStar(container, size));
  }

  const angles = stars.map((_, i) =>
    (i / config.count) * Math.PI * 2 + (Math.random() - 0.5) * 0.4,
  );

  tl.set(stars, { opacity: 1, scale: 0 });

  tl.to(stars, {
    x: (i: number) => Math.cos(angles[i]) * (config.radius * (0.5 + Math.random() * 0.5)),
    y: (i: number) => Math.sin(angles[i]) * (config.radius * (0.5 + Math.random() * 0.5)),
    scale: () => 0.5 + Math.random() * 1,
    rotation: () => Math.random() * 360,
    opacity: 1,
    duration: config.duration * 0.5,
    ease: "power2.out",
    stagger: { amount: 0.1, from: "random" },
  });

  tl.to(stars, {
    opacity: 0,
    scale: 0,
    duration: config.duration * 0.5,
    ease: "power1.in",
    stagger: { amount: 0.05, from: "random" },
    onComplete: () => stars.forEach(el => el.remove()),
  });

  return tl;
}

export type ScrollRevealConfig = {
  trigger: HTMLElement;
  elements: HTMLElement[];
  definitionEl?: HTMLElement;
  triggerStart?: string;
  duration?: number;
  delay?: number;
  yOffset?: number;
  yOffsetMobile?: number;
  smallBreakpoint?: number;
  useAutoAlpha?: boolean;
};

export function animateScrollReveal(config: ScrollRevealConfig): () => void {
  const {
    trigger,
    elements,
    definitionEl,
    triggerStart = "top 85%",
    duration = 1,
    delay = 0.2,
    yOffset = 80,
    yOffsetMobile = 40,
    smallBreakpoint = 640,
    useAutoAlpha = true,
  } = config;

  const setProp = useAutoAlpha ? "autoAlpha" : "opacity";

  if (prefersReducedMotion() || isTriggerAlreadyPassed(trigger)) {
    elements.forEach(el => gsap.set(el, { [setProp]: 1 }));
    if (definitionEl)
      gsap.set(definitionEl, { autoAlpha: 1 });
    return () => {};
  }

  const y = window.innerWidth < smallBreakpoint ? yOffsetMobile : yOffset;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger,
      start: triggerStart,
      toggleActions: "play none none none",
    },
  });

  elements.forEach((el, i) => {
    if (useAutoAlpha) {
      tl.from(el, {
        y,
        autoAlpha: 0,
        duration,
        ease: "power3.out",
      }, i * delay);
    }
    else {
      tl.fromTo(el, {
        y,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration,
        ease: "power3.out",
      }, i * delay);
    }
  });

  if (definitionEl) {
    tl.from(definitionEl, {
      y: y * 0.75,
      autoAlpha: 0,
      duration,
      ease: "power3.out",
    }, elements.length * delay);
  }

  return () => {
    tl.scrollTrigger?.kill();
    tl.kill();
  };
}
