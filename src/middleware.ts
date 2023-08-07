import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import matchesAnyItem from '@/client/utils/matchesAnyItem';
import { authConfig } from '@/lib/firebase/config/server-config';
import { authentication } from 'next-firebase-auth-edge/lib/next/middleware';

const PUBLIC_PATHS = ['/register', '/login', '/reset-password'];
const protectedMatcher = ['/app', '/app/(.)'];

function redirectToLogin(request: NextRequest) {
  if (
    PUBLIC_PATHS.includes(request.nextUrl.pathname) ||
    !matchesAnyItem(protectedMatcher, request.nextUrl.pathname)
  ) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = '/login';
  url.search = `redirect=${request.nextUrl.pathname}${url.search}`;
  return NextResponse.redirect(url);
}

export async function middleware(request: NextRequest) {
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
  matcher: ['/', '/((?!_next|favicon.ico|api|.*\\.).*)', '/api/login', '/api/logout'],
};
