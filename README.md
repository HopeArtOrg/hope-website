# Hope Art Landing Page

<div align="center">
  <img src="public/logo.svg" alt="Hope Art Logo" width="120" />
  <p>Official landing page for Hope:Re</p>
</div>

## Overview

This repository contains the source code for the official landing and download site of [Hope:Re](https://github.com/HopeArtOrg/hope-re). Hope:Re is an open-source tool designed to protect artistic intellectual property by preventing AI from mimicking art styles through invisible adversarial perturbations.

## Technical Stack

The site is built with a focus on performance, minimalism, and a Zen-inspired design aesthetic.

- **Framework:** Astro 6 (Static Site Generation)
- **UI Components:** Svelte 5 (Runes)
- **Styling:** UnoCSS with Wind4 preset and custom Zen theme
- **Animations:** GSAP with ScrollTrigger
- **OG Images:** Dynamic generation using @takumi-rs/image-response
- **Internationalization:** Built-in i18n supporting English and Vietnamese

### Why this stack?

- **Astro:** Provides the fastest possible load times by shipping zero client-side JavaScript by default.
- **Svelte 5:** The Runes API offers a reactive and declarative way to build complex UI components with minimal boilerplate.
- **UnoCSS:** An ultra-fast atomic CSS engine that allows for precise, Zen-like styling without the overhead of traditional frameworks.
- **GSAP:** Enables smooth, high-performance animations that enhance the artistic feel of the site.

## Local Development

Ensure you have [pnpm](https://pnpm.io/) installed on your system.

### Installation

```bash
pnpm install
```

### Start Development Server

```bash
pnpm dev
```

The site will be available at `http://localhost:3000`.

### Build for Production

```bash
pnpm build
```

The static output will be generated in the `dist/` directory.

## Internationalization

Translations are managed via JSON files in the `src/i18n/` directory:

- `en.json`: English
- `vn.json`: Vietnamese (Default)

## Architecture

- `src/components/`: Modular Svelte and Astro components
- `src/layouts/`: Base layout templates
- `src/pages/`: File-based routing for localized content
- `src/lib/`: Shared utilities and constants
- `src/styles/`: Global styles and Shiki configurations

## License

This project is released under the MIT License.
