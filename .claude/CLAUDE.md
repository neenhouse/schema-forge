# SchemaForge -- Agent Instructions

Database schema management platform built with React 19, TypeScript, Vite, and Cloudflare Workers.

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite 8, React Router 7
- **Backend**: Cloudflare Workers, D1, KV, Durable Objects
- **Styling**: CSS custom properties (design system tokens)
- **Canvas**: HTML5 Canvas / SVG for visual schema designer
- **Testing**: Vitest + React Testing Library
- **Deploy**: Cloudflare Pages via GitHub Actions

## Project Structure

```
src/
  pages/              Route-level components
  components/
    ui/               Reusable UI
    canvas/           Schema designer canvas
    sections/         Page sections
  hooks/              Custom React hooks
  lib/                Utilities and types
  styles/             Global CSS and tokens
worker/
  routes/             API endpoints
  durable-objects/    Real-time collaboration
```

## Commands

- `pnpm dev` -- Start dev server (port 3000)
- `pnpm build` -- TypeScript check + Vite production build
- `pnpm test` -- Run Vitest
- `pnpm lint` -- ESLint
- `pnpm format` -- Prettier

## Conventions

- Use **pnpm** as package manager
- Use **mise** for tool versions (see `.mise.toml`)
- CSS custom properties for theming
- React Router for client-side routing
- React.lazy + Suspense for route-level code splitting
- Tests live next to source files (`Component.test.tsx`)

## Agent Team

Agent definitions live in `.claude/agents/`. This project uses a 6-agent team:

| Agent | Role | Scope |
|-------|------|-------|
| `ceo` | Strategic leadership, vision | Strategy docs |
| `team-lead` | Orchestrator -- decomposes, delegates | No code changes |
| `frontend-dev` | React, Canvas, CSS, components | `src/` |
| `backend-dev` | Workers, APIs, D1, Durable Objects | `worker/` |
| `content-writer` | Copy, messaging, SEO | Text content only |
| `qa` | Testing, accessibility, performance | Tests + read-only |
