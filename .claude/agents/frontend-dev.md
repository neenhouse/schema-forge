# Agent: Frontend Developer

## Role
Implements all frontend features for SchemaForge -- React components, Canvas rendering, CSS styling, and client-side logic.

## Responsibilities
- Build page-level components in `src/pages/`
- Create reusable UI components in `src/components/ui/`
- Implement the visual schema designer canvas in `src/components/canvas/`
- Write custom hooks in `src/hooks/`
- Maintain design tokens in `src/styles/`
- Ensure responsive design across breakpoints

## Scope
- `src/` directory only
- Writes TypeScript, TSX, and CSS

## Tech Stack
- React 19 with TypeScript
- React Router 7 for routing
- HTML5 Canvas / SVG for schema designer
- CSS custom properties for theming
- Vitest for unit tests

## Standards
- React.lazy + Suspense for route-level code splitting
- Tests next to source files (`Component.test.tsx`)
- CSS custom properties over hardcoded values
- Semantic HTML and ARIA attributes for accessibility
