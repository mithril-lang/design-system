# Mithril branding (canonical)

**Product:** mithril.fund (Kotoba Labs Inc.)  
**Design system package:** `@mithril/design-system` — this repository  
**Decision (2026-10-07):** Mithril and kotoba are operated separately. Do not mix brand, tokens, copy, or identity strings.

## Logo lockup (one system)

Canonical mark file: `resources/mithril-mark.svg` (crystal on dark rounded square; crystal fill `#9db7f9`).

| Element | Rule |
|--------|------|
| Mark | Always `mithril-mark.svg` from this package. No inline redraws, no period after the mark alone. |
| Wordmark | `MITHRIL` — all caps, tracking as on apex (letter-spacing consistent with marketing). **No trailing period.** |
| Case | Never title-case `Mithril` in the chrome lockup. Product prose may say “Mithril” in sentence case. |
| Combo | Mark + wordmark on marketing, docs, blog, support, graph public chrome, console chrome, auth. |
| Clear space | Keep ≥ 0.25× mark height around the combo. |
| On dark | Mark as bundled (already dark tile). On light, same asset. |
| Forbidden | `MITHRIL.` · plain text-only “Mithril” in chrome · crystal without the square tile · kotoba marks · DADS / `dads-*` classes on Mithril surfaces |

### Host migration (from 2026-10-07 audit)

| Host | Current (wrong/variant) | Target |
|------|-------------------------|--------|
| mithril.fund, blog | mark + MITHRIL | keep as reference |
| docs, support, graph | wordmark only | add mark |
| auth | `MITHRIL.` + different spacing | mark + `MITHRIL` (no period) |
| app | plain `Mithril` | mark + `MITHRIL` (or shared header component) |

Logo changes require an explicit branding request and updates to all consumers.

## Color tokens (canonical)

Source of truth: `src/mithril/design_system/tokens.cljc` → `resources/web-console.css` / `design-system.css`.

| Role | Token | Light | Dark |
|------|-------|-------|------|
| Accent / primary CTA fill | `--accent` | `#003f7a` | `#003f7a` |
| Accent hover | `--accent-hover` | `#002d58` | `#0055a4` |
| Mark crystal (SVG) | — | `#9db7f9` | `#9db7f9` |
| Highlight yellow | `--primary-yellow` | `#f5c518` | `#f5c518` |
| Page bg | `--bg-primary` | `#ffffff` | `#212121` |
| Text | `--text-primary` | `#111111` | `#ececec` |

**Do not use `#6d4aff` (`data-theme=make`) as Mithril product primary.** That purple is not part of the Mithril brand accent. Support and any host still leaning on it must move to `--accent` / `web-console`.

Editor theme accents (e.g. Dracula `#bd93f9`) stay inside optional `data-theme` editor skins — not marketing chrome.

## Typography

- UI: `"Cairo", "Manrope", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif` via `--font-sans`.
- Consumers **must** ship `@font-face` or a font CDN for Cairo/Manrope; declaring the stack without loading fonts is a bug (system fallback drift).
- Numerics (where applicable): Space Grotesk per package README.

## Surfaces

| Surface | Scope attribute | Default theme |
|---------|-----------------|---------------|
| Console / signed-in product | `data-mithril-design-system="web-console"` | `data-theme="dark"` (or omit → dark) |
| Marketing / docs / blog / support / auth card | same web-console scope | `data-theme="light"` preferred for public marketing; auth may use light card on neutral ground |
| Public graph explorer | web-console | Public chrome **must not** reuse the signed-in Console sidebar (DOJO, 準備中, Orgbrain, Team). Use a public top nav aligned with docs/blog/support. |
| Victim app (app.mithril.fund) | web-console | May stay dark for calm victim UX, but **lockup and accent must match** the canon above. |

Shared classes: see README (`mithril-console-sidebar`, `mithril-console-nav-item`, …).

## Separation from kotoba

- No kotoba wordmark, purple “make” primary, or `kotoba.cloud` URLs in Mithril UI chrome or user-facing copy.
- No `com-<name>.kotoba.cloud` handle instructions; use Mithril identity wording.
- No `kc_pat_` as the documented Mithril token prefix in user docs (prefer current Mithril token form, e.g. `mf_…`, once eng confirms).
- Provenance of *historical* token extraction may remain in NOTICE.md; that is license history, not live brand.
- Legal entity remains Kotoba Labs Inc.; that is corporate naming, not product brand mixing.

## Public brand guide

Human-readable guide for docs publishing: [`docs/brand-guide.md`](docs/brand-guide.md).
Eng implementation notes: [`docs/eng-handoff-2026-10-07.md`](docs/eng-handoff-2026-10-07.md).
