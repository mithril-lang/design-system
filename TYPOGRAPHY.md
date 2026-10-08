# Language typography

The active BCP 47 `lang` chooses the default UI font. Language is not nationality: these are documented product choices inspired by a particular public design system, not claims that every government using a language shares a single official font. Regional tags override base tags. All public webfonts are bundled for same-origin and offline use; `font-display: swap` and Unicode subsets avoid blocking text. Code and numeric fonts retain their existing tokens.

| Language | Default | Evidence / status |
| --- | --- | --- |
| Japanese (`ja`) | Noto Sans JP | [Japan Digital Agency](https://design.digital.go.jp/dads/foundations/typography/) |
| Korean (`ko`) | Pretendard GOV | [KRDS](https://www.krds.go.kr/html/site/outline/outline_03.html), [OFL source](https://github.com/orioncactus/pretendard/tree/main/packages/pretendard-gov) |
| Italian (`it`) | Titillium Web | [Designers Italia](https://designers.italia.it/design-system/fondamenti/tipografia/) |
| English (`en`) | Roboto | [Scottish Government](https://designsystem.gov.scot/styles/typography). GOV.UK's GDS Transport has domain restrictions and is not bundled. |
| Hindi / Marathi (`hi`, `mr`) | Noto Sans Devanagari | [India digital identity manual](https://ipa.nic.in/WriteReadData/Links/DBIM_Version1583c2e1b-a3a5-47dc-bf84-793983d6b341.pdf) adopts the multilingual Noto Sans family; this is its script-specific variant. |
| Portuguese (`pt`, `pt-BR`) | Rawline | [Brazil government template](https://www.gov.br/ds/templates/base), [official font download](https://www.gov.br/sri/pt-br/central-de-conteudo/manuais/enpp-manual/00-fonte-rawline.zip/view). `pt-PT` uses the fallback Noto Sans; Brazil's choice is not attributed to Portugal. |
| French (`fr`) | Arial, then Noto Sans | Substitute for restricted Marianne, per [DSFR typography](https://www.systeme-de-design.gouv.fr/version-courante/fr/fondamentaux/typographie). Arial is resolved from the OS; no proprietary font files are distributed. |
| Simplified Chinese (`zh`, `zh-Hans`, `zh-CN`, `zh-SG`) | Noto Sans SC | Script fallback; government adoption not verified. |
| Traditional Chinese (`zh-Hant`, `zh-TW`, `zh-HK`) | Noto Sans TC | Script fallback; government adoption not verified. |
| Bengali (`bn`) | Noto Sans Bengali | Script fallback; government adoption not verified. |
| Arabic / Egyptian Arabic / Moroccan Arabic / Urdu (`ar`, `arz`, `ar-MA`, `ur`) | Noto Sans Arabic | Script fallback; government adoption not verified. |
| Hebrew (`he`) | Noto Sans Hebrew | Script fallback; government adoption not verified. |
| Spanish, Indonesian, Russian, German, Nigerian Pidgin, Javanese, Sundanese, Turkish, Polish (`es`, `id`, `ru`, `de`, `pcm`, `jv`, `su`, `tr`, `pl`) | Noto Sans | Script fallback; government adoption not verified. |
| Unrecognised / missing language | Noto Sans | Neutral fallback. |

Reviewed 2026-10-08. `resources/fonts/manifest.json` records pinned origins and SHA-256 hashes. `scripts/vendor-locale-fonts.py` regenerates font faces and assets; it requires network access only during maintenance. OFL notices accompany every family. Keep `resources/fonts` with CSS when packaging; Vite resolves the relative URLs automatically. Server-rendered inline CSS must rewrite `./fonts/` to its own same-origin asset directory and publish those files. The Clojure font-face source and browser CSS are generated together.
