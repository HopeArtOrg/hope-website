import gsap from "gsap";

const SCROLL_THRESHOLD = 50;
const HOVER_ZONE_HEIGHT = 60;

type NavbarAnimationState = {
  visible: boolean;
  lastScrollY: number;
};

function showNavbar(
  el: HTMLElement,
  state: NavbarAnimationState,
) {
  if (state.visible)
    return;
  state.visible = true;
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
    lastScrollY: window.scrollY,
  };

  gsap.set(el, { autoAlpha: 0, y: -80 });

  function handleScroll() {
    const currentY = window.scrollY;
    const scrollingDown = currentY > state.lastScrollY;
    const pastThreshold = currentY > SCROLL_THRESHOLD;

    if (scrollingDown && pastThreshold) {
      showNavbar(el, state);
    }
    else if (!scrollingDown && !pastThreshold) {
      hideNavbar(el, state);
    }

    state.lastScrollY = currentY;
  }

  function handleMouseMove(e: MouseEvent) {
    if (e.clientY <= HOVER_ZONE_HEIGHT) {
      showNavbar(el, state);
    }
    else if (state.visible && window.scrollY <= SCROLL_THRESHOLD) {
      hideNavbar(el, state);
    }
  }

  function handleMouseLeave() {
    if (state.visible && window.scrollY <= SCROLL_THRESHOLD) {
      hideNavbar(el, state);
    }
  }

  window.addEventListener("scroll", handleScroll, { passive: true });
  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    window.removeEventListener("scroll", handleScroll);
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseleave", handleMouseLeave);
  };
}
