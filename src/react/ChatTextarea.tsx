import { forwardRef, useRef, type TextareaHTMLAttributes } from "react";

export interface ChatTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** The app owns readiness, attachments, queuing and the actual request. */
  onSend(): void;
}

/** Runs app keyboard navigation first; Enter sends only if it was not consumed. */
export const ChatTextarea = forwardRef<HTMLTextAreaElement, ChatTextareaProps>(function ChatTextarea({
  onSend, onKeyDown, onCompositionStart, onCompositionEnd, ...props
}, ref) {
  const composing = useRef(false);
  return <textarea {...props} ref={ref}
    onCompositionStart={event => { composing.current = true; onCompositionStart?.(event); }}
    onCompositionEnd={event => { composing.current = false; onCompositionEnd?.(event); }}
    onKeyDown={event => {
      if (composing.current || event.nativeEvent.isComposing || event.keyCode === 229 || event.nativeEvent.keyCode === 229) return;
      onKeyDown?.(event);
      if (!event.defaultPrevented && event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        if (!props.disabled && !props.readOnly) onSend();
      }
    }} />;
});
