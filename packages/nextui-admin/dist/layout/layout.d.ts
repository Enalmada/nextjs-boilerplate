import React from 'react';
import { type UserDropdownConfig } from '../navbar/user-dropdown';
import { type AdminNavHeader } from '../sidebar/companies-dropdown';
import { type SidebarSectionConfig } from '../sidebar/sidebar';
interface Props {
    sidebarConfig: SidebarSectionConfig[];
    adminNavHeader: AdminNavHeader;
    children: React.ReactNode;
    userDropdownConfig: UserDropdownConfig;
}
export declare const Layout: ({ sidebarConfig, adminNavHeader, userDropdownConfig, children }: Props) => import("react/jsx-runtime").JSX.Element;
export {};
