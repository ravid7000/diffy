# Diffy

Compare two text files, resolve changes hunk by hunk, and export the merged result.

## Features

- Paste, upload, or drop source and destination files
- Side-by-side diff with inline highlights and added/removed/modified counts
- Per-hunk accept/reject with an editable final buffer (Monaco)
- Format code in any panel (JSON, HTML, YAML, JS/TS, CSS via Prettier)
- Copy or download the merged output
- Light/dark theme, session saved in local storage

## Develop

Requires pnpm 12.

```sh
pnpm install
pnpm dev          # start dev server
pnpm test         # unit tests
pnpm test:e2e     # Playwright e2e
pnpm check        # format, lint, type-check
pnpm build        # production build
```
