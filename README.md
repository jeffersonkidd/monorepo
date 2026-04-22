# MonoFly SDS Monorepo

MonoFly SDS is a **design-system monorepo** focused on bridging design and implementation with:

- React UI primitives
- reusable compositions
- high-level page templates
- Figma Code Connect mappings
- automation scripts for tokens, icons, and metadata

This repository is built to support teams that need a practical, implementation-first design system with clear paths from Figma to production code.

---

## What’s in this repo

### UI layers

- **Primitives** (`src/ui/primitives`)  
  Core building blocks (buttons, inputs, text, navigation, table, etc.).
- **Layout** (`src/ui/layout`)  
  Structural helpers for spacing and responsive composition (e.g., `Section`, `Flex`, `Grid`).
- **Compositions** (`src/ui/compositions`)  
  Mid-level assemblies (headers, footers, cards, forms, hero/panel sections).
- **Templates** (`src/ui/templates`)  
  Page-level, app-scale patterns:
  - `AppShellTemplate`
  - `AuthTemplate`
  - `MarketingTemplate`

### Data and app plumbing

- **Data contexts/providers/hooks** (`src/data`)  
  Demo data patterns for auth, products, and pricing.
- **Pages and app shell wiring** (`src/pages`, `src/App.tsx`)  
  Example app-level usage of SDS components.

### Figma integration

- **Code Connect mappings** (`src/figma`) for primitives/compositions/icons.
- **Figma config** (`figma.config.json`) with `documentUrlSubstitutions` for file-agnostic URL mapping.

### Script tooling

- `scripts/tokens` – token/style extraction and conversion
- `scripts/icons` – icon export/component generation
- `scripts/dev-resources` – dev-resource synchronization
- `scripts/component-metadata` – bulk component description workflows

### Quick static previews

- **HTML template mirrors** in `examples/` for frictionless preview without Storybook.

---

## Repository structure

```text
.
├── examples/                    # Plain HTML template mirrors
├── scripts/                     # Automation and integration scripts
├── src/
│   ├── data/                    # Demo data contexts/hooks/providers/services
│   ├── figma/                   # Figma Code Connect definitions
│   ├── pages/                   # Demo app pages
│   ├── styles/                  # Global CSS, theme, reset, responsive rules
│   ├── ui/
│   │   ├── layout/              # Layout components
│   │   ├── primitives/          # Core UI primitives
│   │   ├── compositions/        # Mid-level UI patterns
│   │   └── templates/           # High-level page templates
│   └── examples/                # React example sections/components
├── docs/                        # Built docs artifacts
├── index.html
├── vite.config.ts
└── tsconfig.json
```

---

## Getting started

### 1) Install dependencies

```bash
npm install
```

### 2) Run the app

```bash
npm run app:dev
```

- Serves the app at **http://localhost:8000**.
- Main app entrypoint: `src/App.tsx`.

### 3) Run Storybook

```bash
npm run storybook
```

- Serves Storybook at **http://localhost:6006**.

---

## Build commands

```bash
npm run app:build
npm run storybook:build
npm run build
```

`npm run build` runs both app and Storybook builds.

---

## Figma setup

1. Create a Figma API token with appropriate scopes.
2. Copy `.env-rename` to `.env`.
3. Set:
   - `FIGMA_ACCESS_TOKEN=`
   - `FIGMA_FILE_KEY=`
4. Update `figma.config.json` URLs if you are using your own duplicated Figma file.

Reference: [Figma Authentication Docs](https://www.figma.com/developers/api#authentication)

---

## Design-system workflow recommendation

1. Start with **primitives** for behavior/accessibility.
2. Build **compositions** for reusable feature sections.
3. Use **templates** for canonical page scaffolds.
4. Validate in app + Storybook.
5. Sync Figma definitions and metadata through scripts.

---

## Available templates (current)

### `AppShellTemplate`
A canonical authenticated shell: top header, navigation rail, content region, utility rail, and footer.

### `AuthTemplate`
Authentication layout with a sign-in form panel and supporting trust/benefits panel.

### `MarketingTemplate`
Launch/marketing structure with hero, feature grid, and CTA section.

Use these as starter patterns and tailor content/regions for product-specific needs.

---

## Development notes

- Path aliases are configured in `tsconfig.json` and `vite.config.ts` (e.g., `primitives`, `compositions`, `layout`, `data`).
- Storybook stories live in `src/stories` and mirror SDS layer organization.
- Built docs output is checked into `docs/`.

---

## License

MIT — see [LICENSE](./LICENSE).