import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useId, useRef } from "react";
/** Native disclosures and real links work before JavaScript loads. Routing remains a consumer adapter. */
export function PublicNavigation({ items, label, className = "", renderLink }) {
    const root = useRef(null);
    const group = useId();
    useEffect(() => {
        const outside = (event) => {
            if (!root.current?.contains(event.target))
                root.current?.querySelectorAll("details[open]").forEach(node => node.removeAttribute("open"));
        };
        document.addEventListener("pointerdown", outside);
        return () => document.removeEventListener("pointerdown", outside);
    }, []);
    const link = (item) => {
        const children = _jsxs(_Fragment, { children: [_jsx("span", { className: "mithril-public-navigation-label", children: item.label }), item.description ? _jsx("span", { className: "mithril-public-navigation-description", children: item.description }) : null] });
        return renderLink ? renderLink(item, children) : _jsx("a", { href: item.href, children: children });
    };
    return _jsx("nav", { ref: root, "aria-label": label, className: `mithril-public-navigation ${className}`, onKeyDown: event => {
            if (event.key !== "Escape")
                return;
            const open = root.current?.querySelector("details[open]");
            if (open) {
                open.open = false;
                open.querySelector("summary")?.focus();
                event.preventDefault();
            }
        }, onClick: event => {
            if (event.target.closest("a"))
                root.current?.querySelectorAll("details[open]").forEach(node => node.removeAttribute("open"));
        }, children: _jsx("ul", { children: items.map(item => _jsx("li", { children: "links" in item ? _jsxs("details", { name: group, onToggle: event => {
                        if (event.currentTarget.open)
                            root.current?.querySelectorAll("details[open]").forEach(node => { if (node !== event.currentTarget)
                                node.removeAttribute("open"); });
                    }, children: [_jsxs("summary", { children: [item.label, _jsx("span", { "aria-hidden": "true", className: "mithril-public-navigation-chevron", children: "\u2304" })] }), _jsx("ul", { className: "mithril-public-navigation-panel", children: item.links.map(child => _jsx("li", { children: link(child) }, child.id)) })] }) : link(item) }, item.id)) }) });
}
