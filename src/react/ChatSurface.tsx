import { forwardRef, useId, useState, type HTMLAttributes, type ReactNode } from "react";
import { ChevronRight, LoaderCircle, Plus, Wrench, X } from "lucide-react";
import { ChatTextarea, type ChatTextareaProps } from "./ChatTextarea.js";
import { ChatSubmitButton, type ChatSubmitButtonProps } from "./ChatSubmitButton.js";

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
export const ChatComposer = forwardRef<HTMLTextAreaElement, ChatComposerProps>(function ChatComposer({
  textarea, leadingActions, controls, trailingActions, beforeInput, decoration, className = "", ...submit
}, ref) {
  return <div className={`chat-input-shell mithril-composer ${className}`}>
    <div className="chat-input-wrapper">
      {beforeInput}
      <ChatTextarea {...textarea} ref={ref} className={`chat-input ${textarea.className ?? ""}`} onSend={() => { if (!submit.disabled) submit.onSend?.(); }} />
      <div className="chat-input-toolbar">
        {leadingActions}
        {leadingActions && controls && <span className="chat-input-toolbar-divider" aria-hidden="true" />}
        {controls}
        <div className="chat-input-toolbar-spacer" />
        {trailingActions}
        <ChatSubmitButton {...submit} className={`chat-send-btn${submit.busy ? " chat-stop-btn" : ""}`} />
      </div>
    </div>
    {decoration}
  </div>;
});

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
export function ChatTabs({tabs, activeId, onSelect, onClose, onNew, newLabel, closeLabel = "Close tab", disabled, showTabs = true, actions, className = ""}: ChatTabsProps) {
  return <div className={`active-sessions-bar mithril-chat-tabs ${className}`}>
    <div className="mithril-chat-tablist" role="tablist" aria-label="Conversations">
      {showTabs && tabs.map(tab => <div key={tab.id} className={`active-session-chip ${tab.id === activeId ? "active" : ""}${tab.busy ? " loading" : ""}`}>
        <button type="button" role="tab" className="mithril-chat-tab-select" aria-selected={tab.id === activeId} disabled={disabled}
          title={tab.description ?? tab.title} onClick={() => onSelect(tab.id)} onKeyDown={event => {
            const enabledTabs = tabs;
            let index = enabledTabs.findIndex(item => item.id === tab.id);
            if (event.key === "ArrowRight") index = (index + 1) % enabledTabs.length;
            else if (event.key === "ArrowLeft") index = (index - 1 + enabledTabs.length) % enabledTabs.length;
            else if (event.key === "Home") index = 0;
            else if (event.key === "End") index = enabledTabs.length - 1;
            else return;
            event.preventDefault();
            const next = enabledTabs[index];
            if (next) {
              onSelect(next.id);
              const buttons = event.currentTarget.closest('[role="tablist"]')?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
              buttons?.[index]?.focus();
            }
          }}>
          {tab.avatar && <span className="active-session-chip-avatar">{tab.avatar}</span>}
          <span className="active-session-chip-title">{tab.title}</span>
          {tab.busy ? <LoaderCircle size={14} className="mithril-tool-spinner" aria-label={tab.state ?? "Working"}/> : tab.state === "uncertain" ? <span aria-label={tab.state}>!</span> : null}
        </button>
        {onClose && <button type="button" className="active-session-chip-close" title={closeLabel} aria-label={`${closeLabel}: ${tab.title}`} disabled={disabled} onClick={() => onClose(tab.id)}><X size={12}/></button>}
      </div>)}
    </div>
    {showTabs && <button type="button" className="active-session-new" aria-label={newLabel} title={newLabel} disabled={disabled} onClick={onNew}><Plus size={14}/></button>}
    {actions}
  </div>;
}

/** Rendering of tool receipts stays in the consumer; disclosure behavior is shared. */
export function ToolActivity({title, detail, active, icon, children, className = "", label}: {title: string; detail?: ReactNode; active?: boolean; icon?: ReactNode; children: ReactNode; className?: string; label?: string}) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return <div className={`chat-tool-group mithril-tool-activity${active ? " chat-tool-group--active" : ""} ${className}`} role="group" aria-label={label}>
    <button type="button" className="chat-tool-group-summary" aria-expanded={open} aria-controls={id} onClick={() => setOpen(value => !value)}>
      {active ? <LoaderCircle size={16} className="mithril-tool-spinner" aria-label="Working"/> : icon ?? <Wrench size={13} className="chat-tool-group-icon"/>}
      <span className="chat-tool-group-name">{title}</span>
      {detail && <span className="chat-tool-group-detail">{detail}</span>}
      <ChevronRight size={14} className={`chat-tool-group-chevron${open ? " chat-tool-group-chevron--open" : ""}`}/>
    </button>
    <div id={id} hidden={!open} className="chat-tool-group-items">{children}</div>
  </div>;
}

export interface ChatSuggestion {id: string; label: string; prompt: string; icon?: ReactNode}
export function ChatWelcome({logo, title, hint, suggestions, onSelect, action}: {logo: ReactNode; title: string; hint: string; suggestions: ChatSuggestion[]; onSelect(prompt: string): void; action?: ReactNode}) {
  return <div className="chat-empty mithril-chat-welcome">
    <div className="chat-empty-icon">{logo}</div>
    <h1 className="chat-empty-text">{title}</h1>
    <p className="chat-empty-hint">{hint}</p>
    {suggestions.length > 0 && <div className="chat-empty-suggestions">{suggestions.map(item => <button key={item.id} type="button" className="chat-suggestion" onClick={() => onSelect(item.prompt)}>{item.icon}{item.label}</button>)}</div>}
    {action}
  </div>;
}

export interface WorkspaceNavigationItem {id: string; label: string; icon: ReactNode; onSelect(): void; active?: boolean; disabled?: boolean; className?: string}
export function WorkspaceNavigation({items, label = "Workspace", className = ""}: {items: WorkspaceNavigationItem[]; label?: string; className?: string}) {
  return <nav aria-label={label} className={`sidebar-nav mithril-workspace-navigation ${className}`}>{items.map(item => <button key={item.id} type="button" className={`sidebar-nav-item ${item.active ? "active" : ""} ${item.className ?? ""}`} aria-label={item.label} title={item.label} aria-current={item.active ? "page" : undefined} disabled={item.disabled} onClick={item.onSelect}>{item.icon}<span className="sidebar-nav-label">{item.label}</span></button>)}</nav>;
}

/** Desktop and Web use the same full-height conversation surface. */
export const ChatSurface = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function ChatSurface({className = "", ...props}, ref) {
  return <div {...props} ref={ref} className={`mithril-chat-surface ${className}`}/>;
});
