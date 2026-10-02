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

The web scope is a projection of the Mithril desktop `dark` and `light` palettes: the same `--bg-*`, `--text-*`, and `--accent` tokens, plus semantic aliases (`--background`, `--foreground`, `--muted`, `--muted-foreground`, `--primary`, `--primary-foreground`, `--border`, `--destructive`, `--success`, `--radius`) so existing web utilities follow the desktop. Omitting `data-theme` defaults only the scoped shell to dark. Surfaces are flat: sidebar, cards, fields, tables, notices, and nav items. There is no separate console palette.

The CSS entry points provide visual treatment. The React entry point below supplies shared chat behavior; navigation, session handling, dialogs, tools and transport remain in the consuming app. Shared class names are `mithril-console-sidebar`, `mithril-console-nav-item`, `mithril-console-card`, `mithril-console-metric`, `mithril-console-field`, `mithril-console-button`, `mithril-console-button-quiet`, `mithril-console-notice`, `mithril-console-table`, and `mithril-console-badge`.

Regenerate the web distribution with:

```sh
clj -M -e '(require (quote [mithril.design-system.tokens :as tokens])) (spit "resources/web-console.css" (tokens/web-console-stylesheet))'
```

Run `clj -M:test` to verify both checked-in CSS distributions still match their Clojure source.

## Provenance

The initial palettes are transcribed from [`cloud-kotoba/org-hermesone-hermes-desktop`](https://github.com/cloud-kotoba/org-hermesone-hermes-desktop), `src/renderer/src/assets/main.css` and `src/renderer/src/constants.ts`, at source commit `344659c3bf14922174e8ae355af151eb627aeba3`. The source app is MIT licensed; see [NOTICE.md](NOTICE.md) and [LICENSE](LICENSE).

## Shared React chat components

Web App and Mithril Desktop import the same implementation from
`@mithril/design-system/react`. This separate repository owns these components:

- `AgentMarkdown`: Markdown/GFM, lazy syntax highlighting, plain box diagrams,
  diff rendering, code copy and streamed code expansion.
- `ChatTextarea`: forwarded textarea ref, native textarea props, IME protection,
  Shift+Enter and Enter submission. The app keyboard handler runs first, so
  slash selection and input history can consume keys without sending.
- `ChatSubmitButton`: gated Send and always actionable Stop, using either form
  submission or an explicit native app callback.
- `ChatBubble`: role/error CSS and a slot for product-owned message content.

The React export ships compiled ESM JavaScript and TypeScript declarations.
Source and generated distribution are committed together; no install-time build
or consumer JSX configuration is required.
React and React DOM are peer dependencies; install one copy in the application.
Pin both applications to the same Git commit. Updating this repo does not change
production until the consumers update their lockfiles, pass CI and publish.

```tsx
import { AgentMarkdown, ChatTextarea, ChatSubmitButton, ChatBubble } from '@mithril/design-system/react';

<ChatBubble role="agent">
  <AgentMarkdown platform={{
    copyText: text => navigator.clipboard.writeText(text),
    labels: { copy: 'Copy code', copied: 'Copied', showMore: 'Show more', showLess: 'Show less' },
  }}>{reply}</AgentMarkdown>
</ChatBubble>
```

The `platform` adapter supplies clipboard, optional link navigation and optional
image rendering. Without a media adapter, Markdown images show alt text and
never fetch remote URLs. Links allow only HTTP, HTTPS and mailto. Desktop supplies
its IPC clipboard, preview navigation and media components; Web uses safe new
tabs and browser clipboard. Locale labels come from each application's provider.
No Electron, API, account, billing, disk or session dependencies enter this repo.
The consumer's existing chat CSS supplies styling; the Web-only scoped layout CSS
remains with Web. Expansion state belongs to one mounted Markdown renderer,
preventing one reply from expanding code in another reply.

Run `npm ci`, `npm run typecheck`, `npm run test:react` and `npm run build:react` for React changes. Commit the generated `dist/react` with its source.
Run `clj -M:test` for the existing token and CSS distribution contracts.
