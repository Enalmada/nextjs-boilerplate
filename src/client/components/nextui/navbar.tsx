import React from 'react';
import NextLink from 'next/link';
import AppDropdown from '@/client/components/layout/app/DropdownMenu';
import {
  DiscordIcon,
  GithubIcon,
  Logo,
  SearchIcon,
  TwitterIcon,
} from '@/client/components/nextui/icons';
import { siteConfig } from '@/client/components/nextui/site';
import { ThemeSwitch } from '@/client/components/nextui/theme-switch';
import { Input } from '@nextui-org/input';
import { Link } from '@nextui-org/link';
import {
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Navbar as NextUINavbar,
} from '@nextui-org/navbar';
import { link as linkStyles } from '@nextui-org/theme';
import clsx, { type ClassValue } from 'clsx';

interface SearchInputProps {
  id: string;
}

// TODO fix hack_to_stop_ssr_error

export const Navbar = () => {
  const SearchInput = ({ id }: SearchInputProps) => (
    <Input
      id={id}
      name="searchInput"
      aria-label="Search"
      aria-describedby="hack_to_stop_ssr_error"
      classNames={{
        inputWrapper: 'bg-default-100',
        input: 'text-sm',
      }}
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="pointer-events-none flex-shrink-0 text-base text-default-400" />
      }
      type="search"
    />
  );

  const navbarItemClassName: ClassValue[] = [
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    linkStyles({ color: 'foreground' }) as ClassValue,
    'data-[active=true]:font-medium data-[active=true]:text-primary',
  ];

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="max-w-fit gap-3">
          <NextLink
            className="flex items-center justify-start gap-1 text-black dark:text-white"
            href="/app"
          >
            <Logo />
            <p className="font-bold text-inherit">ACME</p>
          </NextLink>
        </NavbarBrand>
        <ul className="ml-2 hidden justify-start gap-4 lg:flex">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink className={clsx(navbarItemClassName)} color="foreground" href={item.href}>
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent className="hidden basis-1/5 sm:flex sm:basis-full" justify="end">
        <NavbarItem className="hidden gap-2 sm:flex">
          <Link isExternal href={siteConfig.links.twitter} aria-label="Twitter">
            <TwitterIcon className="text-default-500" />
          </Link>
          <Link isExternal href={siteConfig.links.discord} aria-label="Discord">
            <DiscordIcon className="text-default-500" />
          </Link>
          <Link isExternal href={siteConfig.links.github} aria-label="Github">
            <GithubIcon className="text-default-500" />
          </Link>
          <ThemeSwitch id="navbar" />
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <SearchInput id="navbar" />
        </NavbarItem>
        <NavbarItem className="hidden md:flex">
          <AppDropdown />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="basis-1 pl-4 sm:hidden" justify="end">
        <Link isExternal href={siteConfig.links.github} aria-label="Github">
          <GithubIcon className="text-default-500" />
        </Link>
        <ThemeSwitch id="menu" />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <SearchInput id="menu" />
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item.label}`}>
              <Link
                color={
                  index === 2
                    ? 'primary'
                    : index === siteConfig.navMenuItems.length - 1
                    ? 'danger'
                    : 'foreground'
                }
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
