import React from 'react';
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
        <Button as={NextLink} color="primary" href="/login" variant="flat">
          Sign Up
        </Button>
      )}
      {user && (
        <Dropdown placement="bottom-end">
          <NavbarItem>
            <DropdownTrigger>
              <Avatar
                id="avatar"
                isBordered
                className="transition-transform"
                color="secondary"
                name={user.displayName || user.email}
                size="sm"
                src={user.photoURL}
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
