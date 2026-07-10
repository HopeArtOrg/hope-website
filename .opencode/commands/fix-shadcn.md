---
description: Fix newly installed shadcn-svelte components for UnoCSS and project conventions
agent: build
---

The user just installed shadcn-svelte components in src/components/ui. For each new or modified component file in src/components/ui/:

1. Replace any @lucide/svelte or lucide-svelte icon imports with @iconify/svelte. Change component usage from <IconName /> to <Icon icon="lucide:icon-name" />.
2. Verify Tailwind CSS classes are compatible with UnoCSS presetWind4. Fix any incompatible classes.
3. Fix import paths to use the project aliases: @/components/_, @/lib/_, @/layouts/*.
4. Ensure type imports use import type { ... } syntax (verbatimModuleSyntax).
5. Remove any comments from the code.
6. Run pnpm lint and pnpm format to verify.

$ARGUMENTS
