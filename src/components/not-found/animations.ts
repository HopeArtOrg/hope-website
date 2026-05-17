import gsap from "gsap";

export function initNotFoundAnimations(
  container: HTMLElement,
  title: HTMLElement,
  content: HTMLElement,
) {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.fromTo(
    title,
    { autoAlpha: 0, y: 40, scale: 0.9 },
    { autoAlpha: 1, y: 0, scale: 1, duration: 1.2 },
  );

  tl.fromTo(
    content,
    { autoAlpha: 0, y: 20 },
    { autoAlpha: 1, y: 0, duration: 1 },
    "-=0.6",
  );

  gsap.to(title, {
    y: "random(-10, 10)",
    x: "random(-10, 10)",
    rotation: "random(-1, 1)",
    duration: 4,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  return () => {
    tl.kill();
    gsap.killTweensOf(title);
  };
}
