# Mithril Design System

A token package for the desktop design language used by Kotoba Desktop. It provides the existing 12 theme palettes as CSS custom properties, plus shared radius, motion, and typography tokens. It is a token layer; it does not ship UI components.

## Use the CSS

Import `resources/design-system.css`, then set a theme on an ancestor:

```html
<div data-theme="dark">…</div>
```

Supported themes: `dark`, `light`, `dracula`, `nord`, `one-dark`, `github-dark`, `monokai`, `solarized-dark`, `gruvbox-dark`, `tokyo-night`, `github-light`, and `solarized-light`.

Set `data-radius="none"` on the root element to square the four radius tokens. Typography uses the desktop's Cairo / Manrope system stack and numeric display uses Space Grotesk, with fallbacks when bundled fonts are unavailable.

The Clojure/ClojureScript source of truth is `src/mithril/design_system/tokens.cljc`. `resources/design-system.css` is the browser-ready distribution. `themes` and `theme-css` expose the palettes and one-theme CSS; `stylesheet` emits the complete stylesheet.

The stylesheet includes the scoped onboarding palette and shared settings-toggle motion tokens. Regenerate the checked-in CSS distribution after token edits with:

```sh
clj -M -e '(require (quote [mithril.design-system.tokens :as tokens])) (spit "resources/design-system.css" (tokens/stylesheet))'
```

## Provenance

The initial palettes are transcribed from [`cloud-kotoba/org-hermesone-hermes-desktop`](https://github.com/cloud-kotoba/org-hermesone-hermes-desktop), `src/renderer/src/assets/main.css` and `src/renderer/src/constants.ts`, at source commit `344659c3bf14922174e8ae355af151eb627aeba3`. The source app is MIT licensed; see [NOTICE.md](NOTICE.md) and [LICENSE](LICENSE).
