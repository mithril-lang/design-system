import { type HTMLAttributes, type ReactNode } from "react";
import { type ChatTextareaProps } from "./ChatTextarea.js";
import { type ChatSubmitButtonProps } from "./ChatSubmitButton.js";
/** Desktop's whole composer, with platform operations supplied as explicit slots. */
export interface ChatComposerProps extends Omit<ChatSubmitButtonProps, "className"> {
    textarea: Omit<ChatTextareaProps, "onSend">;
    leadingActions?: ReactNode;
    controls?: ReactNode;
    trailingActions?: ReactNode;
    beforeInput?: ReactNode;
    decoration?: ReactNode;
    className?: string;
}
export declare const ChatComposer: import("react").ForwardRefExoticComponent<ChatComposerProps & import("react").RefAttributes<HTMLTextAreaElement>>;
export interface ChatTab {
    id: string;
    title: string;
    description?: string;
    avatar?: ReactNode;
    busy?: boolean;
    state?: string;
}
export interface ChatTabsProps {
    tabs: ChatTab[];
    activeId: string;
    onSelect(id: string): void;
    onClose?(id: string): void;
    onNew(): void;
    newLabel: string;
    closeLabel?: string;
    disabled?: boolean;
    showTabs?: boolean;
    actions?: ReactNode;
    className?: string;
}
/** Uses Desktop's tab strip, including its avatar, activity and close affordances. */
export declare function ChatTabs({ tabs, activeId, onSelect, onClose, onNew, newLabel, closeLabel, disabled, showTabs, actions, className }: ChatTabsProps): import("react").JSX.Element;
/** Rendering of tool receipts stays in the consumer; disclosure behavior is shared. */
export declare function ToolActivity({ title, detail, active, icon, children, className, label }: {
    title: string;
    detail?: ReactNode;
    active?: boolean;
    icon?: ReactNode;
    children: ReactNode;
    className?: string;
    label?: string;
}): import("react").JSX.Element;
export interface ChatSuggestion {
    id: string;
    label: string;
    prompt: string;
    icon?: ReactNode;
}
export declare function ChatWelcome({ logo, title, hint, suggestions, onSelect, action }: {
    logo: ReactNode;
    title: string;
    hint: string;
    suggestions: ChatSuggestion[];
    onSelect(prompt: string): void;
    action?: ReactNode;
}): import("react").JSX.Element;
export interface WorkspaceNavigationItem {
    id: string;
    label: string;
    icon: ReactNode;
    onSelect(): void;
    active?: boolean;
    disabled?: boolean;
    className?: string;
}
export declare function WorkspaceNavigation({ items, label, className }: {
    items: WorkspaceNavigationItem[];
    label?: string;
    className?: string;
}): import("react").JSX.Element;
/** Desktop and Web use the same full-height conversation surface. */
export declare const ChatSurface: import("react").ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & import("react").RefAttributes<HTMLDivElement>>;
