---
name: github-workflow
description: Standardized process for linting, formatting, and committing changes following the Angular convention.
---

## What I do
- Validate code changes with `pnpm lint`.
- Automatically fix formatting with `pnpm format`.
- Prepare semantic commit messages.
- Safely push changes to the repository.

## Commit Format
`<type>(<scope>): <subject>`

- **Types**: `feat`, `fix`, `perf`, `build`, `ci`, `docs`, `style`, `refactor`, `test`.
- **Subject**: Imperative, present tense, no capitalization of first letter, no period at end.
- **Body**: Motivation for change (min 20 chars).
- **Footer**: Reference issues (`Closes #123`) or `BREAKING CHANGE:`.

## Steps
1. Run `pnpm lint`. If it fails, run `pnpm format` and retry.
2. Stage files: `git add .`.
3. Create commit: `git commit -m "..." -m "..."`.
4. Push: `git push`.
