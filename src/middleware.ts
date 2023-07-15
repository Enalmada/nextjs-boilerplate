import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import matchesAnyItem from '@/client/utils/matchesAnyItem';
import { authConfig } from '@/lib/firebase/config/server-config';
import { getFirebaseAuth } from 'next-firebase-auth-edge/lib/auth';
import { authentication, refreshAuthCookies } from 'next-firebase-auth-edge/lib/next/middleware';

// TODO: move this into environment configuration
// List all routes that are protected by login
const protectedMatcher = ['/app', '/app/(.)'];

// https://github.com/vercel/next.js/discussions/33898#discussioncomment-6055562
// eslint-disable-next-line @typescript-eslint/no-unused-vars
/*
const logger = getLogger('middleware', {
  browser: {
    // eslint-disable-next-line no-console
    write: (o: unknown) => console.log(JSON.stringify(o)),
  },
});

 */

function redirectToLogin(request: NextRequest) {
  if (
    request.nextUrl.pathname === '/login' ||
    !matchesAnyItem(protectedMatcher, request.nextUrl.pathname)
  ) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = '/login';
  url.search = `redirect=${request.nextUrl.pathname}${url.search}`;
  return NextResponse.redirect(url);
}

const { setCustomUserClaims, getUser } = getFirebaseAuth(
  authConfig.serviceAccount,
  authConfig.apiKey
);

export async function middleware(request: NextRequest) {
  // logger.trace("middleware");

  return authentication(request, {
    loginPath: '/api/login',
    logoutPath: '/api/logout',
    ...authConfig,
    handleValidToken: async ({ token, decodedToken }) => {
      if (request.nextUrl.pathname === '/api/custom-claims') {
        await setCustomUserClaims(decodedToken.uid, {
          someClaims: ['someValue'],
        });

        const user = await getUser(decodedToken.uid);
        const response = new NextResponse(JSON.stringify(user.customClaims), {
          status: 200,
          headers: { 'content-type': 'application/json' },
        });

        await refreshAuthCookies(token, response, authConfig);
        return response;
      }

      return NextResponse.next();
    },
    // eslint-disable-next-line @typescript-eslint/require-await
    handleInvalidToken: async () => {
      return redirectToLogin(request);
    },
    // eslint-disable-next-line @typescript-eslint/require-await
    handleError: async (error) => {
      console.error('Unhandled authentication error', { error });
      return redirectToLogin(request);
    },
  });
}

export const config = {
  matcher: [
    '/',
    '/((?!_next/static|favicon.ico|logo.svg|site.webmanifest|api/graphql|api/health).*)',
  ],
};
