# SchemaForge -- Root CLAUDE.md

Database schema management platform. Visual schema designer, migration auto-generation, cross-database compatibility checker, index optimization advisor, migration rehearsal, version history, and team review workflow.

## Documentation Hierarchy

```
CLAUDE.md                  (this file -- root authority, tech stack, commands, team)
  .claude/CLAUDE.md        (agent instructions, conventions, project structure)
  docs/vision.md           (north star vision and design principles)
  docs/prd.md              (product requirements -- 8 core features)
  docs/specs/              (technical specifications)
  docs/prds/               (additional PRDs)
  docs/research/           (research and exploration notes)
```

When documents conflict, resolve by walking up the chain.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, TypeScript, Vite 8, React Router 7 |
| Styling | CSS custom properties (design system tokens) |
| Canvas | HTML5 Canvas / SVG for visual schema designer |
| Backend | Cloudflare Workers (API routes, AI-powered optimization) |
| Storage | Cloudflare D1 (SQL), KV (schema versions) |
| Realtime | Durable Objects (team review sessions) |
| Deploy | Cloudflare Pages via GitHub Actions |
| Testing | Vitest + React Testing Library |
| Tooling | pnpm (package manager), mise (runtime versions) |

## Dev Commands

```bash
pnpm dev           # Start dev server (port 3000)
pnpm build         # TypeScript check + Vite production build
pnpm test          # Run Vitest
pnpm test:watch    # Run Vitest in watch mode
pnpm lint          # ESLint
pnpm lint:fix      # ESLint with auto-fix
pnpm format        # Prettier
pnpm analyze       # Bundle visualizer
pnpm deploy        # Build + deploy to Cloudflare Pages
```

## Conventions

- Use **pnpm** as package manager (never npm or yarn)
- Use **mise** for runtime versions (see `.mise.toml`)
- CSS custom properties for theming (defined in `src/styles/tokens.css`)
- React Router for client-side routing
- React.lazy + Suspense for route-level code splitting
- Tests live next to source files (`Component.test.tsx`)
- All API routes go in `worker/routes/`

## Agent Team Roles

Six agents defined in `.claude/agents/`:

| Agent | Role | Scope | Writes Code |
|-------|------|-------|-------------|
| `ceo` | Strategic leadership, vision, priorities | Strategy docs | No |
| `team-lead` | Orchestrator -- decomposes, delegates, monitors | Task management | No |
| `frontend-dev` | React, Canvas, CSS, components, pages | `src/` | Yes |
| `backend-dev` | Cloudflare Workers, APIs, D1, Durable Objects | `worker/` | Yes |
| `content-writer` | Copy, messaging, SEO, meta tags | Text content | No |
| `qa` | Testing, accessibility, performance | Tests + read-only | Yes (tests) |

## Single Source of Truth

| Concern | Source File |
|---------|------------|
| Vision and design principles | `docs/vision.md` |
| Product requirements | `docs/prd.md` |
| Runtime versions | `.mise.toml` |
| CSS design tokens (live) | `src/styles/tokens.css` |

## Project Structure

```
src/
  pages/              Route-level components
  components/
    ui/               Reusable UI (buttons, inputs, modals)
    canvas/           Schema designer canvas components
    sections/         Page sections
  hooks/              Custom React hooks
  lib/                Utilities, types, helpers
  styles/             Global CSS and design tokens
worker/
  routes/             API endpoints
  durable-objects/    Real-time collaboration (ReviewSession)
docs/
  specs/              Technical specifications
  prds/               Additional PRDs
  research/           Research and exploration notes
public/
  icons/              App icons
.claude/
  agents/             Agent role definitions
.github/
  workflows/          CI/CD pipelines
```
