const isDev = process.env.NODE_ENV !== 'production';

/** @type {import("@enalmada/next-secure").ContentSecurityPolicyTemplate} */
export const cspConfig = {
  isDev,
  contentSecurityPolicy: {
    mergeDefaultDirectives: true,
    'prefetch-src': false, // shouldn't be used
  },
  // https://web.dev/referrer-best-practices/
  referrerPolicy: 'strict-origin-when-cross-origin',
  // These "false" are included in proposed/standard but cause chrome noise.  Disabling for now.
  permissionsPolicy: {
    'ambient-light-sensor': false,
    battery: false,
    'document-domain': false,
    'execution-while-not-rendered': false,
    'execution-while-out-of-viewport': false,
    'navigation-override': false,
    'speaker-selection': false,
  },
  permissionsPolicyDirectiveSupport: ['proposed', 'standard'], // default causes tons of console noise
};

// Notes on next.js and csp
// https://github.com/vercel/next.js/issues/18557#issuecomment-727160210

/** @type {import("@enalmada/next-secure").CspRule[]} */
// https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid#cross_origin_opener_policy
export const cspRules = [
  { description: 'react-dev', 'object-src': isDev ? 'data:' : undefined, source: '/:path*' },
  {
    description: 'firebase',
    'script-src': 'https://apis.google.com/ https://accounts.google.com/gsi/client',
    'connect-src':
      'https://apis.google.com https://accounts.google.com/gsi/ https://securetoken.googleapis.com https://identitytoolkit.googleapis.com https://lh3.googleusercontent.com',
    'img-src': 'https://lh3.googleusercontent.com',
    'frame-src': `https://accounts.google.com/gsi/ https://securetoken.googleapis.com https://identitytoolkit.googleapis.com https://${process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN}/`,
    source: '/:path*',
  },
  {
    description: 'vercel',
    'frame-src': 'https://vercel.live/',
    'script-src': 'https://vercel.live/_next-live/feedback/',
    source: '/:path*',
  },
  {
    description: 'urql',
    // urql has inline script without nonce for data hydration
    'script-src': "'unsafe-inline'",
    source: '/:path*',
  },
  {
    description: 'nextui',
    // Uses inline "style:" so unsafe-inline is required in prod and nonce can't be used.
    'style-src': "'unsafe-inline'",
    source: '/:path*',
  },
  // TODO - only return this in static next.config.js headers (don't merge into middleware)
  {
    description: 'graphiQL',
    'style-src': 'https://unpkg.com/@graphql-yoga/',
    'script-src': "'unsafe-inline' https://unpkg.com/@graphql-yoga/",
    'font-src': 'data:',
    'connect-src': 'https://unpkg.com',
    'img-src': 'https://raw.githubusercontent.com',
    source: '/api/graphql',
  },
  {
    description: 'sentry',
    'worker-src': 'blob:',
    'connect-src': 'https://o32548.ingest.sentry.io',
    source: '/:path*',
  },
  {
    description: 'sampleimage',
    'img-src': 'https://picsum.photos/200/300 https://fastly.picsum.photos/ https://i.pravatar.cc/',
  },
];
