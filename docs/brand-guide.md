# Mithril brand guide

Public-facing summary of the Mithril (mithril.fund) visual system.  
Canonical implementation: [`mithril-lang/design-system`](https://github.com/mithril-lang/design-system) (`@mithril/design-system`).  
Updated: 2026-10-07 (Jun decision: operate Mithril separately from kotoba).

## Who this is for

Anyone shipping UI on `*.mithril.fund`, Mithril Desktop, or apps that must look like Mithril.

## Logo

Use the crystal mark + **MITHRIL** wordmark (all caps, no trailing period).

- File: `@mithril/design-system/mithril-mark.svg`
- Do not redraw the crystal, drop the mark, or use title-case “Mithril” in the header lockup.
- Sentence-case “Mithril” is fine in body copy.

## Color

Primary accent is navy **`#003f7a`**. Backgrounds are white (marketing/docs) or near-black `#212121` (console/dark product). Crystal highlight in the mark is `#9db7f9`. Accent yellow `#f5c518` is reserved for warnings/highlights, not primary buttons.

Do not use kotoba/make purple `#6d4aff` as the Mithril primary.

## Type

Cairo and Manrope for UI. Load the fonts; do not rely on the name alone.

## Layout chrome

- **Marketing / docs / blog / support:** light theme, shared top nav: Documentation · Blog · Support · Graph · Console (localized labels OK). Apex may keep victim-first CTAs but should still link the shared destinations.
- **Auth:** light sign-in card; same lockup as marketing.
- **Console (signed-in):** dark web-console shell; sidebar is for authenticated product only.
- **Public graph:** explorer content may be dark, but signed-out visitors must **not** see Console product nav (DOJO, in-prep badges, org tools).

## Console surface note

`console.mithril.fund/knowledge/contributions` stays a **signed-in Console surface** (not a public explainer). Match Console tokens and chrome when changing that route.

## What not to ship

- kotoba logos, `kotoba.cloud` links in chrome, or handle strings like `com-<name>.kotoba.cloud`
- Digital Agency DADS (`dads-*`) classes on Mithril product UI (separate stack; not Mithril brand)
- Four competing logos (mark+wordmark, wordmark-only, `MITHRIL.`, plain Mithril)

## Token reference

See [BRANDING.md](../BRANDING.md) and `resources/web-console.css`.
