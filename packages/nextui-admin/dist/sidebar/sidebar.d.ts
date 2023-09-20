import React from 'react';
import { type AdminNavHeader } from './companies-dropdown';
interface SidebarItemConfig {
    title: string;
    icon: React.ReactNode;
    href: string;
}
export interface SidebarSectionConfig {
    title: string | null;
    items: SidebarItemConfig[];
}
interface Props {
    sidebarConfig: SidebarSectionConfig[];
    adminNavHeader: AdminNavHeader;
}
export declare const SidebarWrapper: ({ sidebarConfig, adminNavHeader }: Props) => import("react/jsx-runtime").JSX.Element;
export {};
