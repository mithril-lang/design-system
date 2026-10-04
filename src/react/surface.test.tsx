import {cleanup, fireEvent, render, screen} from "@testing-library/react";
import {afterEach, expect, it, vi} from "vitest";
import {ChatComposer, ChatTabs, ChatWelcome, ToolActivity, WorkspaceNavigation} from "../../dist/react/index.js";
afterEach(cleanup);
it("the packaged Desktop composer owns Enter, IME, Send/Stop and platform slots",()=>{
 const send=vi.fn(),stop=vi.fn();
 const props={busy:false,sendLabel:"Send",stopLabel:"Stop",onSend:send,onStop:stop,textarea:{"aria-label":"Message",defaultValue:"Plan"},controls:<button type="button">Model</button>,leadingActions:<button type="button">Attach</button>,decoration:<span data-testid="decoration"/>};
 const view=render(<ChatComposer {...props}/>);
 const input=screen.getByRole("textbox");fireEvent.compositionStart(input);fireEvent.keyDown(input,{key:"Enter"});expect(send).not.toHaveBeenCalled();fireEvent.compositionEnd(input);fireEvent.keyDown(input,{key:"Enter"});expect(send).toHaveBeenCalledTimes(1);
 expect(view.container.querySelector('.chat-input-wrapper')?.contains(screen.getByTestId('decoration'))).toBe(false);
 view.rerender(<ChatComposer {...props} busy/>);fireEvent.click(screen.getByRole('button',{name:'Stop'}));expect(stop).toHaveBeenCalledTimes(1);expect(send).toHaveBeenCalledTimes(1);
});
it("switches tabs with keyboard and closes a tab without selecting it",()=>{
 const select=vi.fn(),close=vi.fn();render(<ChatTabs tabs={[{id:'a',title:'One'},{id:'b',title:'Two'}]} activeId="a" onSelect={select} onClose={close} onNew={vi.fn()} newLabel="New"/>);
 fireEvent.keyDown(screen.getByRole('tab',{name:'One'}),{key:'ArrowRight'});expect(select).toHaveBeenLastCalledWith('b');expect(document.activeElement).toBe(screen.getByRole('tab',{name:'Two'}));select.mockClear();fireEvent.click(screen.getByRole('button',{name:'Close tab: Two'}));expect(close).toHaveBeenCalledWith('b');expect(select).not.toHaveBeenCalled();
});
it("keeps tool results mounted while exposing only the expanded content",()=>{
 render(<ToolActivity title="2 tools called" label="Tool history"><button>Inspect receipt</button></ToolActivity>);
 const toggle=screen.getByRole('button',{name:'2 tools called'});expect(toggle.getAttribute('aria-expanded')).toBe('false');expect(screen.queryByRole('button',{name:'Inspect receipt'})).toBeNull();fireEvent.click(toggle);expect(screen.getByRole('button',{name:'Inspect receipt'})).toBeTruthy();fireEvent.click(toggle);expect(screen.queryByRole('button',{name:'Inspect receipt'})).toBeNull();expect(screen.getByText('Inspect receipt')).toBeTruthy();
});
it("welcome and navigation invoke only explicitly selected adapter actions",()=>{
 const prompt=vi.fn(),go=vi.fn();render(<><ChatWelcome logo={<span>M</span>} title="Welcome" hint="Work together" suggestions={[{id:'plan',label:'Plan',prompt:'Plan my work'}]} onSelect={prompt}/><WorkspaceNavigation items={[{id:'office',label:'Office',icon:<span>O</span>,onSelect:go}]}/></>);
 expect(prompt).not.toHaveBeenCalled();expect(go).not.toHaveBeenCalled();fireEvent.click(screen.getByRole('button',{name:'Plan'}));expect(prompt).toHaveBeenCalledWith('Plan my work');fireEvent.click(screen.getByRole('button',{name:'Office'}));expect(go).toHaveBeenCalledTimes(1);
});
