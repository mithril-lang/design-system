import { type ReactNode } from "react";
export interface PublicNavigationLink {
    id: string;
    label: string;
    href: string;
    description?: string;
}
export type PublicNavigationItem = PublicNavigationLink | {
    id: string;
    label: string;
    links: PublicNavigationLink[];
};
export interface PublicNavigationProps {
    items: PublicNavigationItem[];
    label: string;
    className?: string;
    renderLink?: (link: PublicNavigationLink, children: ReactNode) => ReactNode;
}
/** Native disclosures and real links work before JavaScript loads. Routing remains a consumer adapter. */
export declare function PublicNavigation({ items, label, className, renderLink }: PublicNavigationProps): import("react").JSX.Element;
