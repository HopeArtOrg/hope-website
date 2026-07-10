---
name: gsap-animations
description: Guidelines for creating minimalist, Zen-like animations using GSAP and ScrollTrigger.
---

## What I do
- Implement scroll-based reveal animations using `animateScrollReveal`.
- Create interactive effects like star explosions (`explodeStars`) and mouse tilt (`applyTilt`).
- Ensure animations respect `prefers-reduced-motion`.
- Maintain a "Zen" aesthetic: smooth, purposeful, and not overwhelming.

## Usage
- Use `gsap` with `ScrollTrigger` plugin.
- Reference `src/lib/animation-utils.ts` for shared animation logic.
- Animations should be triggered primarily by scroll visibility.

## Principles
- **Subtlety**: Use `power3.out` for natural-feeling transitions.
- **Responsiveness**: Adjust y-offsets for mobile vs. desktop (default: 80px desktop, 40px mobile).
- **Cleanup**: Always return a cleanup function to kill ScrollTriggers on component unmount.
