import { ArrowUp, Square } from "lucide-react";

export interface ChatSubmitButtonProps {
  busy: boolean;
  disabled?: boolean;
  sendLabel: string;
  stopLabel: string;
  onSend?(): void;
  onStop(): void;
  className?: string;
  sendIconSize?: number;
  stopIconSize?: number;
}

export function ChatSubmitButton({ busy, disabled, sendLabel, stopLabel, onSend, onStop,
  className = "chat-send-btn", sendIconSize = 18, stopIconSize = 15 }: ChatSubmitButtonProps) {
  const label = busy ? stopLabel : sendLabel;
  return <button type={busy || onSend ? "button" : "submit"} className={className}
    aria-label={label} title={label} disabled={!busy && disabled} onClick={busy ? onStop : onSend}>
    {busy ? <Square size={stopIconSize} /> : <ArrowUp size={sendIconSize} />}
  </button>;
}
