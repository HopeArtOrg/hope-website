# Hope Website - AI Agent Context

This document provides foundational mandates for AI agents (Gemini) operating in this repository. These rules take absolute precedence over general defaults.

## Project Overview

Hope Website is a localized landing page for the **Hope Art** application ([hope-art.app](https://hope-art.app)).

- **Tech Stack:** Astro 6, Svelte 5 (Runes), UnoCSS (Wind4), GSAP, `@takumi-rs/image-response`.
- **Output:** Static site for GitHub Pages (no SSR).
- **Design:** Minimalistic artistic Japanese Zen-like system design.
- **i18n:** English (`en`) and Vietnamese (`vn`) supported. Vietnamese is the default.

## Core Mandates (Strict)

### 1. Programming Paradigm

- **Paradigm:** Prefer **Procedural Programming** or **Functional Programming** patterns over Object-Oriented Programming (OOP).
- **Structure:** Keep components small and focused. Avoid deep inheritance or complex class structures.
- **Logic:** Keep animation logic in separate files (`animations.ts`) or utilities (`lib/animation-utils.ts`).

### 2. Code Style & Quality

- **No Comments:** Do not include comments in the code.
- **No Emojis:** Do not use emojis in code or markdown files.
- **Strict Formatting:** 2-space indent, semicolons required, double quotes. Managed by ESLint (`@antfu/eslint-config`).
- **No Console:** Remove all `console` logs before finishing. `process.env` usage is an error (use `import.meta.env`).
- **Build Hygiene:** Try not to abuse the `pnpm build` command. Use it only as a last resort for final verification. After the build is complete and testing is done, you MUST delete the build folders (e.g., `dist/`).

### 3. TypeScript

- **Strict Mode:** Verbatim module syntax is enabled.
- **Types over Interfaces:** Use `type` for all definitions (`ts/consistent-type-definitions`).
- **Imports:** Type imports must be separate: `import type { Foo } from "bar"`.
- **Path Aliases:** Use `@/lib/*`, `@/components/*`, `@/layouts/*`.
- **Sorting:** Imports must be sorted (Type imports first, then value imports). Enforced by `perfectionist/sort-imports`.

### 4. Svelte 5 Components

- **Runes Only:** Use `$props()`, `$state()`, `$derived()`, `$bindable()`, `$effect()`.
- **Children:** Use `{@render children?.()}`.
- **Attribute Limit:** Max 2 attributes per line (single-line), 1 per line (multiline).
- **Icons:** Use `@iconify/svelte` with `<Icon icon="lucide:name" />`. Never use `@lucide/svelte`.
- **Component Folders:** kebab-case (`src/components/ui/button/`). Structure: `button.svelte` + `index.ts`.

### 5. Internationalization (i18n)

- **JSON Files:** `src/i18n/en.json` and `src/i18n/vn.json`.
- **Vietnamese:** Must use **UTF-8 characters directly** in `vn.json`. Never use `\uXXXX` escape sequences.
- **Consistency:** All user-facing text must be added to both translation files.

### 6. Styling (UnoCSS)

- **Atomic CSS:** Use UnoCSS utility classes. No raw CSS files.
- **Theme:** Refer to `uno.config.ts` for the custom `zen` palette.
- **Shadcn:** Use `presetShadcn` tokens (`bg-primary`, `text-primary-foreground`, etc.).
- **Fonts:**
  - `font-primary`: "Be Vietnam Pro" (Apply to `<body>`).
  - `font-mono`: "JetBrains Mono" (Apply to `<code>`, `<pre>`, etc.).
  - Never set `font-family` in raw CSS.

### 7. Agent Skills & Productivity Modes

- **Productivity Trigger:** Whenever the user asks for "best productivity", "maximum efficiency", "fastest iteration", "lazy mode", or similar, agents must activate both `caveman` (highly compressed, minimal token communication) and `ponytail` (absolute simplest/lazy solution, native features first, no over-engineering/YAGNI).
- **General Skills (.agents/skills/):** Refer to and follow the instructions in:
  - Astro, Svelte, and Library Docs: `context7`
  - UI, styling, CSS, and landing page layouts: `frontend-design`
  - TypeScript types and compile errors: `typescript-expert`
  - Browser debugging, runtimes, and network: `chrome-devtools`
  - Blogs, guides, and markdown writing: `essay`
  - Windows PowerShell/CLI execution: `powershell-windows`
- **Project-Specific Skills (.gemini/skills/):** Refer to and follow the instructions in:
  - UnoCSS Styling: `unocss-styling`
  - GSAP Animations: `gsap-animations`
  - shadcn-svelte Setup: `fix-shadcn`
  - git/GitHub Commit & Push: `github-workflow`
- **Verification:** Always read the corresponding `SKILL.md` before starting the task.

## shadcn-svelte Fix-List

When installing components into `src/components/ui/`, you MUST fix:

1. Tailwind CSS classes for UnoCSS compatibility.
2. Import paths to use `@/components/*`, `@/lib/*` aliases.
3. Icon imports from `@lucide/svelte` to `@iconify/svelte`.
4. Ensure `import type` separation for `verbatimModuleSyntax`.
5. Remove all comments from generated code.
6. Run `pnpm format` then `pnpm lint`.

## Commit Convention

- Format: `<type>(<scope>): <subject>`
- Subject: Imperative present tense, no capital, no period.
- Body: Mandatory for non-docs (min 20 chars), explain motivation.
- Footer: `Closes #N` or `BREAKING CHANGE:`.

## Common Commands

- `pnpm dev`: Start dev server (port 3000).
- `pnpm build`: Production build (delete `dist/` immediately after testing).
- `pnpm lint`: Run ESLint.
- `pnpm format`: Fix lint/format issues (`eslint . --fix`).
