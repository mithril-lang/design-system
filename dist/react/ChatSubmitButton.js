import { jsx as _jsx } from "react/jsx-runtime";
import { ArrowUp, Square } from "lucide-react";
export function ChatSubmitButton({ busy, disabled, sendLabel, stopLabel, onSend, onStop, className = "chat-send-btn", sendIconSize = 18, stopIconSize = 15 }) {
    const label = busy ? stopLabel : sendLabel;
    return _jsx("button", { type: busy || onSend ? "button" : "submit", className: className, "aria-label": label, title: label, disabled: !busy && disabled, onClick: event => {
            // Aborting can render this same node as a submit button before the browser
            // performs its default action. Cancel that action before changing state.
            if (busy || onSend)
                event.preventDefault();
            if (busy)
                onStop();
            else
                onSend?.();
        }, children: busy ? _jsx(Square, { size: stopIconSize }) : _jsx(ArrowUp, { size: sendIconSize }) });
}
