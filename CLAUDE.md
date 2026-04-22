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

---

# Figma MCP Integration Rules

These rules govern how to translate Figma designs into code for this repo. The Figma file is wired through Code Connect — **every Figma component has, or should have, a 1:1 SDS mapping**. The job when implementing a design is almost never "write new CSS from scratch"; it is "recognize the SDS components and tokens the designer used and assemble them."

## Design System Snapshot

### 1. Token definitions

- **Location:** `src/styles/theme.css` — generated by `scripts/tokens/app.mjs`. **Never hand-edit.** Re-run `npm run script:tokens:rest` after Figma variable changes.
- **Format:** CSS custom properties on `:root`, prefixed `--sds-*`. Light/dark are expressed via `@media (prefers-color-scheme: dark)` overrides within the same file.
- **Scales:**
  - Color primitives: `--sds-color-{hue}-{100..1000}` (e.g. `--sds-color-brand-900`, `--sds-color-red-500`).
  - Semantic colors: `--sds-color-{role}-{surface}-{emphasis}` (e.g. `--sds-color-text-default-default`, `--sds-color-background-brand-hover`, `--sds-color-icon-danger-secondary`). Prefer semantic over primitive.
  - Spacing: `--sds-size-space-{100..4000}` (100, 200, 300, 400, 600, 800, 1200, 1600, 4000).
  - Radii: `--sds-size-radius-{100..full}`.
  - Typography: `--sds-font-{role}-{scale}` (e.g. `--sds-font-body-base`, `--sds-font-title-page`) and `--sds-typography-scale-0X`.
  - Shadows: `--sds-effects-shadows-{100..500}`.
  - Strokes: `--sds-size-stroke-{border,focus-ring}`.
  - Icon sizes: `--sds-size-icon-{small,medium,large}` plus `--sds-typography-scale-0X`.
- **Prop ↔ token mapping:** numeric prop values map directly to tokens of the same number. `<Section padding="400">` emits `padding: var(--sds-size-space-400)`; `<Flex gap="200">` → `gap: var(--sds-size-space-200)`. If Figma reports a spacing of `var(--sds-size-space-600)`, pass `"600"` to the component prop.
- **Responsive tokens:** `src/styles/responsive.css` defines `--sds-responsive-*` vars that change at `600px` (tablet) and `1024px` (desktop). They back utility classes like `display-none-to-flex`/`display-flex-to-none` in `src/index.css`.
- **Global-only vars** live in `src/index.css` under the `--global-*` prefix (e.g. `--global-container-max-width`, `--global-stack-*`, `--global-focus-ring-color`). These are not synced from Figma.

### 2. Component library

- **Location:** `src/ui/` — three tiers:
  - `src/ui/primitives/` — atomic (Button, Input, Dialog, Tab, Text, …). 1:1 Figma component.
  - `src/ui/compositions/` — pre-built assemblies (`Cards/`, `Footers/`, `Forms/`, `Headers/`, `Sections/`).
  - `src/ui/templates/` — page-level shells (`AppShellTemplate`, `AuthTemplate`, `MarketingTemplate`).
  - `src/ui/layout/` — `Flex`, `Grid`, `Section`. **No Figma equivalent** — use these for every positioning concern.
- **Architecture:** React function components built on `react-aria-components`. Each component folder contains a `.tsx` file and a matching `kebab-case.css` file, e.g. `Button/Button.tsx` + `Button/button.css`. Icons are the exception — a flat folder of single-file SVG components.
- **Public API:** every category exposes a barrel `index.ts` so consumers import as `import { Button } from "primitives"`, `import { Flex, Section } from "layout"`, etc.
- **Prop conventions (hard-won, frequently mistaken):**
  - Variants are **lowercase** strings: `variant="primary"`, not `"Primary"`. Figma enum values must be lowercased in the Code Connect mapping.
  - Boolean state uses `is*`: `isSelected`, `isDisabled`, `isIndeterminate` — not `active`/`selected`/`disabled`.
  - Size/spacing props use **string** numeric tokens: `size="medium"`, `gap="400"`, `padding="1200"`.
  - Components forward refs and accept `className` + `style` in addition to typed props.
  - Never add a prop named `render` — it's already used/omitted by RAC wrappers.
- **Storybook:** `src/stories/**/*.stories.tsx` mirrors the `src/ui/` tiers (+ `_welcome/`). Run `npm run storybook` (localhost:6006). Use stories as usage references.
- **No component documentation site beyond Storybook.** There is no unit test runner — `tsc --noEmit` in `npm run app:build` is the closest thing to a test suite.

### 3. Frameworks & libraries

| Concern | Choice |
| --- | --- |
| UI framework | React 18 (`react`, `react-dom`) |
| Accessibility primitives | `react-aria-components` (v1.10) |
| Language | TypeScript 5, strict mode, `jsx: react-jsx` |
| Bundler / dev server | Vite 6 (`@vitejs/plugin-react`) |
| Component docs | Storybook 10 (`@storybook/react-vite`) |
| Design-to-code | `@figma/code-connect` |
| Icon source | `lucide-react` (used by the sync script only — do **not** import Lucide at runtime; use the generated SDS icons) |
| Animation | `motion` (present but only reach for it if the design annotates motion) |
| Class composition | `clsx` (sole allowed dependency for className juggling) |
| Linting | ESLint 8 via `.eslintrc.cjs`, `--max-warnings 0` |
| Formatting | Prettier via `package.json`, `prettier-plugin-organize-imports` reorders imports |

### 4. Asset management

- **Images** live in `src/ui/images/` and are imported as ES modules: `import { placeholder } from "images"`. They are fingerprinted by Vite at build time — no manual optimization, no CDN.
- **Background/Section images** are rendered via the SDS `<Image>` primitive, not raw `<img>`. `Section` with `variant="image"` + `src` is the canonical pattern.
- **No CDN configuration.** `base: "./"` in `vite.config.ts` → the app ships as a static bundle that assumes same-origin asset paths.
- **Demo/prototype assets** outside the build live in `docs/` and root-level `examples/` — those are not imported by the app and should not be treated as production sources.

### 5. Icon system

- **Location:** `src/ui/icons/*.tsx` — **generated** by `npm run script:icons:rest` from a Lucide pass over Figma. Flat folder, one file per icon. **Never hand-edit.**
- **Naming convention:** `Icon{PascalCase}` (e.g. `IconChevronLeft`, `IconAlertTriangle`). The Code Connect mappings live in the generated `src/figma/icons/Icons.figma.tsx`.
- **Usage:** import from the `icons` alias and render as a component. Size is a string literal.
  ```tsx
  import { IconChevronLeft, IconCheck } from "icons";
  <IconChevronLeft size="16" />
  ```
- **Internals (for reference):** every generated icon wraps the `Icon` primitive from `primitives` and embeds raw SVG paths that reference `var(--svg-stroke-color)` and `var(--svg-fill-color)`. Color is inherited from the containing element via the `--icon-color` CSS var — to recolor, set `--icon-color` on a wrapper, don't pass a color prop.
- **Do not install new icon libraries.** If an icon is missing, either re-run the sync script after adding it to Figma or — only as a last resort — add a new file matching the existing template in `src/ui/icons/`.
- **IMPORTANT:** if the Figma MCP payload provides a localhost image or SVG `src` for an icon or asset, use that `src` directly — do not invent a placeholder, do not import a different icon pack.

### 6. Styling approach

- **CSS methodology:** plain CSS files per component, imported inside the `.tsx` (`import "./button.css"`). **Not CSS Modules, not Tailwind, not styled-components, not CSS-in-JS.** Class names are globally scoped — collisions are prevented by prefixing every class with the component name (`.button`, `.button-size-small`, `.flex-align-primary-center`).
- **Class composition:** always use `clsx(...)` to build the class list. Pattern: `clsx(className, "component", condition && "component-state", `component-variant-${variant}`)`.
- **Global stylesheet chain** (entry = `src/index.css`):
  1. `styles/reset.css` — resets focusable elements and box-sizing.
  2. `styles/fonts.css` — loads Inter + Roboto Mono, declares `--font-{sans,serif,mono}`.
  3. `styles/responsive.css` — responsive tokens.
  4. `styles/theme.css` — generated design tokens. **Do not hand-edit.**
  5. `styles/icons.css` — icon sizing helpers.
- **Responsive design:** mobile-first via `@media (min-width: 600px)` (tablet) and `(min-width: 1024px)` (desktop). Prefer the `useMediaQuery()` hook (returns `{ isMobile, isTablet, isDesktop }`) for prop-level switches like `padding={isMobile ? "600" : "1600"}`. For CSS-only responsive swaps, use the `--sds-responsive-*` tokens instead of writing new media queries.
- **Dark mode** is automatic via `@media (prefers-color-scheme: dark)` inside `theme.css`. Never re-implement it at the component level.
- **No inline `style={{...}}` for design values.** Inline styles are reserved for CSS variable bindings that the component itself defines (see `Flex.tsx` setting `--flex-direction`, `--flex-align-primary`).

### 7. Project structure

```
src/
├── App.tsx              # Demo shell rendering a Page wrapped in <AllProviders>
├── main.tsx             # React root
├── index.css            # Entry stylesheet — imports styles/* in order
├── data/                # App state: contexts, providers, services, types, hooks
├── examples/            # Reusable example sections (Demo, PricingGrid, Linkinbio-*)
├── figma/               # Code Connect mappings (Figma component -> SDS component)
│   ├── primitives/
│   ├── compositions/
│   └── icons/           # Generated — do not hand-edit Icons.figma.tsx
├── pages/               # Full page examples (HomePage, LinksPage, TemplatesPage)
├── stories/             # Storybook stories (mirrors ui/ tiers)
├── styles/              # Global stylesheets + generated theme.css
└── ui/                  # Design system proper
    ├── primitives/      # Atomic: Button, Input, Dialog, Text, …
    ├── compositions/    # Cards, Forms, Headers, Footers, Sections
    ├── templates/       # AppShellTemplate, AuthTemplate, MarketingTemplate
    ├── layout/          # Flex, Grid, Section
    ├── hooks/           # useMediaQuery
    ├── icons/           # Generated SVG components
    ├── images/          # Static images imported as ES modules
    └── utils/           # Small helpers
```

- **Feature organization:** by component tier (`primitives` / `compositions` / `templates`), not by product feature. Business logic lives in `src/data/`; UI under `src/ui/` stays presentational.
- **Path aliases** (bare specifiers, never relative deep imports): `data`, `examples`, `pages`, `compositions`, `hooks`, `icons`, `images`, `layout`, `primitives`, `templates`, `utils`. Declared in three places — `vite.config.ts`, `tsconfig.json`, `.storybook/main.tsx` — and must stay in sync.

---

## Required Figma MCP Workflow

**Follow in order. Do not skip steps.**

1. **`get_design_context`** on the target node first. The response is React + Tailwind — treat it as a faithful representation of *structure and behavior*, **never as final code style for this repo**.
2. If the response is truncated or too large, call **`get_metadata`** to see the node map, then re-fetch only the specific child nodes you need with `get_design_context`.
3. **`get_screenshot`** on the same node for a visual reference. Do not start implementation without both.
4. **Inspect the `codeDependencies` / Code Connect snippets** in the response — they tell you which SDS component to use. If Code Connect suggests `<Button variant="primary">`, use that; do not re-derive it from raw CSS.
5. **Download or reference any MCP-served assets directly** — localhost image/SVG URLs from the MCP server are the source of truth; do not substitute placeholders.
6. **Translate into SDS**, replacing Tailwind utilities with SDS primitives, layout components, and CSS variables (see the translation rules below).
7. **Validate** the rendered output against the screenshot at 1:1 fidelity (spacing, radius, color, typography, states). For interactive changes, exercise the golden path in `npm run app:dev` or Storybook.

## Implementation Rules

- **IMPORTANT: Never hardcode colors, spacing, typography, radii, or shadows.** Use `var(--sds-color-*)`, `var(--sds-size-space-*)`, `var(--sds-font-*)` / `var(--sds-typography-*)`, `var(--sds-size-radius-*)`, `var(--sds-effects-shadows-*)`. If Figma returns a raw hex, look it up in `src/styles/theme.css` and map it to a semantic token.
- **IMPORTANT: Never import from `@react-aria-components`, `@react-aria/*`, or `@react-stately/*` directly.** Use the SDS re-exports from `primitives`, `compositions`, `layout`.
- **IMPORTANT: Never write custom Grid/Flexbox CSS for positioning.** Use `Flex`, `Grid`, or `Section` with their props. Tailwind classes in the MCP output (`flex`, `grid`, `gap-4`, `grid-cols-3`, `p-4`, `items-center`) map to:
  - `flex items-center gap-4` → `<Flex alignSecondary="center" gap="400">`
  - `grid grid-cols-3 gap-6` → `<Flex direction="row" gap="600" type="third">` (or `<Grid>` if Flex can't express it)
  - `p-6` on a section → `<Section padding="600">`
- **IMPORTANT: Never install a new icon pack or component library.** If the icon isn't in `src/ui/icons/`, re-run the icon sync; if a component is missing, compose it from existing primitives.
- **Prefer composition over new components.** Before adding a file to `primitives/` or `compositions/`, check whether existing pieces can compose the design.
- **Read the TypeScript file before using a component.** Prop names are specific: `isSelected` (Navigation), `variant="primary"` (lowercased), `size="medium"`, `align="center"` on ButtonGroup, `direction="row"` on Flex. Guessing props will fail silently in runtime.
- **Respect annotations.** Figma MCP payloads carry `data-content-annotations` and `data-interaction-annotations` — these encode designer intent (dynamic copy, disabled states, conditional pills) that is not derivable from the visuals. Always honor them.
- **`hidden={true}` nodes are ignorable.** They exist to back toggle props; do not render them.
- **Business logic stays in `src/data/`.** `src/ui/` must remain presentational. Fetch via `useAuth`, `usePricing`, `useProducts` from `data`; don't inline `fetch`/`useEffect` inside primitives.
- **Do not amend `src/styles/theme.css`, `src/ui/icons/*`, or `src/figma/icons/Icons.figma.tsx`.** Rerun the sync scripts instead.

## Code Connect wiring

- Every `figma.connect(...)` call in `src/figma/**` references a substitution token from `figma.config.json` — e.g. `"<FIGMA_BUTTONS_BUTTON>"` — not a raw URL. To repoint at a duplicated Figma file, edit the URLs in `figma.config.json`; don't edit individual `.figma.tsx` files.
- Token naming convention: `<FIGMA_{PAGE_NAME}_{COMPONENT_NAME}>`.
- Figma enum props are mapped to lowercased string values (`Primary` → `"primary"`) in the Code Connect definition. Mirror this in new mappings.
- Publish with `npx figma connect publish` after updating mappings.

## Common translation patterns

### Button
```tsx
// Figma: Button variant=Primary, size=Medium, icon trailing
import { Button } from "primitives";
import { IconArrowRight } from "icons";

<Button variant="primary" size="medium">
  Continue
  <IconArrowRight size="16" />
</Button>
```

### Section with grid of cards
```tsx
// Figma: Section padding 1200 containing 3 equal cards
import { Flex, Section } from "layout";
import { Card } from "compositions";

<Section padding="1200" variant="neutral">
  <Flex direction="row" gap="600" type="third" container>
    {items.map((item) => <Card key={item.id} {...item} />)}
  </Flex>
</Section>
```

### Responsive switch
```tsx
import { useMediaQuery } from "hooks";
import { Flex, Section } from "layout";

const { isMobile } = useMediaQuery();

<Section padding={isMobile ? "600" : "1600"}>
  <Flex direction={isMobile ? "column" : "row"} gap={isMobile ? "600" : "1200"} type="third">
    {children}
  </Flex>
</Section>
```

### Custom element styling (when you must write CSS)
```tsx
// Component.tsx
import "./component.css";
import clsx from "clsx";
<div className={clsx("feature-card", variant && `feature-card-variant-${variant}`)} />
```
```css
/* component.css */
.feature-card {
  background: var(--sds-color-background-default-default);
  color: var(--sds-color-text-default-default);
  padding: var(--sds-size-space-400);
  border-radius: var(--sds-size-radius-200);
  box-shadow: var(--sds-effects-shadows-200);
}
```

## Common pitfalls

- `<div className="grid grid-cols-3 gap-4">` ← **WRONG.** Use `<Flex type="third" gap="400">`.
- `style={{ padding: 16, color: "#111" }}` ← **WRONG.** Use `className` + token vars, or a Section/Flex prop.
- `<Button variant="Primary">` ← **WRONG.** Variants are lowercase: `variant="primary"`.
- `<NavigationPill active>` ← **WRONG.** Use `isSelected`.
- `import { Button } from "react-aria-components"` ← **WRONG.** Use `import { Button } from "primitives"`.
- Editing `src/styles/theme.css` or `src/ui/icons/IconFoo.tsx` by hand ← **WRONG.** These are generated.
- Adding a path alias in `vite.config.ts` but forgetting `tsconfig.json` or `.storybook/main.tsx` ← **breaks Storybook or `tsc` silently.** Always update all three.

---

### FYI Claude

```
⏺ Bash(npm view lodash@latest version 2>&1 && echo "---" && npm audit 2>&1 | head -30)                                                                                            
  ⎿  4.18.1                                                                                                                                                                       
     ---                                                                                                                                                                          
     # npm audit report                                                                                                                                                           
     … +16 lines (ctrl+o to expand)                                                                                                                                               
                                                                                                                                                                                  
⏺ Findings:                                                                                                                                                                       
                                                                                                                                                                                  
  - Upgrading won't help. Latest is @figma/code-connect@1.4.3 (we're on 1.3.10), and 1.4.3 still pins lodash: '4.17.23' exactly — the same vulnerable version.                    
  - npm audit fix --force downgrades to 1.3.5 — misses 8 point releases + the whole 1.4.x line. Not worth it.                                                                     
  - Clean non-disruptive fix: add an overrides entry to package.json forcing the transitive lodash up to ^4.18.1 (the latest, which Snyk/GitHub consider patched).                
  @figma/code-connect uses lodash internally but there's no API-level reason the 4.17→4.18 minor bump would break it.                                                             
                                                                                                                                                                                  
  Recommendation — add this to package.json:                                                                                                                                      
                                                                                                                                                                                  
  "overrides": {                                                                                                                                                                  
    "@figma/code-connect": {
      "lodash": "^4.18.1"
    }
  }

  Then rm -rf node_modules package-lock.json && npm install && npm audit to confirm it clears.                                                                                    
   
  Want me to make that edit, or hold off?    
  ```