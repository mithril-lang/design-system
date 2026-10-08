(ns mithril.design-system.typography
  "Government-adopted public fonts and explicit script fallbacks. See TYPOGRAPHY.md."
  (:require [clojure.string :as str]))

;; Specific BCP 47 tags follow their base language so regional choices win.
(def locale-families
  [["ar" "Noto Sans Arabic"]
   ["bn" "Noto Sans Bengali"]
   ["de" "Noto Sans"]
   ["en" "Roboto"]
   ["es" "Noto Sans"]
   ["fr" "Arial"]
   ["he" "Noto Sans Hebrew"]
   ["hi" "Noto Sans Devanagari"]
   ["id" "Noto Sans"]
   ["it" "Titillium Web"]
   ["ja" "Noto Sans JP"]
   ["jv" "Noto Sans"]
   ["ko" "Pretendard GOV"]
   ["mr" "Noto Sans Devanagari"]
   ["pl" "Noto Sans"]
   ["pt" "Rawline"]
   ["ru" "Noto Sans"]
   ["su" "Noto Sans"]
   ["tr" "Noto Sans"]
   ["ur" "Noto Sans Arabic"]
   ["zh" "Noto Sans SC"]
   ["arz" "Noto Sans Arabic"]
   ["pcm" "Noto Sans"]
   ["ar-MA" "Noto Sans Arabic"]
   ["pt-BR" "Rawline"]
   ["pt-PT" "Noto Sans"]
   ["zh-CN" "Noto Sans SC"]
   ["zh-HK" "Noto Sans TC"]
   ["zh-SG" "Noto Sans SC"]
   ["zh-TW" "Noto Sans TC"]
   ["zh-Hans" "Noto Sans SC"]
   ["zh-Hant" "Noto Sans TC"]])

(defn locale-css
  "Scoped Web rules or Desktop rules; :lang also matches regional tags and inherited language."
  [scope]
  (str/join "\n"
    (map (fn [[locale family]]
           (str (if (empty? scope) ":where([lang])" scope)
                ":lang(" locale ") {\n  --font-sans: var(--font-locale);\n  --font-locale: \"" family "\", \"Noto Sans\", Arial, sans-serif;\n}"
                (when (empty? scope)
                  (str "\n:where([lang]):lang(" locale ") { font-family: var(--font-sans); }"))))
         locale-families)))
