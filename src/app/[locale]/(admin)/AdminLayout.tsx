'use client';

import React from 'react';
import Image from 'next/image';
import { useAuthorization } from '@/app/[locale]/(admin)/Authorization';
import AdminLoading from '@/app/[locale]/(admin)/loading';
import { ADMIN_ME } from '@/client/gql/admin-queries.gql';
import { type AdminMeQuery } from '@/client/gql/generated/graphql';
import { useQuery } from '@enalmada/next-gql/client';
import {
  Layout,
  type AdminNavHeader,
  type DropdownItemConfig,
  type SidebarSectionConfig,
  type UserConfig,
  type UserDropdownConfig,
} from '@enalmada/nextui-admin';
import { Avatar } from '@nextui-org/react';
import {
  BiBuildingHouse as AcmeIcon,
  BiCode as CodeIcon,
  BiSolidHome as HomeIcon,
  BiTask as TaskIcon,
  BiSolidUser as UserIcon,
} from 'react-icons/bi';

/* ENTITY_HOOK
{
  "todo": "Add correct icon for <%= name %>"
}
*/

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
      /* ENTITY_HOOK
      {
        "toPlacement": "below",
        "replacements": [
          { "find": "Tasks", "replace": "<%= h.inflection.pluralize(h.changeCase.camelCase(name)) %>" },
          { "find": "Task", "replace": "<%= h.changeCase.pascalCase(name) %>" },
          { "find": "tasks", "replace": "<%= h.inflection.pluralize(h.changeCase.camelCase(name)) %>" }
        ]
      }
      */
      {
        title: 'Tasks',
        icon: <TaskIcon />,
        href: '/admin/tasks',
      },
      /* ENTITY_HOOK end */
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
  children: React.ReactNode;
}
export default function AdminLayout({ children }: Props) {
  const [{ data: dataQuery, error: errorQuery }] = useQuery<AdminMeQuery>({ query: ADMIN_ME });

  const hasAuthorization = useAuthorization(dataQuery?.me);

  if (errorQuery) return <div>{`Error! ${errorQuery.message}`}</div>;

  if (!hasAuthorization) {
    return <AdminLoading />;
  }

  const me = dataQuery?.me;

  const user: UserConfig = {
    displayName: me?.name || 'unavailable',
    email: me?.email || 'unavailable',
    photoURL: 'https://picsum.photos/200/300',
  };

  const trigger = (
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
              <rect x="0.62854" y="0.359985" width="15" height="15" rx="7.5" fill="white" />
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
  );

  const userDropdownConfig: UserDropdownConfig = {
    trigger,
    user,
    items,
  };

  if (!me) {
    return <AdminLoading />;
  }

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
