(ns mithril.design-system.typography
  "Government-adopted public fonts and explicit script fallbacks. See TYPOGRAPHY.md."
  (:require [clojure.string :as str]))

;; Language only determines glyph coverage. Country is independent of UI language.
(def locale-families
  [["ar" "Noto Sans Arabic"]
   ["bn" "Noto Sans Bengali"]
   ["de" "Noto Sans"]
   ["en" "Noto Sans"]
   ["es" "Noto Sans"]
   ["fr" "Noto Sans"]
   ["he" "Noto Sans Hebrew"]
   ["hi" "Noto Sans Devanagari"]
   ["id" "Noto Sans"]
   ["it" "Noto Sans"]
   ["ja" "Noto Sans JP"]
   ["jv" "Noto Sans"]
   ["ko" "Noto Sans KR"]
   ["mr" "Noto Sans Devanagari"]
   ["pl" "Noto Sans"]
   ["pt" "Noto Sans"]
   ["ru" "Noto Sans"]
   ["su" "Noto Sans"]
   ["tr" "Noto Sans"]
   ["ur" "Noto Sans Arabic"]
   ["zh" "Noto Sans SC"]
   ["arz" "Noto Sans Arabic"]
   ["pcm" "Noto Sans"]
   ["ar-MA" "Noto Sans Arabic"]
   ["pt-PT" "Noto Sans"]
   ["zh-CN" "Noto Sans SC"]
   ["zh-HK" "Noto Sans TC"]
   ["zh-SG" "Noto Sans SC"]
   ["zh-TW" "Noto Sans TC"]
   ["zh-Hans" "Noto Sans SC"]
   ["zh-Hant" "Noto Sans TC"]])

(def country-families
  [["JP" "Noto Sans JP"] ["KR" "Pretendard GOV"]
   ["IT" "Titillium Web"] ["BR" "Rawline"]
   ["US" "Public Sans"] ["GB" "Arial"] ["FR" "Arial"]
   ["IN" "Noto Sans"]])

(defn locale-css
  "Visitor country selects the primary face; content language supplies script fallback."
  [scope]
  (str
    (str/join "\n"
      (map (fn [[country family]]
             (str (if (empty? scope) ":root" (str ":where([data-font-country=\"" country "\"]) " scope ", " scope)) "[data-font-country=\"" country "\"] { --font-country: \"" family "\"; }"))
           country-families)) "\n"
    (str/join "\n"
      (map (fn [[locale family]]
             (str (if (empty? scope) ":where([lang])" scope)
                  ":lang(" locale ") {\n  --font-sans: var(--font-locale);\n  --font-locale: var(--font-country, \"" family "\"), \"" family "\", \"Noto Sans\", Arial, sans-serif;\n}"
                  (when (empty? scope)
                    (str "\n:where([lang]):lang(" locale ") { font-family: var(--font-sans); }"))))
           locale-families))))
