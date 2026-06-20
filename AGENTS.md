# AGENTS.md

## Project Overview

AutoDoc.ai is an AI-powered documentation generator. A React/Vite frontend talks to two backends:
- **Vite dev middleware** serves `/api/generate-readme` and `/api/job-status` (imported directly into `vite.config.js`)
- **Express backend** (`api/server.js`) serves `/api/auth/*` on port 5000, proxied by Vite

## Dev Commands

```bash
npm install          # install root deps (frontend + shared)
cd api && npm install  # install backend deps separately
npm run dev          # start Vite frontend on :3000 (includes generate-readme middleware)
cd api && npm run dev  # start Express backend on :5000 (nodemon)
npm test             # vitest run (from root)
npm run build        # vite production build
```

**Single test file:** `npx vitest run src/utils/authErrors.test.js`

## Two Package Roots

- `/` — React 18 + Vite frontend, Vitest, commitlint, husky
- `/api/` — Express 4 + MongoDB backend, separate `node_modules`

These have **independent dependencies** and different Express versions (root uses Express 5.2, api uses Express 4.18). Keep this in mind when editing server code — the root `vite.config.js` middleware is NOT Express 4.

## Environment

Copy `.env.example` to `.env`. Required vars:
- `LLM_PROVIDER` + provider-specific keys (or use OpenRouter as a single-key fallback)
- `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` (client-side, prefixed `VITE_`)
- `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` (server-side)
- `GITHUB_TOKEN` for repo analysis

The Vite config loads env and passes it to the generate-readme middleware.

## Testing

Tests are co-located with source (e.g., `authErrors.test.js` next to `authErrors.js`). Uses Vitest with `vi.fn()` mocks. API tests mock `fetch` globally. No test config file — relies on Vite defaults.

## Commit Conventions

Conventional Commits enforced via commitlint + husky. Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`. Subject max 72 chars, lowercase, imperative mood.

## Skills

| Skill | Use Case in This Repo |
|---|---|
| `api-patterns` | Design and review `/api/generate-readme` and `/api/auth/*` endpoints — REST structure, response formats, versioning, rate limiting |
| `conventional-commit` | Generate commit messages conforming to the commitlint config enforced by husky |
| `seo-audit` | Audit SEO health of the React frontend — meta tags, Core Web Vitals, indexing, on-page issues |
| `vercel-composition-patterns` | Refactor frontend components in `src/` — compound components, render props, avoiding boolean prop bloat |
| `wcag-audit-patterns` | Audit and remediate accessibility (WCAG 2.2) issues in the React UI |

## Key Gotchas

- The generate-readme handler in `vite.config.js` imports `api/generate-readme.js` directly into the Vite plugin — it runs in the Vite dev server process, not the Express backend
- `api/` has its own `package.json` — run `npm install` there separately
- Frontend routes are protected via `ProtectedRoute` component wrapping auth-gated pages in `App.jsx`
- All ESM (`"type": "module"` everywhere) — no CommonJS
