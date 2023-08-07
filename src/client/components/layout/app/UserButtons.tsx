import React from 'react';
import Image from 'next/image';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/firebase/auth/context';
import { Avatar } from '@nextui-org/avatar';
import { Button } from '@nextui-org/button';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown';
import { NavbarItem } from '@nextui-org/navbar';

export default function UserButtons() {
  const { user } = useAuth();
  const router = useRouter();

  const items: Record<string, string> = {
    signed: '/app/profile',
    profile: '/app/profile',
    logout: '/logout',
  };

  return (
    <>
      {!user && (
        <Button as={NextLink} color="primary" href="/login?redirect=/app" variant="flat">
          Sign Up
        </Button>
      )}
      {user && (
        <Dropdown placement="bottom-end">
          <NavbarItem>
            <DropdownTrigger>
              {/* would prefer to use src directly but has a flicker on rehydrate in each page */}
              <Avatar
                id="avatar"
                isBordered
                className="transition-transform"
                color="secondary"
                name={user.displayName || user.email || undefined}
                size="sm"
                showFallback
                fallback={
                  <span className="inline-block h-[2.375rem] w-[2.375rem] overflow-hidden rounded-full bg-gray-100">
                    {user.photoURL && (
                      <Image alt="" height="100" width="100" unoptimized src={user.photoURL} />
                    )}
                    {/* from preline https://preline.co/docs/avatar.html#placeholder-icon*/}
                    {!user.photoURL && (
                      <svg
                        className="h-full w-full text-gray-300"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="0.62854"
                          y="0.359985"
                          width="15"
                          height="15"
                          rx="7.5"
                          fill="white"
                        />
                        <path
                          d="M8.12421 7.20374C9.21151 7.20374 10.093 6.32229 10.093 5.23499C10.093 4.14767 9.21151 3.26624 8.12421 3.26624C7.0369 3.26624 6.15546 4.14767 6.15546 5.23499C6.15546 6.32229 7.0369 7.20374 8.12421 7.20374Z"
                          fill="currentColor"
                        />
                        <path
                          d="M11.818 10.5975C10.2992 12.6412 7.42106 13.0631 5.37731 11.5537C5.01171 11.2818 4.69296 10.9631 4.42107 10.5975C4.28982 10.4006 4.27107 10.1475 4.37419 9.94123L4.51482 9.65059C4.84296 8.95684 5.53671 8.51624 6.30546 8.51624H9.95231C10.7023 8.51624 11.3867 8.94749 11.7242 9.62249L11.8742 9.93184C11.968 10.1475 11.9586 10.4006 11.818 10.5975Z"
                          fill="currentColor"
                        />
                      </svg>
                    )}
                  </span>
                }
              />
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="Profile Actions"
            variant="flat"
            onAction={(key) => router.push(items[key]!)}
          >
            <DropdownItem
              key="signed"
              className="h-14 gap-2"
              textValue={`Signed in as: ${user.email}`}
            >
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{user.email}</p>
            </DropdownItem>
            <DropdownItem key="profile">Profile</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )}
    </>
  );
}
