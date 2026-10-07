# Eng handoff — Mithril brand separation (2026-10-07)

From Design, after Jun’s decision: separate mithril.fund from kotoba; publish brand canon in this repo.

## A. Expected look — `api.mithril.fund`

**Problem today:** `GET/HEAD https://api.mithril.fund/` → **301 → `https://mithril.fund/`** and returns apex marketing HTML.

**Expected:**

- Browser `GET /` on the API host must **not** serve marketing. Prefer one of:
  1. Small JSON or text landing: `{ "service": "mithril-api", "docs": "https://docs.mithril.fund/", "openapi": "…" }` with `content-type: application/json`, **200**, or
  2. Minimal monochrome docs stub linking only to docs.mithril.fund (no marketing hero, no victim CTA, no crystal LP).
- Real API routes (`/v1/…`) unchanged.
- No apex HTML body, no shared marketing CSS hash as the API document root.

Owner: **mithril eng** (Workers / route bindings). Design sign-off: no marketing chrome on api host.

## B. Expected look — `graph.mithril.fund` (signed-out)

**Problem today:** Signed-out visitors see a **full Console-style sidebar** (DOJO, ダッシュボード, リクエスト「準備中」, Orgbrain-class items, Team/チーム mix).

**Expected signed-out chrome:**

- Top bar consistent with docs/blog/support: mark + MITHRIL, links ドキュメント / ブログ / サポート / グラフDB / コンソール, language control.
- **No** Console product sidebar until authenticated.
- Main: public explorer (search, results, relationship pane) only.
- Private workspace CTAs may say “Sign in” → auth with `return_to=graph`, without exposing unfinished Console IA.
- Theme: may remain dark for the explorer canvas, but accent/lockup follow BRANDING.md (`#003f7a`, mark+wordmark).

Owner: **mithril eng** (+ Design review on PR screenshots).

## C. kotoba.cloud leakage inventory (live JS, 2026-10-07)

Replace user-facing / shipped strings. Auth host looked clean in this pass.

| Host | Asset (sample) | Patterns found | Notes / replace with |
|------|----------------|----------------|----------------------|
| mithril.fund | `assets/index-Bu8H_7WK.js` | `kotoba.cloud` (GRC schema), `app-kotoba-cloud`, `itonami`, `kc_pat_` | GRC schema id → mithril.fund schema; repo refs → mithril-lang; token docs → `mf_…` if current |
| docs.mithril.fund | `assets/index-tN4U6CIT.js` | `kotoba.cloud` ×52, `com-<name>.kotoba.cloud` ×33, `KOTOBA_API_TOKEN=kc_pat_`, `app-kotoba-cloud`, `itonami-bots` | i18n handle copy → Mithril handle; drop KOTOBA_API_TOKEN naming |
| blog.mithril.fund | `assets/index-BQbML-Mo.js` | same family as apex | same |
| support.mithril.fund | `assets/index-Dx_F4S1Y.js` | same as docs | same; also adopt `web-console` + `#003f7a` (drop make purple primary) |
| graph.mithril.fund | `assets/index-BWObb9j3.js` | same as docs | same + public chrome fix |
| app.mithril.fund | `spa/assets/index-C_aAdWR3.js` | kotoba.cloud GRC, app-kotoba-cloud, itonami | same |
| knowledge.mithril.fund | `assets/index-CDxaILV7.js` | kotoba.cloud, app-kotoba-cloud, itonami | same |
| code.mithril.fund | `workspace.js` | `kc_pat_` in secret pattern | keep pattern detection if needed; don’t document as Mithril token |
| auth.mithril.fund | — | none in this scan | — |

Raw JSON: [`kotoba-leakage-2026-10-07.json`](kotoba-leakage-2026-10-07.json). Human summary: [`kotoba-leakage-2026-10-07.md`](kotoba-leakage-2026-10-07.md).

## D. Other eng fixes (P1 from audit)

1. Load Cairo/Manrope (`@font-face` or fonts CDN) wherever the stack is declared.
2. support: add `data-mithril-design-system="web-console"`; primary accent `--accent` not `#6d4aff`.
3. Unify lockups per BRANDING.md table.
4. Apex nav: add Docs/Blog/Support (or footer-equivalent prominence) so IA matches sister hosts.
5. docs candidacy / support “chat API not wired” copy: Product call — either finish wiring or tone for production.

## E. Out of Design scope (confirmed)

- `console…/knowledge/contributions`: stays **login-required Console surface** (not public explainer).
