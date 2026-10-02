import type { HTMLAttributes } from "react";

export interface ChatBubbleProps extends HTMLAttributes<HTMLDivElement> {
  role: "user" | "agent";
  error?: boolean;
}

/** Contents (media, approvals, status and actions) remain explicit app slots. */
export function ChatBubble({ role, error, className = "", ...props }: ChatBubbleProps) {
  return <div {...props} className={`chat-bubble chat-bubble-${role}${error ? " chat-bubble-error" : ""}${className ? ` ${className}` : ""}`} />;
}
