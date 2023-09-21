import React from 'react';
import { Navbar, NavbarContent } from '@nextui-org/react';

import { BurguerButton } from './burguer-button';
import { UserDropdown, type UserDropdownConfig } from './user-dropdown';

interface Props {
  children: React.ReactNode;
  userDropdownConfig: UserDropdownConfig;
}

export const NavbarWrapper = ({ userDropdownConfig, children }: Props) => {
  return (
    <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
      <Navbar
        isBordered
        className="w-full"
        classNames={{
          wrapper: 'w-full max-w-full',
        }}
      >
        <NavbarContent className="md:hidden">
          <BurguerButton />
        </NavbarContent>
        <NavbarContent className="w-full max-md:hidden"></NavbarContent>
        <NavbarContent justify="end" className="w-fit data-[justify=end]:flex-grow-0">
          <NavbarContent>
            <UserDropdown userDropdownConfig={userDropdownConfig} />
          </NavbarContent>
        </NavbarContent>
      </Navbar>
      {children}
    </div>
  );
};
