import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import matchesAnyItem from '@/client/utils/matchesAnyItem';
import { authConfig } from '@/lib/firebase/config/server-config';
import { locales, pathnames } from '@/lib/localization/navigation';
import { authentication } from 'next-firebase-auth-edge/lib/next/middleware';
import createIntlMiddleware from 'next-intl/middleware';

// import { cspConfig, cspRules } from '@/cspRules.mjs';
// import { applyHeaders, generateSecurityHeaders } from '@enalmada/next-secure';

const PUBLIC_PATHS = ['/register', '/login', '/reset-password'];
const protectedMatcher = ['/app', '/app/(.)', '/admin', '/admin/(.)'];

export const defaultLocale = 'en';

// TODO consider const defaultLocale = request.headers.get('x-default-locale') || 'en';
// https://next-intl-docs.vercel.app/docs/routing/middleware#composing-other-middlewares
const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
  localeDetection: false,
  pathnames,
});

function redirectToLogin(request: NextRequest) {
  if (
    PUBLIC_PATHS.includes(request.nextUrl.pathname) ||
    !matchesAnyItem(protectedMatcher, request.nextUrl.pathname)
  ) {
    return intlMiddleware(request);
  }

  const url = request.nextUrl.clone();
  url.pathname = '/login';
  url.search = `redirect=${request.nextUrl.pathname}${url.search}`;
  return NextResponse.redirect(url);
}

export async function middleware(request: NextRequest) {
  // const secureHeaders = generateSecurityHeaders(cspConfig, cspRules);

  return authentication(request, {
    loginPath: '/api/login',
    logoutPath: '/api/logout',
    apiKey: authConfig.apiKey,
    cookieName: authConfig.cookieName,
    cookieSerializeOptions: authConfig.cookieSerializeOptions,
    cookieSignatureKeys: authConfig.cookieSignatureKeys,
    serviceAccount: authConfig.serviceAccount,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/require-await
    handleValidToken: async ({ token, decodedToken }) => {
      // Authenticated user should not be able to access /login, /register and /reset-password routes
      // if (PUBLIC_PATHS.includes(request.nextUrl.pathname)) {
      //  return redirectToHome(request);
      // }

      return intlMiddleware(request);
      // return applyHeaders(response, secureHeaders);
    },
    // eslint-disable-next-line @typescript-eslint/require-await
    handleInvalidToken: async () => {
      return redirectToLogin(request);
      // return applyHeaders(response, secureHeaders);
    },
    // eslint-disable-next-line @typescript-eslint/require-await,@typescript-eslint/no-unused-vars
    handleError: async (error) => {
      return redirectToLogin(request);
      // return applyHeaders(response, secureHeaders);
    },
  });
}

export const config = {
  matcher: ['/', '/((?!_next|favicon.ico|api|.*\\.).*)', '/api/login', '/api/logout'],
  // source for ignoring prefetches
  // https://github.com/vercel/next.js/blob/canary/examples/with-strict-csp/middleware.js
  // https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy#adding-a-nonce-with-middleware
  missing: [
    { type: 'header', key: 'next-router-prefetch' },
    { type: 'header', key: 'purpose', value: 'prefetch' },
  ],
};
