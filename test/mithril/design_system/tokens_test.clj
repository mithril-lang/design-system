(ns mithril.design-system.tokens-test
  (:require [clojure.java.io :as io]
            [clojure.test :refer [deftest is testing]]
            [mithril.design-system.tokens :as tokens]))

(deftest web-console-css-is-scoped-and-generated
  (let [css (tokens/web-console-stylesheet)]
    (testing "the web palette cannot leak into unrelated surfaces"
      (is (re-find #"\[data-mithril-design-system=\"web-console\"\]" css))
      (is (not (re-find #"(?m)^:root" css))))
    (testing "the public distribution matches the source of truth"
      (is (= css (slurp (io/file "resources/web-console.css")))))))

(deftest desktop-css-remains-generated
  (is (= (tokens/stylesheet)
         (slurp (io/file "resources/design-system.css")))))

(deftest font-assets-survive-offline-packaging
  (let [css (slurp "resources/font-faces.css")
        urls (map second (re-seq #"url\(\"\./([^\"]+)\"\)" css))]
    (is (seq urls))
    (doseq [url urls]
      (is (.isFile (io/file "resources" url)) (str "Missing bundled font: " url)))
    (is (not (re-find #"url\(.*https?://" css)))))
