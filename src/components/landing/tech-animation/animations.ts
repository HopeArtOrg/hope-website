import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { prefersReducedMotion } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const SCRUB_SMOOTHING = 4;
const TRAVEL_DISTANCE = 300;

export function animateTechRows(
  sectionEl: HTMLElement,
  rows: HTMLElement[],
): () => void {
  if (prefersReducedMotion()) {
    return () => {};
  }

  const tweens = rows.map((row, index) => {
    const center = (row.scrollWidth - sectionEl.clientWidth) / 2;
    const direction = index % 2 === 0 ? -1 : 1;

    gsap.set(row, { x: -center });

    return gsap.fromTo(
      row,
      { x: -center + direction * TRAVEL_DISTANCE },
      {
        x: -center - direction * TRAVEL_DISTANCE,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: sectionEl,
          start: "top bottom",
          end: "bottom top",
          scrub: SCRUB_SMOOTHING,
        },
      },
    );
  });

  return () => {
    tweens.forEach((tween) => {
      tween.scrollTrigger?.kill();
      tween.kill();
    });
  };
}
