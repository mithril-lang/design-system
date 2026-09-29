# Mithril Design System

A scoped token and CSS-primitives package shared by Mithril desktop and web surfaces. It provides the existing 12 Kotoba Desktop theme palettes plus the Mithril Console shell introduced by the React web app. The package deliberately avoids global element styling so products can migrate one surface at a time.

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

## Use the React web-console foundation

Install this repository as `@mithril/design-system`, import `@mithril/design-system/web-console.css`, and opt a shell into the scope:

```tsx
<div data-mithril-design-system="web-console" data-theme="dark">
  <aside className="mithril-console-sidebar">…</aside>
  <section className="mithril-console-card">…</section>
  <input className="mithril-console-field" />
</div>
```

The web scope exposes the semantic variables `--background`, `--foreground`, `--muted`, `--muted-foreground`, `--primary`, `--primary-foreground`, `--border`, `--destructive`, `--success`, and `--radius`. Supported web themes are `dark` and `light`; omitting `data-theme` safely defaults only the scoped shell to dark.

The CSS primitives provide visual treatment, not React behavior. Product-owned React components such as navigation, session handling, dialogs, and forms remain in the consuming app. This keeps browser code, accessibility behavior, and APIs versioned with the product while colors and surface treatments stay common.

Regenerate the web distribution with:

```sh
clj -M -e '(require (quote [mithril.design-system.tokens :as tokens])) (spit "resources/web-console.css" (tokens/web-console-stylesheet))'
```

Run `clj -M:test` to verify both checked-in CSS distributions still match their Clojure source.

## Provenance

The initial palettes are transcribed from [`cloud-kotoba/org-hermesone-hermes-desktop`](https://github.com/cloud-kotoba/org-hermesone-hermes-desktop), `src/renderer/src/assets/main.css` and `src/renderer/src/constants.ts`, at source commit `344659c3bf14922174e8ae355af151eb627aeba3`. The source app is MIT licensed; see [NOTICE.md](NOTICE.md) and [LICENSE](LICENSE).
