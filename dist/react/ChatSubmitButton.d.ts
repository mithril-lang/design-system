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
export declare function ChatSubmitButton({ busy, disabled, sendLabel, stopLabel, onSend, onStop, className, sendIconSize, stopIconSize }: ChatSubmitButtonProps): import("react").JSX.Element;
