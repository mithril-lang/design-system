(ns mithril.design-system.tokens
  "Design tokens extracted from Kotoba Desktop. Values are CSS custom properties."
  (:require [clojure.string :as str]
            [mithril.design-system.typography :as typography]
            [mithril.design-system.font-faces :as font-faces]))

(def theme-order
  [:dark :light :dracula :nord :one-dark :github-dark :monokai :solarized-dark :gruvbox-dark :tokyo-night :github-light :solarized-light])

(def system-theme-for-appearance {:dark :dark :light :light})

(def themes
 {
  "dark" {:name "Dark" :appearance :dark
    :tokens {
       "--bg-primary" "#212121"
       "--bg-secondary" "#171717"
       "--bg-tertiary" "#2f2f2f"
       "--bg-elevated" "#303030"
       "--bg-hover" "#3a3a3a"
       "--bg-active" "#424242"
       "--accent" "#003f7a"
       "--accent-hover" "#0055a4"
       "--accent-subtle" "rgba(0, 63, 122, 0.15)"
       "--accent-text" "#006acd"
       "--primary-yellow" "#f5c518"
       "--text-primary" "#ececec"
       "--text-secondary" "#b4b4b4"
       "--text-muted" "#8e8e8e"
       "--border" "rgba(255, 255, 255, 0.06)"
       "--border-bright" "rgba(255, 255, 255, 0.1)"
       "--border-focus" "#003f7a"
       "--success" "#22c55e"
       "--success-bg" "rgba(34, 197, 94, 0.1)"
       "--error" "#ef4444"
       "--error-bg" "rgba(239, 68, 68, 0.1)"
       "--warning" "#f59e0b"
       "--warning-bg" "rgba(245, 158, 11, 0.1)"
       "--user-bubble" "#003f7a"
       "--user-bubble-text" "#ffffff"
       "--agent-bubble" "#2f2f2f"
       "--agent-bubble-text" "#ececec"
       "--code-bg" "#1a1a1a"
       "--scrollbar-thumb" "#424242"
       "--scrollbar-hover" "#555555"
       "--selection" "rgba(0, 100, 180, 0.7)"}},
  "light" {:name "Light" :appearance :light
    :tokens {
       "--bg-primary" "#ffffff"
       "--bg-secondary" "#f8f8f8"
       "--bg-tertiary" "#f0f0f0"
       "--bg-elevated" "#e8e8e8"
       "--bg-hover" "#ebebeb"
       "--bg-active" "#e0e0e0"
       "--accent" "#003f7a"
       "--accent-hover" "#002d58"
       "--accent-subtle" "rgba(0, 63, 122, 0.08)"
       "--accent-text" "#003f7a"
       "--primary-yellow" "#f5c518"
       "--text-primary" "#111111"
       "--text-secondary" "#555555"
       "--text-muted" "#999999"
       "--border" "#e5e5e5"
       "--border-bright" "#d4d4d4"
       "--border-focus" "#003f7a"
       "--success" "#16a34a"
       "--success-bg" "rgba(22, 163, 74, 0.08)"
       "--error" "#dc2626"
       "--error-bg" "rgba(220, 38, 38, 0.06)"
       "--warning" "#d97706"
       "--warning-bg" "rgba(217, 119, 6, 0.08)"
       "--user-bubble" "#003f7a"
       "--user-bubble-text" "#ffffff"
       "--agent-bubble" "#f0f0f0"
       "--agent-bubble-text" "#111111"
       "--code-bg" "#f5f5f5"
       "--scrollbar-thumb" "#d4d4d4"
       "--scrollbar-hover" "#bbbbbb"
       "--selection" "rgba(0, 63, 122, 0.3)"}},
  "dracula" {:name "Dracula" :appearance :dark
    :tokens {
       "--bg-primary" "#282a36"
       "--bg-secondary" "#21222c"
       "--bg-tertiary" "#343746"
       "--bg-elevated" "#343746"
       "--bg-hover" "#44475a"
       "--bg-active" "#4d5066"
       "--accent" "#bd93f9"
       "--accent-hover" "#caa9fa"
       "--accent-subtle" "rgba(189, 147, 249, 0.16)"
       "--accent-text" "#bd93f9"
       "--primary-yellow" "#f1fa8c"
       "--text-primary" "#f8f8f2"
       "--text-secondary" "#c3c3d0"
       "--text-muted" "#6272a4"
       "--border" "rgba(255, 255, 255, 0.07)"
       "--border-bright" "rgba(255, 255, 255, 0.13)"
       "--border-focus" "#bd93f9"
       "--success" "#50fa7b"
       "--success-bg" "rgba(80, 250, 123, 0.12)"
       "--error" "#ff5555"
       "--error-bg" "rgba(255, 85, 85, 0.12)"
       "--warning" "#f1fa8c"
       "--warning-bg" "rgba(241, 250, 140, 0.12)"
       "--user-bubble" "#bd93f9"
       "--user-bubble-text" "#282a36"
       "--agent-bubble" "#343746"
       "--agent-bubble-text" "#f8f8f2"
       "--code-bg" "#21222c"
       "--scrollbar-thumb" "#44475a"
       "--scrollbar-hover" "#6272a4"
       "--selection" "rgba(189, 147, 249, 0.7)"}},
  "nord" {:name "Nord" :appearance :dark
    :tokens {
       "--bg-primary" "#2e3440"
       "--bg-secondary" "#272c36"
       "--bg-tertiary" "#3b4252"
       "--bg-elevated" "#3b4252"
       "--bg-hover" "#434c5e"
       "--bg-active" "#4c566a"
       "--accent" "#88c0d0"
       "--accent-hover" "#8fbcbb"
       "--accent-subtle" "rgba(136, 192, 208, 0.16)"
       "--accent-text" "#88c0d0"
       "--primary-yellow" "#ebcb8b"
       "--text-primary" "#eceff4"
       "--text-secondary" "#d8dee9"
       "--text-muted" "#7b88a1"
       "--border" "rgba(255, 255, 255, 0.06)"
       "--border-bright" "rgba(255, 255, 255, 0.12)"
       "--border-focus" "#88c0d0"
       "--success" "#a3be8c"
       "--success-bg" "rgba(163, 190, 140, 0.14)"
       "--error" "#bf616a"
       "--error-bg" "rgba(191, 97, 106, 0.14)"
       "--warning" "#ebcb8b"
       "--warning-bg" "rgba(235, 203, 139, 0.14)"
       "--user-bubble" "#5e81ac"
       "--user-bubble-text" "#eceff4"
       "--agent-bubble" "#3b4252"
       "--agent-bubble-text" "#eceff4"
       "--code-bg" "#272c36"
       "--scrollbar-thumb" "#434c5e"
       "--scrollbar-hover" "#4c566a"
       "--selection" "rgba(136, 192, 208, 0.7)"}},
  "one-dark" {:name "One Dark" :appearance :dark
    :tokens {
       "--bg-primary" "#282c34"
       "--bg-secondary" "#21252b"
       "--bg-tertiary" "#2c313a"
       "--bg-elevated" "#2c313a"
       "--bg-hover" "#2f3540"
       "--bg-active" "#3e4451"
       "--accent" "#61afef"
       "--accent-hover" "#74b9f1"
       "--accent-subtle" "rgba(97, 175, 239, 0.16)"
       "--accent-text" "#61afef"
       "--primary-yellow" "#e5c07b"
       "--text-primary" "#d7dae0"
       "--text-secondary" "#abb2bf"
       "--text-muted" "#6b727f"
       "--border" "rgba(255, 255, 255, 0.06)"
       "--border-bright" "rgba(255, 255, 255, 0.1)"
       "--border-focus" "#61afef"
       "--success" "#98c379"
       "--success-bg" "rgba(152, 195, 121, 0.14)"
       "--error" "#e06c75"
       "--error-bg" "rgba(224, 108, 117, 0.14)"
       "--warning" "#e5c07b"
       "--warning-bg" "rgba(229, 192, 123, 0.14)"
       "--user-bubble" "#61afef"
       "--user-bubble-text" "#282c34"
       "--agent-bubble" "#2c313a"
       "--agent-bubble-text" "#d7dae0"
       "--code-bg" "#21252b"
       "--scrollbar-thumb" "#3e4451"
       "--scrollbar-hover" "#4b5263"
       "--selection" "rgba(97, 175, 239, 0.7)"}},
  "github-dark" {:name "GitHub Dark" :appearance :dark
    :tokens {
       "--bg-primary" "#0d1117"
       "--bg-secondary" "#010409"
       "--bg-tertiary" "#161b22"
       "--bg-elevated" "#161b22"
       "--bg-hover" "#1f242c"
       "--bg-active" "#21262d"
       "--accent" "#1f6feb"
       "--accent-hover" "#388bfd"
       "--accent-subtle" "rgba(56, 139, 253, 0.16)"
       "--accent-text" "#58a6ff"
       "--primary-yellow" "#d29922"
       "--text-primary" "#c9d1d9"
       "--text-secondary" "#8b949e"
       "--text-muted" "#6e7681"
       "--border" "#30363d"
       "--border-bright" "#444c56"
       "--border-focus" "#1f6feb"
       "--success" "#3fb950"
       "--success-bg" "rgba(63, 185, 80, 0.14)"
       "--error" "#f85149"
       "--error-bg" "rgba(248, 81, 73, 0.14)"
       "--warning" "#d29922"
       "--warning-bg" "rgba(210, 153, 34, 0.14)"
       "--user-bubble" "#1f6feb"
       "--user-bubble-text" "#ffffff"
       "--agent-bubble" "#161b22"
       "--agent-bubble-text" "#c9d1d9"
       "--code-bg" "#161b22"
       "--scrollbar-thumb" "#30363d"
       "--scrollbar-hover" "#484f58"
       "--selection" "rgba(56, 139, 253, 0.7)"}},
  "monokai" {:name "Monokai" :appearance :dark
    :tokens {
       "--bg-primary" "#272822"
       "--bg-secondary" "#1e1f1c"
       "--bg-tertiary" "#2d2e28"
       "--bg-elevated" "#34352f"
       "--bg-hover" "#3e3d32"
       "--bg-active" "#49483e"
       "--accent" "#66d9ef"
       "--accent-hover" "#7ee0f2"
       "--accent-subtle" "rgba(102, 217, 239, 0.16)"
       "--accent-text" "#66d9ef"
       "--primary-yellow" "#e6db74"
       "--text-primary" "#f8f8f2"
       "--text-secondary" "#c5c8c6"
       "--text-muted" "#75715e"
       "--border" "rgba(255, 255, 255, 0.06)"
       "--border-bright" "rgba(255, 255, 255, 0.12)"
       "--border-focus" "#66d9ef"
       "--success" "#a6e22e"
       "--success-bg" "rgba(166, 226, 46, 0.14)"
       "--error" "#f92672"
       "--error-bg" "rgba(249, 38, 114, 0.14)"
       "--warning" "#e6db74"
       "--warning-bg" "rgba(230, 219, 116, 0.14)"
       "--user-bubble" "#f92672"
       "--user-bubble-text" "#ffffff"
       "--agent-bubble" "#2d2e28"
       "--agent-bubble-text" "#f8f8f2"
       "--code-bg" "#1e1f1c"
       "--scrollbar-thumb" "#49483e"
       "--scrollbar-hover" "#75715e"
       "--selection" "rgba(102, 217, 239, 0.7)"}},
  "solarized-dark" {:name "Solarized Dark" :appearance :dark
    :tokens {
       "--bg-primary" "#002b36"
       "--bg-secondary" "#00252e"
       "--bg-tertiary" "#073642"
       "--bg-elevated" "#073642"
       "--bg-hover" "#0a4250"
       "--bg-active" "#0e4b5a"
       "--accent" "#268bd2"
       "--accent-hover" "#3a9bdc"
       "--accent-subtle" "rgba(38, 139, 210, 0.16)"
       "--accent-text" "#2aa198"
       "--primary-yellow" "#b58900"
       "--text-primary" "#93a1a1"
       "--text-secondary" "#839496"
       "--text-muted" "#586e75"
       "--border" "rgba(255, 255, 255, 0.06)"
       "--border-bright" "rgba(255, 255, 255, 0.1)"
       "--border-focus" "#268bd2"
       "--success" "#859900"
       "--success-bg" "rgba(133, 153, 0, 0.16)"
       "--error" "#dc322f"
       "--error-bg" "rgba(220, 50, 47, 0.16)"
       "--warning" "#b58900"
       "--warning-bg" "rgba(181, 137, 0, 0.16)"
       "--user-bubble" "#268bd2"
       "--user-bubble-text" "#002b36"
       "--agent-bubble" "#073642"
       "--agent-bubble-text" "#93a1a1"
       "--code-bg" "#00252e"
       "--scrollbar-thumb" "#073642"
       "--scrollbar-hover" "#586e75"
       "--selection" "rgba(38, 139, 210, 0.7)"}},
  "gruvbox-dark" {:name "Gruvbox Dark" :appearance :dark
    :tokens {
       "--bg-primary" "#282828"
       "--bg-secondary" "#1d2021"
       "--bg-tertiary" "#3c3836"
       "--bg-elevated" "#3c3836"
       "--bg-hover" "#504945"
       "--bg-active" "#665c54"
       "--accent" "#83a598"
       "--accent-hover" "#8ec07c"
       "--accent-subtle" "rgba(131, 165, 152, 0.16)"
       "--accent-text" "#83a598"
       "--primary-yellow" "#fabd2f"
       "--text-primary" "#ebdbb2"
       "--text-secondary" "#d5c4a1"
       "--text-muted" "#928374"
       "--border" "rgba(255, 255, 255, 0.06)"
       "--border-bright" "rgba(255, 255, 255, 0.12)"
       "--border-focus" "#83a598"
       "--success" "#b8bb26"
       "--success-bg" "rgba(184, 187, 38, 0.14)"
       "--error" "#fb4934"
       "--error-bg" "rgba(251, 73, 52, 0.14)"
       "--warning" "#fabd2f"
       "--warning-bg" "rgba(250, 189, 47, 0.14)"
       "--user-bubble" "#83a598"
       "--user-bubble-text" "#282828"
       "--agent-bubble" "#3c3836"
       "--agent-bubble-text" "#ebdbb2"
       "--code-bg" "#1d2021"
       "--scrollbar-thumb" "#504945"
       "--scrollbar-hover" "#665c54"
       "--selection" "rgba(131, 165, 152, 0.7)"}},
  "tokyo-night" {:name "Tokyo Night" :appearance :dark
    :tokens {
       "--bg-primary" "#1a1b26"
       "--bg-secondary" "#16161e"
       "--bg-tertiary" "#1f2335"
       "--bg-elevated" "#1f2335"
       "--bg-hover" "#292e42"
       "--bg-active" "#343b58"
       "--accent" "#7aa2f7"
       "--accent-hover" "#89b4fa"
       "--accent-subtle" "rgba(122, 162, 247, 0.16)"
       "--accent-text" "#7aa2f7"
       "--primary-yellow" "#e0af68"
       "--text-primary" "#c0caf5"
       "--text-secondary" "#a9b1d6"
       "--text-muted" "#565f89"
       "--border" "rgba(255, 255, 255, 0.06)"
       "--border-bright" "rgba(255, 255, 255, 0.1)"
       "--border-focus" "#7aa2f7"
       "--success" "#9ece6a"
       "--success-bg" "rgba(158, 206, 106, 0.14)"
       "--error" "#f7768e"
       "--error-bg" "rgba(247, 118, 142, 0.14)"
       "--warning" "#e0af68"
       "--warning-bg" "rgba(224, 175, 104, 0.14)"
       "--user-bubble" "#7aa2f7"
       "--user-bubble-text" "#1a1b26"
       "--agent-bubble" "#1f2335"
       "--agent-bubble-text" "#c0caf5"
       "--code-bg" "#16161e"
       "--scrollbar-thumb" "#343b58"
       "--scrollbar-hover" "#565f89"
       "--selection" "rgba(122, 162, 247, 0.7)"}},
  "github-light" {:name "GitHub Light" :appearance :light
    :tokens {
       "--bg-primary" "#ffffff"
       "--bg-secondary" "#f6f8fa"
       "--bg-tertiary" "#eaeef2"
       "--bg-elevated" "#eaeef2"
       "--bg-hover" "#eef1f4"
       "--bg-active" "#e1e5ea"
       "--accent" "#0969da"
       "--accent-hover" "#0860c9"
       "--accent-subtle" "rgba(9, 105, 218, 0.08)"
       "--accent-text" "#0969da"
       "--primary-yellow" "#9a6700"
       "--text-primary" "#1f2328"
       "--text-secondary" "#57606a"
       "--text-muted" "#8c959f"
       "--border" "#d0d7de"
       "--border-bright" "#afb8c1"
       "--border-focus" "#0969da"
       "--success" "#1a7f37"
       "--success-bg" "rgba(26, 127, 55, 0.08)"
       "--error" "#cf222e"
       "--error-bg" "rgba(207, 34, 46, 0.07)"
       "--warning" "#9a6700"
       "--warning-bg" "rgba(154, 103, 0, 0.08)"
       "--user-bubble" "#0969da"
       "--user-bubble-text" "#ffffff"
       "--agent-bubble" "#f6f8fa"
       "--agent-bubble-text" "#1f2328"
       "--code-bg" "#f6f8fa"
       "--scrollbar-thumb" "#d0d7de"
       "--scrollbar-hover" "#afb8c1"
       "--selection" "rgba(9, 105, 218, 0.3)"}},
  "solarized-light" {:name "Solarized Light" :appearance :light
    :tokens {
       "--bg-primary" "#fdf6e3"
       "--bg-secondary" "#f4eeda"
       "--bg-tertiary" "#eee8d5"
       "--bg-elevated" "#eee8d5"
       "--bg-hover" "#e7e0c9"
       "--bg-active" "#ddd6be"
       "--accent" "#268bd2"
       "--accent-hover" "#1d6fa5"
       "--accent-subtle" "rgba(38, 139, 210, 0.1)"
       "--accent-text" "#268bd2"
       "--primary-yellow" "#b58900"
       "--text-primary" "#586e75"
       "--text-secondary" "#657b83"
       "--text-muted" "#93a1a1"
       "--border" "#e0d9c3"
       "--border-bright" "#d3cbb0"
       "--border-focus" "#268bd2"
       "--success" "#859900"
       "--success-bg" "rgba(133, 153, 0, 0.1)"
       "--error" "#dc322f"
       "--error-bg" "rgba(220, 50, 47, 0.08)"
       "--warning" "#b58900"
       "--warning-bg" "rgba(181, 137, 0, 0.1)"
       "--user-bubble" "#268bd2"
       "--user-bubble-text" "#fdf6e3"
       "--agent-bubble" "#eee8d5"
       "--agent-bubble-text" "#586e75"
       "--code-bg" "#eee8d5"
       "--scrollbar-thumb" "#d3cbb0"
       "--scrollbar-hover" "#b9b393"
       "--selection" "rgba(38, 139, 210, 0.3)"}}})

(def shared-tokens
  {"--radius-sm" "6px"
   "--radius-md" "10px"
   "--radius-lg" "14px"
   "--radius-xl" "20px"
   "--transition" "150ms ease"
   "--font-sans" "var(--font-locale)"
   "--font-locale" "var(--font-country, \"Noto Sans\"), Arial, sans-serif"
   "--font-mono" "\"SF Mono\", \"Fira Code\", \"JetBrains Mono\", Menlo, Consolas, monospace"
   "--font-numeric" "\"Space Grotesk\", var(--font-sans)"})

(def web-console-theme-ids ["dark" "light"])

(def web-console-aliases
  "Semantic names the web app already uses, bound to Mithril desktop tokens."
  {"--background" "var(--bg-primary)"
   "--foreground" "var(--text-primary)"
   "--muted" "var(--bg-tertiary)"
   "--muted-foreground" "var(--text-muted)"
   "--primary" "var(--accent)"
   "--primary-foreground" "var(--user-bubble-text)"
   "--border" "var(--border-bright)"
   "--destructive" "var(--error)"})

(defn web-console-theme-tokens [theme-id]
  (let [{:keys [tokens]} (get themes theme-id)]
    (when-not tokens (throw (ex-info "unknown web-console theme" {:theme theme-id})))
    (merge tokens web-console-aliases)))

(def web-console-shared-tokens
  (merge shared-tokens {"--radius" "var(--radius-md)"}))

(def scoped-tokens
  [{:selector ".onboard-screen"
    :tokens {"--bg-primary" "#0d0f17"
             "--bg-secondary" "#141824"
             "--bg-tertiary" "#1b2030"
             "--bg-elevated" "#202638"
             "--bg-hover" "#252c40"
             "--bg-active" "#2d354c"
             "--text-primary" "#eef0f6"
             "--text-secondary" "#adb4ca"
             "--text-muted" "#7f879d"
             "--border" "rgba(255, 255, 255, 0.08)"
             "--border-bright" "rgba(255, 255, 255, 0.14)"
             "--code-bg" "#10131d"
             "--selection" "rgba(120, 150, 255, 0.5)"}}
   {:selector ".app-toggle"
    :tokens {"--toggle-duration" "350ms"
             "--toggle-travel" "18px"
             "--toggle-overshoot" "1px"
             "--toggle-settle" "0px"
             "--toggle-track-duration" "0ms"
             "--toggle-ease" "cubic-bezier(0.34, 1.35, 0.64, 1)"}}])

(defn- declarations [tokens]
  (str/join "\n" (map (fn [[k v]] (str "  " k ": " v ";")) (sort-by key tokens))))

(defn theme-css [theme-id]
  (let [theme-id (if (keyword? theme-id) (name theme-id) theme-id)
        {:keys [tokens]} (get themes theme-id)]
    (when-not tokens (throw (ex-info "unknown design-system theme" {:theme theme-id})))
    (str "[data-theme=\"" theme-id "\"] {\n" (declarations tokens) "\n}")))

(defn scoped-css [{:keys [selector tokens]}]
  (str selector " {\n" (declarations tokens) "\n}"))

(defn web-console-theme-css [theme-id]
  (let [theme-id (if (keyword? theme-id) (name theme-id) theme-id)
        tokens (web-console-theme-tokens theme-id)]
    (str "[data-mithril-design-system=\"web-console\"][data-theme=\"" theme-id "\"]"
         (when (= theme-id "dark")
           ",\n[data-mithril-design-system=\"web-console\"]:not([data-theme])")
         " {\n" (declarations tokens)
         "\n  color-scheme: " theme-id ";\n}")))

(def web-console-components
  "[data-mithril-design-system=\"web-console\"] {
  background: var(--bg-primary);
  color: var(--text-primary);
  font-family: var(--font-sans);
}

[data-mithril-design-system=\"web-console\"] .mithril-console-sidebar {
  background: var(--bg-secondary);
  border-inline-end: 1px solid var(--border);
  color: var(--text-secondary);
  overflow: auto;
}

[data-mithril-design-system=\"web-console\"] .mithril-console-nav-item {
  display: flex;
  align-items: center;
  width: 100%;
  min-width: 0;
  color: var(--text-secondary);
  border-radius: var(--radius-md);
}

[data-mithril-design-system=\"web-console\"] .mithril-console-nav-item:hover {
  background: var(--bg-tertiary);
  color: var(--text-primary);
}

[data-mithril-design-system=\"web-console\"] .mithril-console-nav-item[aria-current=\"page\"] {
  background: var(--accent-subtle);
  color: var(--accent-text);
}

[data-mithril-design-system=\"web-console\"] .mithril-console-card,
[data-mithril-design-system=\"web-console\"] .mithril-console-metric {
  background: var(--bg-tertiary);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: none;
}

[data-mithril-design-system=\"web-console\"] .mithril-console-field {
  background: var(--bg-primary);
  color: var(--text-primary);
  border: 1px solid var(--border-bright);
  border-radius: var(--radius-md);
  box-shadow: none;
}

[data-mithril-design-system=\"web-console\"] .mithril-console-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  background: var(--accent);
  color: var(--user-bubble-text);
  padding: 0.45rem 0.9rem;
  font-size: 0.875rem;
  font-weight: 600;
}

[data-mithril-design-system=\"web-console\"] .mithril-console-button:disabled {
  opacity: 0.5;
}

[data-mithril-design-system=\"web-console\"] .mithril-console-button-quiet {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-bright);
  background: transparent;
  color: var(--text-primary);
  padding: 0.45rem 0.9rem;
  font-size: 0.875rem;
}

[data-mithril-design-system=\"web-console\"] .mithril-console-button-quiet:disabled {
  opacity: 0.5;
}

[data-mithril-design-system=\"web-console\"] .mithril-console-notice {
  border: 1px solid var(--border-bright);
  background: var(--bg-tertiary);
  border-radius: var(--radius-md);
  padding: 0.75rem 0.9rem;
  color: var(--text-secondary);
  font-size: 0.875rem;
  line-height: 1.5;
}

[data-mithril-design-system=\"web-console\"] .mithril-console-notice[data-tone=\"warning\"] {
  background: var(--warning-bg);
  color: var(--text-primary);
}

[data-mithril-design-system=\"web-console\"] .mithril-console-notice[data-tone=\"danger\"] {
  background: var(--error-bg);
  color: var(--text-primary);
}

[data-mithril-design-system=\"web-console\"] .mithril-console-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
  text-align: start;
}

[data-mithril-design-system=\"web-console\"] .mithril-console-table th {
  color: var(--text-muted);
  font-weight: 600;
  text-align: start;
  padding: 0.55rem 0.7rem;
  border-bottom: 1px solid var(--border);
}

[data-mithril-design-system=\"web-console\"] .mithril-console-table td {
  padding: 0.7rem;
  border-bottom: 1px solid var(--border);
  color: var(--text-primary);
  vertical-align: top;
}

[data-mithril-design-system=\"web-console\"] .mithril-console-badge {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  border: 1px solid var(--border-bright);
  background: var(--accent-subtle);
  color: var(--accent-text);
  padding: 0.05rem 0.45rem;
  font-size: 0.65rem;
  font-weight: 600;
}")

(defn web-console-stylesheet []
  (str "/* Generated by mithril.design-system.tokens/web-console-stylesheet. */\n"
       font-faces/css "\n"
       (str/join "\n\n" (map web-console-theme-css web-console-theme-ids))
       "\n\n[data-mithril-design-system=\"web-console\"] {\n"
       (declarations web-console-shared-tokens) "\n}\n\n"
       web-console-components "\n"
       (typography/locale-css "[data-mithril-design-system=\"web-console\"]") "\n"))

(defn stylesheet []
  (str font-faces/css "\n" (str/join "\n\n" (map theme-css theme-order))
       "\n\n:root {\n" (declarations shared-tokens) "\n}"
       "\n\nhtml[data-radius=\"none\"] {\n"
       "  --radius-sm: 0px;\n  --radius-md: 0px;\n  --radius-lg: 0px;\n  --radius-xl: 0px;\n}"
       "\n\n" (str/join "\n\n" (map scoped-css scoped-tokens))
       "\n\n" (typography/locale-css "") "\n"))
