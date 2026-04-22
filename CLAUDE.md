# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

`monofly-sds` is a React + TypeScript design system ("SDS") wired to Figma via [Code Connect](https://github.com/figma/code-connect). It is built on React Aria Components for accessibility. Design tokens, icons, and component-to-Figma mappings are synced from a Figma file — not hand-authored — so most changes to tokens or icons should come from re-running a sync script, not editing output files directly.

## Commands

- `npm run app:dev` — Vite dev server on [localhost:8000](http://localhost:8000) rendering `src/App.tsx`.
- `npm run storybook` — Storybook on [localhost:6006](http://localhost:6006) (stories come from `src/stories/**/*.stories.tsx`).
- `npm run app:build` — Runs `tsc` (type-check only, `noEmit`) then `vite build`. TS errors fail the build; this is the closest thing to a test suite in this repo.
- `npm run app:lint` — ESLint with `--max-warnings 0`.
- `npm run storybook:build` — Static Storybook into `dist/storybook`.
- `npm run build` — App build, then Storybook build.
- `npm run app:preview` — Preview the production `vite build` output.

### Figma sync scripts
All read `.env` via `node --env-file=../../.env`. Require `FIGMA_ACCESS_TOKEN` and `FIGMA_FILE_KEY` in `.env` (see README for scopes).

- `npm run script:tokens:rest` — Pulls variables/styles from Figma, regenerates `src/theme.css` and `scripts/tokens/tokensCodeSyntaxes.js`. The `:rest` variant uses the Figma REST API; the plain `script:tokens` variant reads pre-fetched JSON from `scripts/tokens/{styles,tokens}.json` (useful when you lack Variables REST API scope).
- `npm run script:icons:rest` — Regenerates `src/ui/icons/*` and `src/figma/icons/Icons.figma.tsx`.
- `npm run script:dev-resources` — Pushes dev resources defined in `scripts/dev-resources/devResources.mjs` to Figma (requires `Dev Resources: Write` scope).

There is no unit test runner configured.

## Architecture

### Source layout

- `src/App.tsx` — minimal demo shell. Currently renders `LinksPage` wrapped in `AllProviders`.
- `src/ui/` — the design system itself:
  - `primitives/` — atomic components (Button, Input, Dialog, Table, …). These correspond 1:1 to Figma components.
  - `compositions/` — pre-built assemblies (Cards, Forms, Headers, Footers, Sections).
  - `templates/` — page-level starters (AppShellTemplate, AuthTemplate, MarketingTemplate) that stack compositions.
  - `layout/` — `Flex`, `Grid`, `Section`. These have **no** Figma equivalent — they are the preferred way to position anything.
  - `hooks/` — UI hooks (`useMediaQuery`).
  - `icons/` — **generated** by `scripts/icons`. Do not hand-edit.
  - `images/`, `utils/` — supporting assets/helpers.
- `src/data/` — app state layer (contexts, providers, services, types, data hooks: `useAuth`, `usePricing`, `useProducts`). `AllProviders` composes them all. This is app-layer code, not part of the design system — keep UI free of business logic.
- `src/figma/` — Code Connect definitions (`*.figma.tsx`) mapping each primitive/composition/icon to its Figma node. These drive what the Figma Dev Mode panel shows to developers. `Icons.figma.tsx` is generated.
- `src/stories/` — Storybook stories, mirroring the `src/ui/` categories plus `_welcome`.
- `src/pages/` — full page examples (`HomePage`, `LinksPage`, `TemplatesPage`) used by the demo app.
- `src/examples/` — reusable example sections (`Demo`, `PricingGrid`, `ProductGrid`, `Linkinbio-*`, …) composed inside pages and stories.
- `src/theme.css` — **generated** CSS variables (design tokens) from Figma. Do not hand-edit.
- `examples/` (repo root, not under `src/`) — standalone HTML templates for quick visual review without Storybook.
- `docs/` — static HTML docs/prototypes (`links.html`, `layouts/`, `web/`) not part of the app build.
- `scripts/` — Figma sync tooling (see commands above).

### Path aliases (critical)

Aliases are declared in **three places** and must stay in sync when added:

1. `vite.config.ts` → `resolve.alias` (app + scripts).
2. `tsconfig.json` → `compilerOptions.paths` with `baseUrl: ./src`.
3. `.storybook/main.tsx` → `viteFinal` overrides (Storybook has a separate Vite config and must redeclare aliases).

Current aliases: `data`, `examples`, `pages`, `compositions`, `hooks`, `icons`, `images`, `layout`, `primitives`, `templates`, `utils` (plus `providers` in Storybook only). Import as bare specifiers — e.g. `import { Flex } from "layout"` — not relative paths.

### Figma ↔ Code Connect wiring

- `figma.config.json` holds `documentUrlSubstitutions` like `<FIGMA_PRIMITIVES_BUTTON>` → a concrete Figma URL. Every `figma.connect(...)` call in `src/figma/` references these tokens instead of raw URLs, so pointing the repo at a duplicated Figma file only requires editing the file keys in `figma.config.json`.
- Token naming convention for substitutions: `<FIGMA_[PAGE_NAME]_[COMPONENT_NAME]>`.
- `npx figma connect publish` uploads the mappings after the file keys are correct.

## Working rules (from `.cursor/rules/usage-guidelines.mdc` and `.github/copilot-instructions.md`)

- **Never hardcode colors, spacing, typography, radii, or shadows.** Always use `var(--sds-color-*)`, `var(--sds-size-space-*)`, `var(--sds-typography-*)`, `var(--sds-size-radius-*)`, `var(--sds-effects-shadows-*)` from `src/theme.css`. These variable names map numerically to component props (e.g. `<Section padding="400">` == `padding: var(--sds-size-space-400)`).
- **Never import from `@react-aria`, `@react-stately`, or other upstream libraries directly.** Use SDS components from `primitives`, `compositions`, `layout`.
- **Never write custom Grid/Flexbox CSS for positioning.** Use `Flex`, `Grid`, or `Section` with their props.
- **Prefer composing primitives** over creating new components. Read the TypeScript file to confirm prop names before using (e.g. `isSelected` — not `active` — on `NavigationPill`; variants use `variant="primary"`, not `"Primary"`).
- When responding to Figma MCP output, respect `data-content-annotations` / `data-interaction-annotations` on returned nodes; they carry designer intent that is not otherwise encoded.
- Treat `hidden={true}` nodes from Figma MCP as ignorable — they only exist to back toggleable props.

## Prettier/ESLint notes

- Prettier config lives in `package.json` and uses `prettier-plugin-organize-imports` — expect your imports to be reordered on format.
- Two ESLint configs exist: `.eslintrc.cjs` (TypeScript-project-aware, the one `npm run app:lint` runs via `--ext ts,tsx`) and a stub `.eslintrc.json`. Changes should go in `.eslintrc.cjs`.

## Known repo state

- The root `README.md` currently contains unresolved Git merge conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`) in the Structure/Templates sections. Be aware when reading it and flag before editing around those regions.
