import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef, useRef } from "react";
/** Runs app keyboard navigation first; Enter sends only if it was not consumed. */
export const ChatTextarea = forwardRef(function ChatTextarea({ onSend, onKeyDown, onCompositionStart, onCompositionEnd, ...props }, ref) {
    const composing = useRef(false);
    return _jsx("textarea", { ...props, ref: ref, onCompositionStart: event => { composing.current = true; onCompositionStart?.(event); }, onCompositionEnd: event => { composing.current = false; onCompositionEnd?.(event); }, onKeyDown: event => {
            if (composing.current || event.nativeEvent.isComposing || event.keyCode === 229 || event.nativeEvent.keyCode === 229)
                return;
            onKeyDown?.(event);
            if (!event.defaultPrevented && event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                if (!props.disabled && !props.readOnly)
                    onSend();
            }
        } });
});
