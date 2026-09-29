(ns mithril.design-system.test-runner
  (:require [clojure.test :as test]
            [mithril.design-system.tokens-test]))

(defn -main [& _]
  (let [{:keys [fail error]} (test/run-tests 'mithril.design-system.tokens-test)]
    (when (pos? (+ fail error))
      (System/exit 1))))
