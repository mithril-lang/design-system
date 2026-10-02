export interface MarkdownPlatform {
    copyText(text: string): Promise<unknown>;
    openLink?(href: string): void;
    renderImage?(src: string, alt: string): React.ReactNode;
    labels: {
        copy: string;
        copied: string;
        showMore: string;
        showLess: string;
    };
}
export interface AgentMarkdownProps {
    children: string;
    platform: MarkdownPlatform;
}
export declare const AgentMarkdown: import("react").NamedExoticComponent<AgentMarkdownProps>;
