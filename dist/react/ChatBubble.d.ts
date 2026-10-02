import type { HTMLAttributes } from "react";
export interface ChatBubbleProps extends HTMLAttributes<HTMLDivElement> {
    role: "user" | "agent";
    error?: boolean;
}
/** Contents (media, approvals, status and actions) remain explicit app slots. */
export declare function ChatBubble({ role, error, className, ...props }: ChatBubbleProps): import("react").JSX.Element;
