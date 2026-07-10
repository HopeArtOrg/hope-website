---
name: fix-shadcn
description: Fix shadcn-svelte components after installation to support UnoCSS and project conventions.
---

## What I do
- Replace `@lucide/svelte` icon imports with `@iconify/svelte` using `<Icon icon="lucide:name" />`.
- Verify Tailwind CSS utility classes work with UnoCSS `presetWind4`.
- Fix import paths to use `@/components/*`, `@/lib/*`, `@/layouts/*`.
- Ensure type-only imports use `import type { ... }` syntax.
- Remove all comments from generated component code.
- Verify font classes use project conventions (`font-primary`, `font-mono`).

## When to use me
Use after installing shadcn-svelte components via CLI into `src/components/ui/`.

## Steps
1. Scan `.svelte` and `.ts` files in the `src/components/ui/` subdirectory.
2. Replace icon imports: `import { IconName } from "@lucide/svelte"` -> `import Icon from "@iconify/svelte"` and `<IconName />` -> `<Icon icon="lucide:icon-name" />`.
3. Update import paths to use `@/lib/utils`, `@/components/ui/*`, etc.
4. Separate type imports from value imports with a blank line.
5. Replace raw `font-family` CSS or `font-sans`/`font-serif` with `font-primary`/`font-mono`.
6. Remove all code comments.
7. Run `pnpm format` to auto-fix lint issues.
