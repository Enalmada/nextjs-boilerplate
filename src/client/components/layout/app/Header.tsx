'use client';

import React from 'react';
import NextLink from 'next/link';
import UserButtons from '@/client/components/layout/app/UserButtons';
import { ThemeSwitch } from '@/client/components/nextui/theme-switch';
import {
  Link,
  NavbarBrand,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Navbar as NextUINavbar,
} from '@nextui-org/react';

import { AcmeLogo } from './AcmeLogo.jsx';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean | undefined>(false);

  const menuItems = [
    {
      key: 'profile',
      label: 'Profile',
      route: '/app/profile',
    },
    {
      key: 'logout',
      label: 'Log Out',
      route: '/logout',
    },
  ];

  // TODO - remove isSSR from dropdown when aria problems are better fixed in nextui
  return (
    <NextUINavbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="2xl"
      isBordered
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden"
        />
        <NavbarBrand as={NextLink} href={'/'} className={'text-black dark:text-white'}>
          <AcmeLogo />
          <p className="font-bold text-inherit">ToDo</p>
        </NavbarBrand>
      </NavbarContent>

      {/*
      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        <NavbarItem>
          <Link color="foreground" as={NextLink} href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" as={NextLink} aria-current="page">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" as={NextLink} href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>
      */}

      <NavbarContent justify="end">
        <ThemeSwitch id="menu" />
        <UserButtons />
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`NavbarMenu-${item.key}-${index}`}>
            <Link
              as={NextLink}
              color={item.key === 'logout' ? 'danger' : 'foreground'}
              className="w-full"
              href={item.route}
              size="lg"
              onPress={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </NextUINavbar>
  );
}
