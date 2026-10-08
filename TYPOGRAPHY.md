# Visitor country typography

The visitor's preferred BCP 47 browser/OS locale selects the country via its explicit region (`en-US`, `en-GB`, `pt-BR`, `pt-PT`). Server HTML uses the highest-quality valid Accept-Language preference; clients use `navigator.languages[0]`. Neither `lang`, the translation selector, nor its saved cookie selects a country. Bare language tags are never maximized into an inferred region. This is locale preference, not IP location or nationality.

`data-font-country` on the document root selects the primary family; content `lang` only selects glyph fallbacks. Unknown/missing countries use Noto Sans and script variants. For example, `en-US` with Japanese content uses Public Sans for Latin and Noto Sans JP for Japanese, while `en-JP` uses Noto Sans JP regardless of English UI. Explicit custom font preferences retain priority. All fonts are bundled for offline/same-origin use.

| Region | Primary | Evidence / status |
| --- | --- | --- |
| JP | Noto Sans JP | [Japan Digital Agency](https://design.digital.go.jp/dads/foundations/typography/) |
| KR | Pretendard GOV | [KRDS](https://www.krds.go.kr/html/site/outline/outline_03.html) |
| IT | Titillium Web | [Designers Italia](https://designers.italia.it/design-system/fondamenti/tipografia/) |
| BR | Rawline | [Brazil government](https://www.gov.br/ds/templates/base) |
| US | Public Sans | [USWDS](https://designsystem.digital.gov/design-tokens/typesetting/font/) |
| GB | Arial | [GOV.UK permitted substitute](https://frontend.design-system.service.gov.uk/using-govuk-frontend-without-govuk-branding/); restricted GDS Transport is not distributed. Scotland's Roboto is not assumed for all GB. |
| FR | Arial | [DSFR](https://www.systeme-de-design.gouv.fr/version-courante/fr/fondamentaux/typographie) substitute for restricted Marianne; uses OS Arial. |
| IN | Noto Sans with script variants | [India digital identity manual](https://ipa.nic.in/WriteReadData/Links/DBIM_Version1583c2e1b-a3a5-47dc-bf84-793983d6b341.pdf) |
| Other / absent regions, including PT | Noto Sans with script variants | No government adoption claim; fallback. |

Country mappings represent these public design systems, not a claim of a single legally mandated national font. All other countries remain explicit fallbacks until reusable government sources are verified.

Script fallback families: Noto Sans JP, KR, SC/TC, Devanagari, Bengali, Arabic, Hebrew and base Noto Sans. Regional/script Chinese content tags retain the appropriate SC/TC glyphs.

Reviewed 2026-10-08. `resources/fonts/manifest.json` records pinned origins and SHA-256 hashes. `scripts/vendor-locale-fonts.py` regenerates font faces and assets; it requires network access only during maintenance. OFL notices accompany every family. Keep `resources/fonts` with CSS when packaging; Vite resolves the relative URLs automatically. Server-rendered inline CSS must rewrite `./fonts/` to its own same-origin asset directory and publish those files. The Clojure font-face source and browser CSS are generated together.
