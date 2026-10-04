import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef, useId, useState } from "react";
import { ChevronRight, LoaderCircle, Plus, Wrench, X } from "lucide-react";
import { ChatTextarea } from "./ChatTextarea.js";
import { ChatSubmitButton } from "./ChatSubmitButton.js";
export const ChatComposer = forwardRef(function ChatComposer({ textarea, leadingActions, controls, trailingActions, beforeInput, decoration, className = "", ...submit }, ref) {
    return _jsxs("div", { className: `chat-input-shell mithril-composer ${className}`, children: [_jsxs("div", { className: "chat-input-wrapper", children: [beforeInput, _jsx(ChatTextarea, { ...textarea, ref: ref, className: `chat-input ${textarea.className ?? ""}`, onSend: () => { if (!submit.disabled)
                            submit.onSend?.(); } }), _jsxs("div", { className: "chat-input-toolbar", children: [leadingActions, leadingActions && controls && _jsx("span", { className: "chat-input-toolbar-divider", "aria-hidden": "true" }), controls, _jsx("div", { className: "chat-input-toolbar-spacer" }), trailingActions, _jsx(ChatSubmitButton, { ...submit, className: `chat-send-btn${submit.busy ? " chat-stop-btn" : ""}` })] })] }), decoration] });
});
/** Uses Desktop's tab strip, including its avatar, activity and close affordances. */
export function ChatTabs({ tabs, activeId, onSelect, onClose, onNew, newLabel, closeLabel = "Close tab", disabled, showTabs = true, actions, className = "" }) {
    return _jsxs("div", { className: `active-sessions-bar mithril-chat-tabs ${className}`, children: [_jsx("div", { className: "mithril-chat-tablist", role: "tablist", "aria-label": "Conversations", children: showTabs && tabs.map(tab => _jsxs("div", { className: `active-session-chip ${tab.id === activeId ? "active" : ""}${tab.busy ? " loading" : ""}`, children: [_jsxs("button", { type: "button", role: "tab", className: "mithril-chat-tab-select", "aria-selected": tab.id === activeId, disabled: disabled, title: tab.description ?? tab.title, onClick: () => onSelect(tab.id), onKeyDown: event => {
                                const enabledTabs = tabs;
                                let index = enabledTabs.findIndex(item => item.id === tab.id);
                                if (event.key === "ArrowRight")
                                    index = (index + 1) % enabledTabs.length;
                                else if (event.key === "ArrowLeft")
                                    index = (index - 1 + enabledTabs.length) % enabledTabs.length;
                                else if (event.key === "Home")
                                    index = 0;
                                else if (event.key === "End")
                                    index = enabledTabs.length - 1;
                                else
                                    return;
                                event.preventDefault();
                                const next = enabledTabs[index];
                                if (next) {
                                    onSelect(next.id);
                                    const buttons = event.currentTarget.closest('[role="tablist"]')?.querySelectorAll('[role="tab"]');
                                    buttons?.[index]?.focus();
                                }
                            }, children: [tab.avatar && _jsx("span", { className: "active-session-chip-avatar", children: tab.avatar }), _jsx("span", { className: "active-session-chip-title", children: tab.title }), tab.busy ? _jsx(LoaderCircle, { size: 14, className: "mithril-tool-spinner", "aria-label": tab.state ?? "Working" }) : tab.state === "uncertain" ? _jsx("span", { "aria-label": tab.state, children: "!" }) : null] }), onClose && _jsx("button", { type: "button", className: "active-session-chip-close", title: closeLabel, "aria-label": `${closeLabel}: ${tab.title}`, disabled: disabled, onClick: () => onClose(tab.id), children: _jsx(X, { size: 12 }) })] }, tab.id)) }), showTabs && _jsx("button", { type: "button", className: "active-session-new", "aria-label": newLabel, title: newLabel, disabled: disabled, onClick: onNew, children: _jsx(Plus, { size: 14 }) }), actions] });
}
/** Rendering of tool receipts stays in the consumer; disclosure behavior is shared. */
export function ToolActivity({ title, detail, active, icon, children, className = "", label }) {
    const [open, setOpen] = useState(false);
    const id = useId();
    return _jsxs("div", { className: `chat-tool-group mithril-tool-activity${active ? " chat-tool-group--active" : ""} ${className}`, role: "group", "aria-label": label, children: [_jsxs("button", { type: "button", className: "chat-tool-group-summary", "aria-expanded": open, "aria-controls": id, onClick: () => setOpen(value => !value), children: [active ? _jsx(LoaderCircle, { size: 16, className: "mithril-tool-spinner", "aria-label": "Working" }) : icon ?? _jsx(Wrench, { size: 13, className: "chat-tool-group-icon" }), _jsx("span", { className: "chat-tool-group-name", children: title }), detail && _jsx("span", { className: "chat-tool-group-detail", children: detail }), _jsx(ChevronRight, { size: 14, className: `chat-tool-group-chevron${open ? " chat-tool-group-chevron--open" : ""}` })] }), _jsx("div", { id: id, hidden: !open, className: "chat-tool-group-items", children: children })] });
}
export function ChatWelcome({ logo, title, hint, suggestions, onSelect, action }) {
    return _jsxs("div", { className: "chat-empty mithril-chat-welcome", children: [_jsx("div", { className: "chat-empty-icon", children: logo }), _jsx("h1", { className: "chat-empty-text", children: title }), _jsx("p", { className: "chat-empty-hint", children: hint }), suggestions.length > 0 && _jsx("div", { className: "chat-empty-suggestions", children: suggestions.map(item => _jsxs("button", { type: "button", className: "chat-suggestion", onClick: () => onSelect(item.prompt), children: [item.icon, item.label] }, item.id)) }), action] });
}
export function WorkspaceNavigation({ items, label = "Workspace", className = "" }) {
    return _jsx("nav", { "aria-label": label, className: `sidebar-nav mithril-workspace-navigation ${className}`, children: items.map(item => _jsxs("button", { type: "button", className: `sidebar-nav-item ${item.active ? "active" : ""} ${item.className ?? ""}`, "aria-label": item.label, title: item.label, "aria-current": item.active ? "page" : undefined, disabled: item.disabled, onClick: item.onSelect, children: [item.icon, _jsx("span", { className: "sidebar-nav-label", children: item.label })] }, item.id)) });
}
/** Desktop and Web use the same full-height conversation surface. */
export const ChatSurface = forwardRef(function ChatSurface({ className = "", ...props }, ref) {
    return _jsx("div", { ...props, ref: ref, className: `mithril-chat-surface ${className}` });
});
