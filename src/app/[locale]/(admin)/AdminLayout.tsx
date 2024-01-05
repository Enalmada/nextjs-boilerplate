'use client';

import React from 'react';
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
import gravatarUrl from 'gravatar-url';
import {
  BiBuildingHouse as AcmeIcon,
  BiCode as CodeIcon,
  BiSolidHome as HomeIcon,
  BiTask as TaskIcon,
  BiSolidUser as UserIcon,
} from 'react-icons/bi';

/* clone-code ENTITY_HOOK
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
        href: '/admin/user',
      },
      /* clone-code ENTITY_HOOK
      {
        "toPlacement": "below",
        "replacements": [
          { "find": "Tasks", "replace": "<%= h.inflection.pluralize(h.changeCase.pascalCase(name)) %>" },
          { "find": "Task", "replace": "<%= h.changeCase.pascalCase(name) %>" },
          { "find": "tasks", "replace": "<%= h.inflection.pluralize(h.changeCase.camelCase(name)) %>" }
        ]
      }
      */
      {
        title: 'Tasks',
        icon: <TaskIcon />,
        href: '/admin/task',
      },
      /* clone-code ENTITY_HOOK end */
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
    photoURL: gravatarUrl(me?.email || '', { default: 'mp' }),
  };

  const trigger = (
    <Avatar
      src={user.photoURL}
      isBordered
      className="transition-transform"
      color="secondary"
      name={user.displayName || user.email || undefined}
      size="sm"
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
      <div className="mx-5 my-5 flex flex-col gap-4">{children}</div>
    </Layout>
  );
}
