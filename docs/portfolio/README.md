# Monofly Web UI Kit

Interactive personal brand website prototype built on the Monofly design system.

## What's included

| File | Description |
|---|---|
| `index.html` | Main interactive prototype — click-through Home / Work / Writing / About |
| `Nav.jsx` | Top navigation bar (light + dark variants, active states) |
| `Hero.jsx` | Hero section with headline, subhead, CTAs, stats row |
| `Cards.jsx` | Work grid cards + Writing list rows |
| `Footer.jsx` | Site footer with navigation columns |

## Usage in a prototype

Load the components in order after React + Babel:

```html
<script type="text/babel" src="Nav.jsx"></script>
<script type="text/babel" src="Hero.jsx"></script>
<script type="text/babel" src="Cards.jsx"></script>
<script type="text/babel" src="Footer.jsx"></script>
```

Each component exports itself to `window` (e.g. `window.Nav`, `window.Hero`).

## Design decisions

- **Grid system:** CSS Grid with `auto-fill / minmax(260px, 1fr)` for responsive work cards
- **Nav:** Fixed, `backdrop-filter: blur(8px)` frosted glass — supports light and dark variants
- **Cards:** `1px solid #e6e6e6` border, `border-radius: 10px`, subtle shadow with hover lift
- **Typography:** Inter throughout; no custom font loading beyond Google Fonts CDN
- **Color:** All colors use CSS custom properties from `../../colors_and_type.css`
- **Interactions:** Page navigation persists via `localStorage`

## Tweaks

Open the Tweaks panel (toolbar) to adjust:
- **Brand accent color** — swap the primary button/link color (Mono Black, Blue, Violet, Red, Green)
- **Nav style** — toggle between light frosted and dark frosted navigation
- **Compact spacing** — tighter layout density

## Extending

To add a new page:
1. Create a new JSX file (e.g. `Newsletter.jsx`) exporting to `window.Newsletter`
2. Add `'Newsletter'` to the nav links array in `index.html`
3. Add `{page === 'Newsletter' && <Newsletter />}` in the page switch

To theme with a real brand color, update `--brand-*` in `../../colors_and_type.css`.
