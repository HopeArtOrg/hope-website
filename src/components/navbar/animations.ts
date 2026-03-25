import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { prefersReducedMotion } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const SCROLL_THRESHOLD = 50;
const HOVER_ZONE_HEIGHT = 60;

type NavbarAnimationState = {
  visible: boolean;
};

function showNavbar(
  el: HTMLElement,
  state: NavbarAnimationState,
) {
  if (state.visible)
    return;
  state.visible = true;
  if (prefersReducedMotion()) {
    gsap.set(el, { y: 0, autoAlpha: 1 });
    return;
  }
  gsap.fromTo(el, {
    y: -80,
    autoAlpha: 0,
  }, {
    y: 0,
    autoAlpha: 1,
    duration: 0.6,
    ease: "power3.out",
  });
}

function hideNavbar(
  el: HTMLElement,
  state: NavbarAnimationState,
) {
  if (!state.visible)
    return;
  state.visible = false;
  if (prefersReducedMotion()) {
    gsap.set(el, { y: -80, autoAlpha: 0 });
    return;
  }
  gsap.to(el, {
    y: -80,
    autoAlpha: 0,
    duration: 0.4,
    ease: "power2.in",
  });
}

export function setupNavbarVisibility(el: HTMLElement): () => void {
  const state: NavbarAnimationState = {
    visible: false,
  };

  gsap.set(el, { autoAlpha: 0, y: -80 });

  const st = ScrollTrigger.create({
    start: SCROLL_THRESHOLD,
    onToggle: self => self.isActive ? showNavbar(el, state) : hideNavbar(el, state),
  });

  // Initial check
  if (window.scrollY > SCROLL_THRESHOLD) {
    showNavbar(el, state);
  }

  let mouseMoveTimer: number | null = null;
  function handleMouseMove(e: MouseEvent) {
    if (mouseMoveTimer)
      return;
    mouseMoveTimer = window.requestAnimationFrame(() => {
      if (e.clientY <= HOVER_ZONE_HEIGHT) {
        showNavbar(el, state);
      }
      else if (state.visible && window.scrollY <= SCROLL_THRESHOLD) {
        hideNavbar(el, state);
      }
      mouseMoveTimer = null;
    });
  }

  function handleMouseLeave() {
    if (state.visible && window.scrollY <= SCROLL_THRESHOLD) {
      hideNavbar(el, state);
    }
  }

  function handleFocusIn() {
    showNavbar(el, state);
  }

  function handleFocusOut(e: FocusEvent) {
    if (!el.contains(e.relatedTarget as Node) && window.scrollY <= SCROLL_THRESHOLD) {
      hideNavbar(el, state);
    }
  }

  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseleave", handleMouseLeave);
  el.addEventListener("focusin", handleFocusIn);
  el.addEventListener("focusout", handleFocusOut);

  return () => {
    st.kill();
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseleave", handleMouseLeave);
    el.removeEventListener("focusin", handleFocusIn);
    el.removeEventListener("focusout", handleFocusOut);
  };
}
