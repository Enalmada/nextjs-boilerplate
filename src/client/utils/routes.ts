import { type NextPageContext } from 'next';

export interface NextPageContextExtended extends NextPageContext {
  isRedirecting: boolean;
}

export interface Route {
  id: string;
  path: string;
  name: string;
  storybook?: string;
}

export const marketingRoutes: Route[] = [
  {
    id: 'Home',
    path: '/',
    name: 'Home',
    storybook: 'Pages/Marketing/Home',
  },
  {
    id: 'About',
    path: '/about',
    name: 'About Us',
    storybook: 'Pages/Marketing/About',
  },
  {
    id: 'Blog',
    path: '/blog',
    name: 'Blog',
    storybook: 'Pages/Marketing/Blog',
  },
  {
    id: 'Contact',
    path: '/contact',
    name: 'Contact Us',
    storybook: 'Pages/Marketing/Contact',
  },
  {
    id: 'FAQ',
    path: '/faq',
    name: 'FAQ',
    storybook: 'Pages/Marketing/FAQ',
  },
  {
    id: 'Privacy',
    path: '/privacy',
    name: 'Privacy Policy',
    storybook: 'Pages/Marketing/Privacy',
  },
  {
    id: 'Terms',
    path: '/terms',
    name: 'Terms of Service',
    storybook: 'Pages/Marketing/Terms',
  },
  {
    id: 'Pricing',
    path: '/pricing',
    name: 'Pricing',
    storybook: 'Pages/Marketing/Pricing',
  },
];

export const authRoutes: Route[] = [
  {
    id: 'Login',
    path: '/login',
    name: 'Login',
    storybook: 'Pages/Auth/Login',
  },
  {
    id: 'Logout',
    path: '/logout',
    name: 'Logout',
    storybook: 'Pages/Auth/Logout',
  },
  {
    id: 'Register',
    path: '/register',
    name: 'Register',
    storybook: 'Pages/Auth/Register',
  },
  {
    id: 'MaintenanceMode',
    path: '/maintenance-mode',
    name: 'Maintenance Mode',
    storybook: 'Pages/Auth/MaintenanceMode',
  },
  {
    id: 'ResetPassword',
    path: '/reset-password',
    name: 'Forgot Password',
    storybook: 'Pages/Auth/ResetPassword',
  },
];

export const appRoutes: Route[] = [
  {
    id: 'App',
    path: '/app',
    name: 'App',
    storybook: 'Pages/App/TaskList',
  },
  {
    id: 'Task',
    path: '/app/task/[id]',
    name: 'Task',
    storybook: 'Pages/App/Task',
  },
  {
    id: 'NewTask',
    path: '/app/task/new',
    name: 'New Task',
    storybook: 'Pages/App/NewTask',
  },
  {
    id: 'Profile',
    path: '/app/profile',
    name: 'Account',
    storybook: 'Pages/App/Profile',
  },
];

export const adminRoutes: Route[] = [
  {
    id: 'AdminHome',
    path: '/admin',
    name: 'Admin',
    storybook: 'Pages/Admin/Home',
  },
  {
    id: 'AdminUsers',
    path: '/admin/users',
    name: 'Users',
    storybook: 'Pages/Admin/Users',
  },
  /* clone-code ENTITY_HOOK
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
    id: 'AdminTasks',
    path: '/admin/tasks',
    name: 'Tasks',
    storybook: 'Pages/Admin/Tasks',
  },
  {
    id: 'AdminTask',
    path: '/admin/tasks/[id]',
    name: 'Task',
    storybook: 'Pages/Admin/Task',
  },
  /* clone-code ENTITY_HOOK end */
];

const routes = [...marketingRoutes, ...authRoutes, ...appRoutes, ...adminRoutes];

export function replaceVariables(string: string, query: { id: string }): string {
  return string.replace('[id]', query.id);
}

export function getRoute(relativeUrl: string): Route {
  // Use a dummy base URL to handle relative paths
  const base = 'http://example.com';
  // Get the path without query parameters
  const path = new URL(relativeUrl, base).pathname;

  return routes.find((route) => route.path === path) || ({} as Route);
}

export function getRouteById(routeId: string): Route {
  return routes.find((route) => route.id === routeId) || ({} as Route);
}

interface VariableType {
  [key: string]: unknown;
}

export function getUrl(routeId: string, variables: VariableType[]) {
  const route = getRouteById(routeId);
  if (route) {
    return { pathname: route.path, query: { ...variables } };
  }
  return {};
}

export function getNamedUrl(
  routeId: string,
  variables: VariableType
): { pathname: string; query: VariableType } | undefined {
  const route = getRouteById(routeId);
  if (route) {
    let href = route.path;
    if (variables && Object.keys(variables).length) {
      for (const key in variables) {
        href = href.replace(`[${key}]`, variables[key] as string);
      }
    }

    const publicVariables = {
      ...variables,
    };
    delete publicVariables.org;
    delete publicVariables.id;

    return { pathname: href, query: { ...publicVariables } };
  }
}
