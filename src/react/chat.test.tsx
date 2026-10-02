import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { AgentMarkdown as DistributedMarkdown } from "../../dist/react/index.js";
import { AgentMarkdown, ChatBubble, ChatSubmitButton, ChatTextarea, type MarkdownPlatform } from "./index";

afterEach(cleanup);
const adapter = (): MarkdownPlatform => ({ copyText: vi.fn(async () => {}), labels: { copy: "Copy code", copied: "Copied", showMore: "Show more", showLess: "Show less" } });

describe("shared chat across platforms", () => {
  it("loads the distributed renderer's Prism module and keeps box diagrams plain", async () => {
    const view = render(<DistributedMarkdown platform={adapter()}>{'```ts\nconst answer: number = 42;\n```'}</DistributedMarkdown>);
    await waitFor(() => expect(view.container.querySelector('.token')).not.toBeNull(), { timeout: 5000 });
    view.rerender(<DistributedMarkdown platform={adapter()}>{'```text\n├── src\n└── main.ts\n```'}</DistributedMarkdown>);
    expect(view.container.querySelector('.chat-code-plain')).toBeTruthy();
    expect(view.container.querySelector('.token')).toBeNull();
  }, 10000);
  it("routes clipboard and safe navigation through the supplied adapter", async () => {
    const platform = { ...adapter(), openLink: vi.fn() };
    render(<AgentMarkdown platform={platform}>{'[Link](https://mithril.fund)\n\n```diff\n+shared\n```'}</AgentMarkdown>);
    fireEvent.click(screen.getByRole("link", { name: "Link" }));
    expect(platform.openLink).toHaveBeenCalledWith("https://mithril.fund");
    fireEvent.click(screen.getByRole("button", { name: "Copy code" }));
    await waitFor(() => expect(screen.getByText("Copied")).toBeTruthy());
    expect(platform.copyText).toHaveBeenCalledWith("+shared");
  });
  it("never fetches model images by default and lets Desktop supply media", () => {
    const first = render(<AgentMarkdown platform={adapter()}>{'![Private image](https://example.com/track.png)'}</AgentMarkdown>);
    expect(first.container.querySelector('img')).toBeNull();
    expect(screen.getByText('Private image')).toBeTruthy();
    first.unmount();
    const renderImage = vi.fn(() => <span>Native media</span>);
    render(<AgentMarkdown platform={{ ...adapter(), renderImage }}>{'![file](./local.png)'}</AgentMarkdown>);
    expect(renderImage).toHaveBeenCalledWith('./local.png', 'file');
    expect(screen.getByText('Native media')).toBeTruthy();
  });
  it("isolates expanded code blocks between replies and retains expansion during streaming", () => {
    const text = '```diff\n' + '+line\n'.repeat(16) + '```';
    const platform = adapter();
    const view = render(<><AgentMarkdown platform={platform}>{text}</AgentMarkdown><AgentMarkdown platform={platform}>{text}</AgentMarkdown></>);
    fireEvent.click(screen.getAllByText('Show more')[0]);
    expect(screen.getAllByText('Show less')).toHaveLength(1);
    expect(screen.getAllByText('Show more')).toHaveLength(1);
    view.rerender(<><AgentMarkdown platform={platform}>{text + '\n\nstreaming'}</AgentMarkdown><AgentMarkdown platform={platform}>{text}</AgentMarkdown></>);
    expect(screen.getAllByText('Show less')).toHaveLength(1);
  });
  it("blocks IME finalizing Enter and Shift+Enter, and preserves app keyboard navigation", () => {
    const onSend = vi.fn();
    render(<ChatTextarea aria-label="Message" onSend={onSend} onKeyDown={event => { if (event.key === 'Tab') event.preventDefault(); }} />);
    const input = screen.getByRole('textbox');
    fireEvent.compositionStart(input);
    fireEvent.keyDown(input, { key: 'Enter' });
    fireEvent.compositionEnd(input);
    fireEvent.keyDown(input, { key: 'Enter', keyCode: 229 });
    fireEvent.keyDown(input, { key: 'Enter', isComposing: true });
    fireEvent.keyDown(input, { key: 'Enter', shiftKey: true });
    expect(onSend).not.toHaveBeenCalled();
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onSend).toHaveBeenCalledTimes(1);
  });
  it("allows app slash selection to consume Enter without sending", () => {
    const onSend = vi.fn();
    render(<ChatTextarea onSend={onSend} onKeyDown={event => event.preventDefault()} />);
    fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter' });
    expect(onSend).not.toHaveBeenCalled();
  });
  it("keeps Stop actionable while Send is gated and supports native and form submission", () => {
    const onStop = vi.fn(), onSend = vi.fn();
    const view = render(<ChatSubmitButton busy disabled sendLabel="Send" stopLabel="Stop" onStop={onStop} onSend={onSend} />);
    fireEvent.click(screen.getByRole('button', { name: 'Stop' }));
    expect(onStop).toHaveBeenCalledOnce();
    expect(onSend).not.toHaveBeenCalled();
    view.rerender(<ChatSubmitButton busy={false} disabled sendLabel="Send" stopLabel="Stop" onStop={onStop} />);
    expect(screen.getByRole('button').getAttribute('type')).toBe('submit');
    expect((screen.getByRole('button') as HTMLButtonElement).disabled).toBe(true);
  });
  it("retains bubble CSS and error state around app slots", () => {
    const { container } = render(<ChatBubble role="agent" error><span>Approval slot</span></ChatBubble>);
    expect(container.querySelector('.chat-bubble-agent.chat-bubble-error')).toBeTruthy();
    expect(screen.getByText('Approval slot')).toBeTruthy();
  });
});
