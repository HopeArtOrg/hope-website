# AGENTS.md

Guidelines for AI coding agents operating in this repository.

## Project Overview

Download page, development blog, and guide website for the [Hope](https://github.com/HopeArtOrg/hope-re) application. Built with Astro 5 + Svelte 5 + UnoCSS (shadcn-svelte presets) + GSAP (animations) + Threlte (3D homepage visuals) + `@takumi-rs/image-response` (OG images). Hosted on GitHub Pages (static output only, no SSR). Design aesthetic: minimalistic artistic Japanese Zen-like system design.

## Build & Dev Commands

| Command        | Description                                    |
| -------------- | ---------------------------------------------- |
| `pnpm install` | Install dependencies (use pnpm, not npm/yarn)  |
| `pnpm dev`     | Start dev server on port 3000                  |
| `pnpm build`   | Production build (outputs to `dist/`)          |
| `pnpm preview` | Preview production build                       |
| `pnpm lint`    | Lint the entire project (ESLint)               |
| `pnpm format`  | Auto-fix lint/format issues (`eslint . --fix`) |

Lint a single file: `pnpm eslint src/path/to/file.ts`
Fix a single file: `pnpm eslint src/path/to/file.ts --fix`
When you get lint errors, run `pnpm format` first, then re-run `pnpm lint`.

No test framework configured yet. Husky runs `lint-staged` on pre-commit. CI runs `pnpm lint` on PRs to `main` (pnpm 10, Node.js 24).

**Important**: Do not abuse `pnpm build`. Only run it when strictly necessary (e.g. verifying a structural or routing change). Always delete the `dist/` folder immediately after testing.

## Reference Documentation

When you need framework/library docs, use `context7` MCP or refer to these:

- Astro: https://docs.astro.build/llms.txt
- Svelte: https://svelte.dev/llms.txt
- UnoCSS: https://unocss.dev/llms.txt
- GSAP: https://gsap.com/llms.txt
- Takumi (OG images): https://takumi.kane.tw/llms.txt

## Agent Skills & Productivity Modes

### Productivity Trigger

Whenever the user asks for "best productivity", "maximum efficiency", "fastest iteration", "lazy mode", or similar productivity-oriented prompts, agents must combine and activate the following modes:

- **caveman** (`.agents/skills/caveman/SKILL.md`): Commits to extremely short, concise, and direct communication (caveman style) to reduce token count and quicken responses.
- **ponytail** (`.agents/skills/ponytail/SKILL.md`): Prioritizes the absolute simplest, most minimal implementation that satisfies requirements (YAGNI). Reaches for the standard library and native platform features first.

### General Productivity & Expert Skills (`.agents/skills/`)

Agents must reference and use the appropriate skill path under `.agents/skills/` for specialized tasks:

| Domain / Task                  | Recommended Skill    | Description & Instructions                                                            |
| ------------------------------ | -------------------- | ------------------------------------------------------------------------------------- |
| Astro, Svelte, UnoCSS Docs     | `context7`           | Retrieve up-to-date documentation and code patterns for libraries and frameworks.     |
| UI, Styling, CSS, Web Layouts  | `frontend-design`    | Build distinctive, production-grade frontend interfaces with Zen-like design quality. |
| TypeScript, Type Utilities     | `typescript-expert`  | Handle complex TypeScript logic, type-level programming, and ESLint configurations.   |
| Browser Debugging & Network    | `chrome-devtools`    | Automate and troubleshoot browser sessions or inspect network traffic.                |
| Writing, Guides, Documentation | `essay`              | Run structured pipelines for drafting and polishing text content or guides.           |
| Windows Shell & CLI            | `powershell-windows` | Guide commands on Windows environments, avoiding script syntax/path pitfalls.         |

### Project-Specific Custom Skills (`.gemini/skills/`)

For project-specific tasks, agents must reference and follow the guidelines in the appropriate custom skill:

| Domain / Task            | Recommended Skill | Description & Instructions                                                                                                          |
| ------------------------ | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| UnoCSS Styling           | `unocss-styling`  | Applying atomic CSS classes using `presetWind4`, Zen theme tokens, typography rules, and compiler class prefixing (`:uno:` prefix). |
| GSAP Animations          | `gsap-animations` | Creating minimalist reveal animations, tilt effects, explosion effects, and handling mobile/desktop responsiveness.                 |
| shadcn-svelte Setup      | `fix-shadcn`      | Post-installation fixes for shadcn-svelte components (Lucide to Iconify, import paths, class compilation).                          |
| git/GitHub Commit & Push | `github-workflow` | Standards for formatting commits (Angular convention), staging, and pushing changes safely.                                         |

Before proceeding with any task matching these domains, agents must read the relevant `SKILL.md` instructions using `view_file` to ensure correct and standardized implementation.

## Code Rules (All Agents)

- No comments in code
- No emojis in code or markdown files
- Functional programming over OOP
- All formatting handled by ESLint via `@antfu/eslint-config` (no Prettier)
- Indent: 2 spaces; semicolons: always; quotes: double; trailing commas: ES5
- Files end with newline; trailing whitespace trimmed; LF line endings
- `no-console` is warn (remove before committing); `process.env` is an error

## TypeScript

- Strict mode (extends `astro/tsconfigs/strict`), `verbatimModuleSyntax: true`
- Use `type` over `interface` (enforced: `ts/consistent-type-definitions`)
- Type imports must be separate: `import type { Foo } from "bar"`
- Path aliases: `@/lib/*`, `@/components/*`, `@/layouts/*`

## Imports

Type imports first (external then internal), blank line, value imports. Enforced by `perfectionist/sort-imports`.

```typescript
import type { ClassValue } from "clsx";

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
```

## Naming

- Files: kebab-case (enforced, except .md/.yml/.json)
- Types: PascalCase (`ButtonProps`, `WithElementRef`)
- Functions/variables/constants: camelCase
- Component folders: kebab-case (`src/components/ui/button/`)

## Svelte Components

- Svelte 5 runes only: `$props()`, `$state()`, `$derived()`, `$bindable()`, `$effect()`
- Children: `{@render children?.()}`
- Max 2 attributes single-line, 1 per line multiline
- `<script lang="ts" module>` for exports (types, variants); `<script lang="ts">` for instance logic
- Icons: `@iconify/svelte` with `<Icon icon="lucide:icon-name" />` (never `@lucide/svelte`)

## Astro Pages

- Frontmatter in `---` fence; use path aliases for imports
- Static output only (GitHub Pages) -- no SSR features
- i18n via Astro built-in i18n routing (English + Vietnamese)
- Blog/content: markdown rendering with shiki syntax highlighting (`astro:components` Code), MathJax, tables
- RSS/feed.xml and sitemap.xml required

### i18n JSON Files

- Translation files live in `src/i18n/` (`en.json`, `vn.json`)
- Vietnamese (`vn.json`) must use **UTF-8 characters directly** -- never use `\uXXXX` escape sequences
- All user-facing text must be added to both `en.json` and `vn.json`

## Component Architecture (shadcn-svelte)

```
src/components/ui/button/
  button.svelte     # Component implementation
  index.ts          # Barrel export
```

- Variants via `tailwind-variants` (`tv()`) in `<script module>` block
- Class merging: always use `cn()` from `@/lib/utils`
- When building layout components (Navbar, Header, Footer, etc.), list required shadcn-svelte core components for the user to install manually before proceeding

## After Installing shadcn-svelte Components

When the user installs components into `src/components/ui/`, fix:

1. Tailwind CSS classes for UnoCSS compatibility
2. Import paths to use `@/components/*`, `@/lib/*` aliases
3. Icon imports from `@lucide/svelte` to `@iconify/svelte` (`<Icon icon="lucide:name" />`)
4. Ensure `import type` separation for `verbatimModuleSyntax`
5. Remove all comments from generated code
6. Run `pnpm format` then `pnpm lint`

## Styling

- UnoCSS with `presetWind4` (Tailwind v4 compatible) + shadcn preset (neutral theme, 0.25rem radius)
- shadcn tokens: `bg-primary`, `text-primary-foreground`, `border-ring`, etc.
- No raw CSS utility files -- use UnoCSS classes inline
- GSAP for animations; Threlte for 3D visuals on homepage
- Responsive design required for mobile and desktop

### Fonts

Fonts are configured via `presetWebFonts` in `uno.config.ts` (Google Fonts provider):

| UnoCSS class   | Font family    | Usage                                                                      |
| -------------- | -------------- | -------------------------------------------------------------------------- |
| `font-primary` | Be Vietnam Pro | Primary/body font. Applied to `<body>` in layouts so all text inherits it. |
| `font-mono`    | JetBrains Mono | Monospace font for `<code>`, `<pre>`, and code blocks.                     |

- Always apply `font-primary` on the `<body>` or root layout element so all text defaults to "Be Vietnam Pro"
- Use `font-mono` on code-related elements (`<code>`, `<pre>`, inline code, code blocks)
- Never set `font-family` in raw CSS -- use the UnoCSS utility classes instead
- Do not import fonts manually (e.g. via `<link>` tags) -- `presetWebFonts` handles loading

## Commit Messages

Angular-style conventional commits: `<type>(<scope>): <subject>`

- Types: `feat`, `fix`, `perf`, `build`, `ci`, `docs`, `style`, `refactor`, `test`
- Subject: imperative present tense, no capital, no period
- Body: mandatory for non-docs (min 20 chars), explain motivation
- Footer: `Closes #N`, `BREAKING CHANGE:` when applicable

## Key Dependencies

| Package                     | Purpose                                       |
| --------------------------- | --------------------------------------------- |
| `astro`                     | Static site framework (GitHub Pages)          |
| `svelte` (v5)               | Interactive components (runes mode)           |
| `unocss`                    | Atomic CSS (Wind4/Tailwind-compatible)        |
| `bits-ui`                   | Headless Svelte UI primitives                 |
| `tailwind-variants` (`tv`)  | Variant-based component styling               |
| `clsx` + `tailwind-merge`   | Class merging (via `cn()`)                    |
| `@iconify/svelte`           | Icons (Lucide set)                            |
| `astro-icon`                | Astro-native icon integration                 |
| `gsap`                      | Scroll/transition animations                  |
| `@threlte/*`                | Three.js integration for Svelte (3D homepage) |
| `@takumi-rs/image-response` | OG image generation                           |
| `shiki`                     | Syntax highlighting for blog code blocks      |

## Project Structure

```
src/
  components/
    ui/              # shadcn-style UI components (button/, etc.)
  lib/
    utils.ts         # cn() utility and shared type helpers
  layouts/           # Astro layouts
  pages/
    index.astro      # Routes (file-based routing)
  content/           # Blog/guide markdown content
public/              # Static assets (favicons, images)
.agents/
  skills/            # Localized agent productivity skills (caveman, ponytail, etc.)
.gemini/
  skills/            # Project-specific custom agent skills (fix-shadcn, unocss-styling, etc.)
.opencode/
  agents/            # OpenCode subagent definitions
  commands/          # Custom /commands (lint-fix, build-check, fix-shadcn)
  skills/            # Reusable agent skills
```
