import {cleanup, fireEvent, render, screen} from "@testing-library/react";
import {afterEach, expect, it} from "vitest";
import {renderToString} from "react-dom/server";
import {PublicNavigation} from "../../dist/react/index.js";
afterEach(cleanup);
const items = [{id:"products", label:"Products", links:[{id:"one", label:"Knowledge", href:"/knowledge", description:"Source-linked data"}]}, {id:"pricing", label:"Pricing", href:"/pricing"}];
it("server-renders real link destinations and descriptions without browser globals", () => {
 const html = renderToString(<PublicNavigation items={items} label="Primary"/>);
 expect(html).toContain('href="/knowledge"'); expect(html).toContain('Source-linked data'); expect(html).toContain('<summary>Products');
});
it("closes with Escape and restores focus, closes on outside interaction and link selection", () => {
 const view=render(<PublicNavigation items={items} label="Primary"/>);
 const details=view.container.querySelector('details')!; const summary=details.querySelector('summary')!;
 details.open=true; fireEvent.keyDown(summary,{key:'Escape'}); expect(details.open).toBe(false); expect(document.activeElement).toBe(summary);
 details.open=true; fireEvent.pointerDown(document.body); expect(details.open).toBe(false);
 details.open=true; fireEvent.click(screen.getByRole('link',{name:'Knowledge Source-linked data'})); expect(details.open).toBe(false);
 expect(screen.getByRole('link',{name:'Pricing'}).getAttribute('href')).toBe('/pricing');
});
it("allows the consumer to own routing while retaining the shared disclosure", () => {
 render(<PublicNavigation items={items} label="Primary" renderLink={(item,children)=><a href={item.href} data-adapter="web">{children}</a>}/>);
 expect(screen.getByRole('link',{name:'Pricing'}).getAttribute('data-adapter')).toBe('web');
});
