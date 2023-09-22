import React from 'react';
import { type User } from '@/client/gql/generated/graphql';
import {
  Layout,
  type AdminNavHeader,
  type DropdownItemConfig,
  type SidebarSectionConfig,
  type UserConfig,
  type UserDropdownConfig,
} from 'nextui-admin';
import {
  BiBuildingHouse as AcmeIcon,
  BiCode as CodeIcon,
  BiSolidHome as HomeIcon,
  BiSolidCog as SettingsIcon,
  BiTask as TaskIcon,
  BiSolidUser as UserIcon,
  BiSolidBox as ViewIcon,
} from 'react-icons/bi';

const sidebarConfig: SidebarSectionConfig[] = [
  {
    title: null, // No title for the Home section
    items: [
      {
        title: 'Home',
        icon: <HomeIcon />,
        href: '/admin',
      },
    ],
  },
  {
    title: 'Entities',
    items: [
      {
        title: 'Users',
        icon: <UserIcon />,
        href: '/admin/users',
      },
      {
        title: 'Tasks',
        icon: <TaskIcon />,
        href: '/admin/tasks',
      },
    ],
  },
  {
    title: 'Development',
    items: [
      {
        title: 'Developers',
        icon: <CodeIcon />,
        href: '/admin/developers',
      },
      {
        title: 'View Test Data',
        icon: <ViewIcon />,
        href: '/admin/view',
      },
      {
        title: 'Settings',
        icon: <SettingsIcon />,
        href: '/admin/settings',
      },
    ],
  },
];

const adminNavHeader: AdminNavHeader = {
  name: 'ToDo Co.',
  name2: 'ToDo App',
  logo: <AcmeIcon />,
};

const items: DropdownItemConfig[] = [
  { key: 'signed', label: 'Signed In', isSpecial: true },
  { key: 'marketing', label: 'Marketing', href: '/' },
  { key: 'app', label: 'App', href: '/app' },
  { key: 'logout', label: 'Log Out', href: '/logout', color: 'danger' },
];

interface Props {
  me?: User | null;
  children: React.ReactNode;
}
export default function AdminLayout({ me, children }: Props) {
  const user: UserConfig = {
    displayName: me?.name || 'unavailable',
    email: me?.email || 'unavailable',
    photoURL: 'https://example.com/photo.jpg',
  };

  const userDropdownConfig: UserDropdownConfig = {
    user,
    items,
  };

  return (
    <Layout
      sidebarConfig={sidebarConfig}
      adminNavHeader={adminNavHeader}
      userDropdownConfig={userDropdownConfig}
    >
      <div className="mx-auto my-5 flex w-full max-w-[95rem] flex-col gap-4">{children}</div>
    </Layout>
  );
}
