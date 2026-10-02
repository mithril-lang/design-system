import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef, createContext, useContext, memo } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Copy } from "lucide-react";
const PlatformContext = createContext(null);
function usePlatform() {
    const platform = useContext(PlatformContext);
    if (!platform)
        throw new Error("AgentMarkdown requires a platform adapter");
    return platform;
}
// Per renderer, so expanding a block in one reply cannot expand another reply.
const ExpansionContext = createContext(null);
// Lazy-load the heavy syntax highlighter — only imported when a code block renders
let _highlighterMod = null;
let _oneDark = null;
let _loadingPromise = null;
// Box Drawing (U+2500\u2013U+257F) plus Block Elements (U+2580\u2013U+259F): tree
// connectors like \u251C\u2500\u2500 \u2514\u2500\u2500 \u2502 and the shading/progress-bar glyphs \u2588 \u2591 \u2592 \u2593.
const BOX_DRAWING_RE = /[\u2500-\u259F]/;
// A block is a "box diagram" (tree output, table borders, progress bars) only
// when box-drawing characters dominate it \u2014 at least half of its non-empty
// lines contain one. A single \u2502 in a string literal or comment must NOT
// demote a whole source file to plain text, but a tree diagram (box chars on
// nearly every line) should never go through Prism: it fragments each glyph
// into nested token spans, which Electron renderers with imperfect Unicode
// metrics can visually truncate or misalign.
function isBoxDiagram(code) {
    const lines = code.split("\n").filter((line) => line.trim() !== "");
    if (lines.length === 0)
        return false;
    const boxLines = lines.filter((line) => BOX_DRAWING_RE.test(line)).length;
    return boxLines * 2 >= lines.length;
}
const PLAIN_PRE_STYLE = {
    margin: 0,
    borderRadius: 0,
    fontSize: "13px",
    lineHeight: 1.5,
    padding: "12px",
    background: "transparent",
    color: "inherit",
    overflowX: "auto",
    whiteSpace: "pre",
    fontVariantLigatures: "none",
    unicodeBidi: "isolate",
};
const PLAIN_CODE_STYLE = {
    background: "transparent",
    padding: 0,
    whiteSpace: "pre",
};
function loadHighlighter() {
    if (_highlighterMod && _oneDark)
        return Promise.resolve();
    if (_loadingPromise)
        return _loadingPromise;
    _loadingPromise = Promise.all([
        import("react-syntax-highlighter"),
        import("react-syntax-highlighter/dist/esm/styles/prism/one-dark.js"),
    ]).then(([mod, style]) => {
        _highlighterMod = mod;
        _oneDark = style.default;
    });
    return _loadingPromise;
}
// Diff viewer with colored +/- lines
function DiffView({ code }) {
    const lines = code.split("\n");
    return (_jsx("div", { className: "chat-diff-content", children: lines.map((line, i) => {
            let cls = "chat-diff-line";
            if (line.startsWith("+"))
                cls += " chat-diff-add";
            else if (line.startsWith("-"))
                cls += " chat-diff-remove";
            else if (line.startsWith("@@"))
                cls += " chat-diff-hunk";
            return (_jsx("div", { className: cls, children: line || "\u00A0" }, i));
        }) }));
}
function PlainCodeView({ code }) {
    return (_jsx("pre", { className: "chat-code-plain", style: PLAIN_PRE_STYLE, children: _jsx("code", { style: PLAIN_CODE_STYLE, children: code }) }));
}
// Source-position IDs remain stable when react-markdown remounts streamed blocks.
// The renderer's ExpansionContext retains user choices without sharing them
// across unrelated replies.
// Code block with syntax highlighting and copy button (lazy-loaded highlighter)
function CodeBlock({ className, children, blockId, }) {
    const platform = usePlatform();
    const expandedCodeBlocks = useContext(ExpansionContext);
    const [copied, setCopied] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(() => blockId ? !expandedCodeBlocks.has(blockId) : true);
    const [highlighterReady, setHighlighterReady] = useState(() => _highlighterMod !== null && _oneDark !== null);
    const code = String(children).replace(/\n$/, "");
    const match = /language-(\w+)/.exec(className || "");
    const language = match ? match[1] : "";
    const isDiff = language === "diff";
    // Diffs win over the box-diagram check: DiffView is already a plain per-line
    // renderer (no Prism), so it has no fragmentation risk, and a patch touching
    // a tree diagram must keep its colored +/- view.
    const boxDiagram = !isDiff && isBoxDiagram(code);
    const linesCount = code.split("\n").length;
    const isLong = linesCount > 15 || code.length > 800;
    // Trigger lazy load when code block mounts. Box diagrams and diffs never
    // use Prism, so don't pull in the highlighter for them (see isBoxDiagram).
    useEffect(() => {
        if (!boxDiagram && !isDiff && !highlighterReady) {
            let active = true;
            void loadHighlighter().then(() => { if (active)
                setHighlighterReady(true); }).catch(() => { });
            return () => { active = false; };
        }
        return undefined;
    }, [boxDiagram, highlighterReady, isDiff]);
    function handleCopy() {
        void platform.copyText(code).then(() => setCopied(true)).catch(() => setCopied(false));
        setTimeout(() => setCopied(false), 2000);
    }
    const codeContent = isDiff ? (_jsx(DiffView, { code: code })) : boxDiagram ? (_jsx(PlainCodeView, { code: code })) : highlighterReady && _highlighterMod && _oneDark ? (_jsx(_highlighterMod.Prism, { style: _oneDark, language: language || "text", PreTag: "div", customStyle: {
            margin: 0,
            borderRadius: 0,
            fontSize: "13px",
            padding: "12px",
            background: "transparent",
        }, children: code })) : (_jsx(PlainCodeView, { code: code }));
    return (_jsxs("div", { className: "chat-code-block", children: [_jsxs("div", { className: "chat-code-header", children: [_jsx("span", { className: "chat-code-lang", children: isDiff ? "diff" : language || (boxDiagram ? "text" : "code") }), _jsx("button", { type: "button", className: "chat-code-copy", "aria-label": platform.labels.copy, onClick: handleCopy, children: copied ? platform.labels.copied : _jsx(Copy, { size: 13 }) })] }), _jsx("div", { className: isLong && isCollapsed ? "chat-code-collapsed" : "", children: codeContent }), isLong && (_jsx("button", { type: "button", className: "chat-code-expand-btn", onClick: () => setIsCollapsed((prev) => {
                    const next = !prev;
                    if (blockId) {
                        if (next)
                            expandedCodeBlocks.delete(blockId);
                        else
                            expandedCodeBlocks.add(blockId);
                    }
                    return next;
                }), children: isCollapsed
                    ? platform.labels.showMore || "Show more"
                    : platform.labels.showLess || "Show less" }))] }));
}
export const AgentMarkdown = memo(function AgentMarkdown({ children, platform }) {
    const expanded = useRef(new Set());
    return _jsx(PlatformContext.Provider, { value: platform, children: _jsx(ExpansionContext.Provider, { value: expanded.current, children: _jsx(Markdown, { remarkPlugins: [remarkGfm], components: {
                    a: ({ href, children }) => {
                        let safe = false;
                        try {
                            safe = !!href && ["http:", "https:", "mailto:"].includes(new URL(href, "https://placeholder.invalid").protocol);
                        }
                        catch { /* malformed links are inert */ }
                        return _jsx("a", { href: safe ? href : undefined, target: "_blank", rel: "noopener noreferrer", onClick: event => {
                                if (!safe) {
                                    event.preventDefault();
                                    return;
                                }
                                if (platform.openLink && href) {
                                    event.preventDefault();
                                    platform.openLink(href);
                                }
                            }, children: children });
                    },
                    img: ({ src, alt }) => typeof src === "string" && src ? (platform.renderImage?.(src, alt ?? "") ?? _jsx("span", { children: alt })) : null,
                    code: ({ className, children, node, ...props }) => {
                        const isInline = !className && typeof children === "string" && !children.includes("\n");
                        if (isInline)
                            return _jsx("code", { className: className, ...props, children: children });
                        const start = node?.position?.start;
                        const blockId = start != null ? `${start.offset ?? start.line}:${className ?? ""}` : undefined;
                        return _jsx(CodeBlock, { className: className, blockId: blockId, children: children });
                    },
                }, children: children }) }) });
});
