---
name: fix-shadcn-component
description: Fix shadcn-svelte components after installation to support UnoCSS and project conventions
---

## What I do
- Replace @lucide/svelte icon imports with @iconify/svelte using <Icon icon="lucide:name" /> syntax
- Verify Tailwind CSS utility classes work with UnoCSS presetWind4
- Fix import paths to use project aliases (@/components/*, @/lib/*, @/layouts/*)
- Ensure type-only imports use import type { ... } syntax
- Remove all comments from generated component code
- Verify font classes use project conventions (font-primary for body text, font-mono for code)

## When to use me
After the user has manually installed shadcn-svelte components via the shadcn CLI into src/components/ui/. The generated components use @lucide/svelte and may have import paths or class names that need adjustment for this project.

## Steps
1. Scan all .svelte and .ts files in the affected src/components/ui/ subdirectory
2. Replace icon imports: change `import { IconName } from "@lucide/svelte"` to `import Icon from "@iconify/svelte"` and change `<IconName />` to `<Icon icon="lucide:icon-name" />`
3. Update import paths to use @/lib/utils, @/components/ui/*, etc.
4. Separate type imports from value imports with blank line between them
5. Replace any raw font-family CSS or font-sans/font-serif classes with project font classes (font-primary for body text, font-mono for code)
6. Remove all code comments
7. Run pnpm format to auto-fix lint issues
