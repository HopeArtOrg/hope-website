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

  const centers = rows.map((row) => {
    const center = (row.scrollWidth - sectionEl.clientWidth) / 2;
    gsap.set(row, { x: -center });
    return center;
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionEl,
      start: "top bottom",
      end: "bottom top",
      scrub: SCRUB_SMOOTHING,
    },
  });

  rows.forEach((row, index) => {
    const center = centers[index];
    const direction = index % 2 === 0 ? -1 : 1;
    tl.fromTo(
      row,
      { x: -center + direction * TRAVEL_DISTANCE },
      { x: -center - direction * TRAVEL_DISTANCE },
      0,
    );
  });

  return () => {
    tl.scrollTrigger?.kill();
    tl.kill();
  };
}
