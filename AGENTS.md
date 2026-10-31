# AGENTS.md

Server Mono is a typeface. This repository holds its font files and the Next.js App Router website. See [README.md](README.md) for font usage and local setup.

## Source

- `app/`: routes, metadata, manifest, robots and sitemap
- `components/`: site components, including `MarketingServerMono.tsx`
- `system/`: reusable UI, layouts, D3 graphs and icons
- `common/`, `modules/`: shared utilities and server helpers
- `global.scss`, `animations.scss`, `*.module.scss`: styles
- `fonts/ServerMono.glyphs`: font source
- `public/fonts/`: shipped fonts, which `.github/workflows/release.yml` publishes
- `server-mono.css`: CDN stylesheet, duplicated in the README's CDN example

## Conventions

- Use the import aliases in `tsconfig.json`, such as `@system/*` and `@common/*`.
- Match `.prettierrc`. Prettier and a linter are not installed, and `next lint` no longer exists.
- Keep `package-lock.json`: `npm audit` and CI's `npm clean-install` both need it.
- TypeScript 7 has no JavaScript compiler API. `next build` uses the local `tsc`, but `ts-node` cannot run.
- `next dev` and `next build` regenerate the tracked `next-env.d.ts`.

## Verification

There is no test suite.

- `npm run build`: production build and type check
- `npx tsc --noEmit --incremental false`: type check only, without leaving `tsconfig.tsbuildinfo` behind
- `npm audit` and `npm outdated`: dependency health
- `npm run dev`: local site on port 10000

## Skills

This repository has no skills yet. If you add one, confirm its location with the owner first, then keep it to one workflow in a `SKILL.md`.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
