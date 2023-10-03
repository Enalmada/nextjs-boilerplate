// @ts-check
// noinspection JSFileReferences
import { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } from 'next/constants.js';
import { generateCspTemplate } from '@enalmada/next-secure';
import { withSentryConfig } from '@sentry/nextjs';

import './src/env.mjs';

import { withAxiom } from 'next-axiom';
import * as nextSafe from 'next-safe';

const isDev = process.env.NODE_ENV !== 'production';

/** @type {import("@enalmada/next-secure").ContentSecurityPolicyTemplate} */
const cspConfig = {
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

/** @type {import("@enalmada/next-secure").CspRule[]} */
// https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid#cross_origin_opener_policy
const cspRules = [
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
    description: 'nextjs',
    // NextJS requires 'unsafe-inline' in prod?!
    // TODO - use nonce or hash.  next.js is working on improving this.  Revisit when they do.
    'script-src': "'unsafe-inline'",
    // https://github.com/vercel/next.js/issues/18557#issuecomment-727160210
    'style-src': "'unsafe-inline'",
    source: '/:path*',
  },
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
];

const contentSecurityPolicyTemplates = generateCspTemplate(cspConfig, cspRules);

// next-safe adds legacy keys that are unnecessary and cause console noise
const keysToRemove = ['Feature-Policy', 'X-Content-Security-Policy', 'X-WebKit-CSP'];

// noinspection JSUnusedLocalSymbols
/** @type {import("next").NextConfig} */
const config = {
  output: 'standalone',
  poweredByHeader: false,
  reactStrictMode: true,

  async headers() {
    return contentSecurityPolicyTemplates.map(
      (/** @type {import("@enalmada/next-secure").ContentSecurityPolicyTemplate } */ template) => {
        return {
          source: template.source || '/:path*',
          headers: nextSafe
            // @ts-ignore this works but typescript can't tell for some reason
            .default({ ...template })
            // TODO move all this into @enalmada/next-secure
            .filter((/** @type {{ key: string; }} */ header) => !keysToRemove.includes(header.key)),
        };
      }
    );
  },

  experimental: {
    serverActions: true,
    // To prevent certain packages from being included in the client bundle
    // https://codevoweb.com/setup-and-use-nextauth-in-nextjs-13-app-directory/
    // serverComponentsExternalPackages: ['@prisma/client', 'bcryptjs'],
    // currently crashing https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#swc-plugin v0.2.0
    /*
    swcPlugins: [
      ['@graphql-codegen/client-preset-swc-plugin', { artifactDirectory: './src/client/gql/generated', gqlTagName: 'gql' }]
    ]
     */
  },
  images: {
    domains: ['avatars.githubusercontent.com', 'lh3.googleusercontent.com', 'robohash.org'],
  },

  webpack(config, { isServer }) {
    // Make sure all web modules are using graphql-web-lite for min size (following urql)
    // https://github.com/0no-co/graphql-web-lite  330k to 323k
    // https://github.com/urql-graphql/urql/pull/3108
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        graphql: 'graphql-web-lite',
      };
    }

    // TODO - figure out how to fix this the real way
    config.ignoreWarnings = [
      {
        message: /Critical dependency: the request of a dependency is an expression/,
      },
    ];

    // The following is for edge testing
    // pg used previously by kysely config needs fixing on prod
    if (process.env.NEXT_RUNTIME_NODE !== 'true') {
      // Necessary for postgres.js driver
      config.resolve.fallback = {
        ...config.resolve.fallback,
        os: false,
        fs: false,
        stream: false,
        crypto: false,
        tls: false,
        net: false,
      };
    }

    // To see Cloudflare compile errors more clearly locally
    // Should probably just be default in .dev.vars
    if (process.env.DISABLE_MINIMIZE === 'true') {
      config.optimization.minimize = false;
    }

    return config;
  },
};

/**
 * @param {import("next").NextConfig} config
 */
const withSentry = (config) => {
  return withSentryConfig(
    config,
    {
      // For all available options, see:
      // https://github.com/getsentry/sentry-webpack-plugin#options

      // Suppresses source map uploading logs during build
      silent: true,

      org: 'mentormyselfcom',
      project: 'nextjs-boilerplate',
    },
    {
      // For all available options, see:
      // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

      // Upload a larger set of source maps for prettier stack traces (increases build time)
      widenClientFileUpload: true,

      // Transpiles SDK to be compatible with IE11 (increases bundle size)
      // transpileClientSDK: true,

      // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
      // tunnelRoute: '/monitoring',

      // Hides source maps from generated client bundles
      hideSourceMaps: true,

      // Automatically tree-shake Sentry logger statements to reduce bundle size
      disableLogger: true,
    }
  );
};

// @ts-ignore
const withNextIntl = (await import('next-intl/plugin')).default('./src/lib/localization/i18n.ts');

/**
 * @param {string} phase
 */
export default async function configureNextConfig(phase) {
  if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
    const withBundleAnalyzer = await import('@next/bundle-analyzer');

    const bundleAnalyzerConfig = {
      enabled: process.env.ANALYZE === 'true',
    };

    // See following for why these buildExcludes:
    // https://github.com/DuCanhGH/next-pwa/issues/101#issue-1919711481
    const withPWA = (await import('@ducanh2912/next-pwa')).default({
      dest: 'public',
      buildExcludes: [
        /\.map$/, // Exclude all .map files
        /^((?!~offline).)*\.js$/, // Exclude all .js files that do not contain ~offline in the path
        /(?<!\.p)\.woff2$/, // Exclude all .woff2 files that are not .p.woff2 (preloaded subset)
      ],
    });

    return withSentry(
      withNextIntl(withPWA(withAxiom(withBundleAnalyzer.default(bundleAnalyzerConfig)(config))))
    );
  }
  return withSentry(withAxiom(withNextIntl(config)));
}
