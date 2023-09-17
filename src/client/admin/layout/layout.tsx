'use client';

import React from 'react';
import { type UserDropdownConfig } from '@/client/admin';

import { useLockedBody } from '../hooks/useBodyLock';
import { NavbarWrapper } from '../navbar/navbar';
import { type AdminNavHeader } from '../sidebar/companies-dropdown';
import { SidebarWrapper, type SidebarSectionConfig } from '../sidebar/sidebar';
import { SidebarContext } from './layout-context';

interface Props {
  sidebarConfig: SidebarSectionConfig[];
  adminNavHeader: AdminNavHeader;
  children: React.ReactNode;
  userDropdownConfig: UserDropdownConfig;
}

export const Layout = ({ sidebarConfig, adminNavHeader, userDropdownConfig, children }: Props) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setLocked] = useLockedBody(false);
  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setLocked(!sidebarOpen);
  };

  return (
    <SidebarContext.Provider
      value={{
        collapsed: sidebarOpen,
        setCollapsed: handleToggleSidebar,
      }}
    >
      <section className="flex">
        <SidebarWrapper sidebarConfig={sidebarConfig} adminNavHeader={adminNavHeader} />
        <NavbarWrapper userDropdownConfig={userDropdownConfig}>{children}</NavbarWrapper>
      </section>
    </SidebarContext.Provider>
  );
};
