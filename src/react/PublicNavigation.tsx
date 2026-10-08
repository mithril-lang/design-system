import { useEffect, useId, useRef, type ReactNode } from "react";

export interface PublicNavigationLink { id: string; label: string; href: string; description?: string }
export type PublicNavigationItem = PublicNavigationLink | { id: string; label: string; links: PublicNavigationLink[] };
export interface PublicNavigationProps {
  items: PublicNavigationItem[];
  label: string;
  className?: string;
  renderLink?: (link: PublicNavigationLink, children: ReactNode) => ReactNode;
}

/** Native disclosures and real links work before JavaScript loads. Routing remains a consumer adapter. */
export function PublicNavigation({items, label, className = "", renderLink}: PublicNavigationProps) {
  const root = useRef<HTMLElement>(null);
  const group = useId();
  useEffect(() => {
    const outside = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) root.current?.querySelectorAll("details[open]").forEach(node => node.removeAttribute("open"));
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, []);
  const link = (item: PublicNavigationLink) => {
    const children = <><span className="mithril-public-navigation-label">{item.label}</span>{item.description ? <span className="mithril-public-navigation-description">{item.description}</span> : null}</>;
    return renderLink ? renderLink(item, children) : <a href={item.href}>{children}</a>;
  };
  return <nav ref={root} aria-label={label} className={`mithril-public-navigation ${className}`} onKeyDown={event => {
    if (event.key !== "Escape") return;
    const open = root.current?.querySelector<HTMLDetailsElement>("details[open]");
    if (open) { open.open = false; open.querySelector("summary")?.focus(); event.preventDefault(); }
  }} onClick={event => {
    if ((event.target as Element).closest("a")) root.current?.querySelectorAll("details[open]").forEach(node => node.removeAttribute("open"));
  }}>
    <ul>{items.map(item => <li key={item.id}>{"links" in item ? <details name={group} onToggle={event => {
      if (event.currentTarget.open) root.current?.querySelectorAll("details[open]").forEach(node => { if (node !== event.currentTarget) node.removeAttribute("open"); });
    }}>
      <summary>{item.label}<span aria-hidden="true" className="mithril-public-navigation-chevron">⌄</span></summary>
      <ul className="mithril-public-navigation-panel">{item.links.map(child => <li key={child.id}>{link(child)}</li>)}</ul>
    </details> : link(item)}</li>)}</ul>
  </nav>;
}
