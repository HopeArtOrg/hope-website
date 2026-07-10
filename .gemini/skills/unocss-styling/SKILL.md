---
name: unocss-styling
description: Standards for atomic styling using UnoCSS, Wind4, and the custom Zen theme.
---

## What I do
- Apply atomic CSS classes using `presetWind4`.
- Use the custom `zen` theme colors from `presetShadcn`.
- Enforce the project's typography system.
- Ensure all styling is responsive and accessible.

## Theme Tokens (Zen)
- **Backgrounds**: `bg-background`, `bg-card`, `bg-popover`.
- **Text**: `text-foreground`, `text-muted-foreground`, `text-primary-foreground`.
- **Actions**: `bg-primary`, `bg-secondary`, `bg-accent`, `bg-destructive`.
- **Borders/Inputs**: `border-border`, `border-input`, `ring-ring`.

## Typography
- `font-primary`: "Be Vietnam Pro" (Default body font).
- `font-notojp`: "Noto Serif JP" (For Japanese/Artistic touches).
- `font-mono`: "JetBrains Mono" (For code and technical data).

## Rules
- No raw CSS in `<style>` blocks unless absolutely necessary for complex animations.
- Use `cn()` from `@/lib/utils` for dynamic class merging.
- Prefer UnoCSS shortcuts and variants (`group-*`, `peer-*`).
- **Class Prefixing**: All HTML `class` attributes in `.astro` and `.svelte` components must be prefixed with `:uno: ` (e.g., `<div class=":uno: flex gap-2">`). This is required for the `transformerCompileClass` to work.
- **ESLint**: The `unocss/enforce-class-compile` rule is set to `error` to automate and enforce this prefixing during `pnpm format`.
