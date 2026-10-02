import { type TextareaHTMLAttributes } from "react";
export interface ChatTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    /** The app owns readiness, attachments, queuing and the actual request. */
    onSend(): void;
}
/** Runs app keyboard navigation first; Enter sends only if it was not consumed. */
export declare const ChatTextarea: import("react").ForwardRefExoticComponent<ChatTextareaProps & import("react").RefAttributes<HTMLTextAreaElement>>;
