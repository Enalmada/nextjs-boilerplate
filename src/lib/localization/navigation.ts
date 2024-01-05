import { createLocalizedPathnamesNavigation, type Pathnames } from 'next-intl/navigation';

export const locales = ['en', 'es', 'ru'] as const;
export type Locale = (typeof locales)[number];

// The `pathnames` object holds pairs of internal
// and external paths, separated by locale.
export const pathnames = {
  // If all locales use the same pathname, a
  // single external path can be provided.
  '/': '/',
  '/blog': '/blog',
  '/contact': '/contact',
  '/faq': '/faq',
  '/privacy': '/privacy',
  '/terms': '/terms',
  '/pricing': '/pricing',

  '/login': '/login',
  '/logout': '/logout',
  '/register': '/register',
  '/maintenance-mode': '/maintenance-mode',
  '/reset-password': '/reset-password',
  '/app': '/app',
  '/app/task/[id]': '/app/task/[id]',
  '/app/task/new': '/app/task/new',
  '/app/profile': '/app/profile',
  '/app/error': '/app/error',

  // If locales use different paths, you can
  // specify each external path per locale.
  '/about': {
    en: '/about',
    es: '/acerca-de',
    ru: `/o-nas`,
  },

  // Admin
  '/admin': '/admin',
  '/admin/user': '/admin/user',
  '/admin/task': '/admin/task',
  '/admin/task/[id]': '/admin/task/[id]',
} satisfies Pathnames<typeof locales>;

const navigation = createLocalizedPathnamesNavigation({
  locales,
  pathnames,
});

export type LinkType = typeof navigation.Link;

// If you want to use it
export const { Link, redirect, usePathname, useRouter } = navigation;
