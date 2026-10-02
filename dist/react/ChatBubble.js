import { jsx as _jsx } from "react/jsx-runtime";
/** Contents (media, approvals, status and actions) remain explicit app slots. */
export function ChatBubble({ role, error, className = "", ...props }) {
    return _jsx("div", { ...props, className: `chat-bubble chat-bubble-${role}${error ? " chat-bubble-error" : ""}${className ? ` ${className}` : ""}` });
}
