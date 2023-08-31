// @ts-check
import { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } from 'next/constants.js';
import { withSentryConfig } from '@sentry/nextjs';

import './src/env.mjs';

import { withAxiom } from 'next-axiom';
import * as nextSafe from 'next-safe';
import nextRoutesConfig from 'nextjs-routes/config';

const isDev = process.env.NODE_ENV !== 'production';

/**
 * @typedef {Object} CspRule
 * @property {string | boolean} [source] - Documentation source
 * @property {string | boolean} [script-src]
 * @property {string | boolean} [style-src]
 * @property {string | boolean} [img-src]
 * @property {string | boolean} [connect-src]
 * @property {string | boolean} [font-src]
 * @property {string | boolean} [object-src]
 * @property {string | boolean} [media-src]
 * @property {string | boolean} [frame-src]
 * @property {string | boolean} [worker-src]
 * @property {string | boolean} [manifest-src]
 * @property {string | boolean } [prefetch-src]
 * @property {string | boolean } [base-uri]
 * @property {string | boolean } [child-src]
 * @property {string | boolean } [default-src]
 * @property {string | boolean } [form-action]
 * @property {string | boolean } [frame-ancestors]
 */

/** @type {CspRule} */
const defaultCsp = {
  'base-uri': "'none'",
  'child-src': "'none'",
  'connect-src': "'self'",
  'default-src': "'self'",
  'font-src': "'self'",
  'form-action': "'self'",
  'frame-ancestors': "'none'",
  'frame-src': "'none'",
  'img-src': "'self'",
  'manifest-src': "'self'",
  'media-src': "'self'",
  'object-src': "'none'",
  'prefetch-src': "'self'",
  'script-src': "'self'",
  'style-src': "'self'",
  'worker-src': "'self'",
};

/*
Refused to connect to 'https://apis.google.com/js/api.js?onload=__iframefcb385535' because it violates the following Content Security Policy directive: "connect-src 'self' https://accounts.google.com/gsi/ https://securetoken.googleapis.com https://identitytoolkit.googleapis.com https://lh3.googleusercontent.com https://o32548.ingest.sentry.io webpack://*".

 */

/** @type {CspRule[]} */
// https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid#cross_origin_opener_policy
const cspRules = [
  { source: 'react-dev', 'object-src': 'data:' },
  { source: 'chrome-warning', 'prefetch-src': false },
  {
    source: 'firebase',
    'script-src': 'https://apis.google.com/ https://accounts.google.com/gsi/client',
    'connect-src':
      'https://apis.google.com https://accounts.google.com/gsi/ https://securetoken.googleapis.com https://identitytoolkit.googleapis.com https://lh3.googleusercontent.com',
    'img-src': 'https://lh3.googleusercontent.com',
    'frame-src': `https://accounts.google.com/gsi/ https://securetoken.googleapis.com https://identitytoolkit.googleapis.com https://${process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN}/`,
  },
  {
    source: 'vercel',
    'frame-src': 'https://vercel.live/',
    'script-src': 'https://vercel.live/_next-live/feedback/',
  },
  {
    source: 'nextjs',
    'script-src': "'unsafe-inline'",
    'style-src': "'unsafe-inline'",
  },
  {
    source: 'graphiQL',
    'style-src': 'https://unpkg.com/@graphql-yoga/',
    'script-src': 'https://unpkg.com/@graphql-yoga/',
    'font-src': 'data:',
    'connect-src': 'https://unpkg.com',
    'img-src': 'https://raw.githubusercontent.com',
  },
  {
    source: 'sentry',
    'worker-src': 'blob:',
    'connect-src': 'https://o32548.ingest.sentry.io',
  },
];

/** @type {Record<string, string | boolean>} */
const generatedCsp = { ...defaultCsp };

/**
 * Loop through each rule set in cspRules.
 * @param {Object.<string, string>} rule - The current rule set being processed.
 */
cspRules.forEach((rule) => {
  for (const [key, value] of Object.entries(rule)) {
    if (key !== 'source') {
      const cspKey = key;
      if (typeof value === 'boolean') {
        generatedCsp[cspKey] = value;
      } else {
        if (generatedCsp[cspKey] === "'none'") {
          generatedCsp[cspKey] = value;
        } else {
          generatedCsp[cspKey] += ' ' + value;
        }
      }
    }
  }
});

for (const [key, value] of Object.entries(generatedCsp)) {
  if (typeof value === 'string') {
    generatedCsp[key] = value.trim();
  }
}

// Final contentSecurityPolicyTemplate with dynamic contentSecurityPolicy attribute
// Default template: https://trezy.gitbook.io/next-safe/usage/configuration
const contentSecurityPolicyTemplate = {
  contentSecurityPolicy: {
    mergeDefaultDirectives: true,
    ...generatedCsp,
  },
  referrerPolicy: 'origin-when-cross-origin',
  permissionsPolicy: {
    accelerometer: 'none',
    camera: 'none',
    geolocation: 'none',
    gyroscope: 'none',
    magnetometer: 'none',
    microphone: 'none',
    payment: 'none',
    usb: 'none',
  },
  permissionsPolicyDirectiveSupport: [],
};

/** @type {import("next").NextConfig} */
const config = {
  output: 'standalone',
  poweredByHeader: false,
  reactStrictMode: true,

  async headers() {
    return [
      {
        source: '/:path*',
        // @ts-ignore
        headers: nextSafe.default({ ...contentSecurityPolicyTemplate, isDev }),
      },
    ];
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
    // https://github.com/0no-co/graphql-web-lite  330k to 323k
    // https://github.com/urql-graphql/urql/pull/3108
    /* causing Cannot read properties of undefined (reading 'source') with gql tag
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        graphql: 'graphql-web-lite',
      };
    }
    */

    // TODO - figure out how to fix this the real way
    config.ignoreWarnings = [
      {
        message: /Critical dependency: the request of a dependency is an expression/,
      },
    ];

    // I suspect most of this isn't necessary with postgres.js driver
    // pg used previously by kysely config needs fixing on prod
    if (process.env.NEXT_RUNTIME_NODE !== 'true') {
      /*
      // Necessary for kysely && pg driver
      config.resolve.fallback = {
        ...config.resolve.fallback,
        path: false,
        fs: false,
        net: false,
        tls: false,
        dns: false,
        stream: false,
        crypto: false,
        'pg-native': false,
      };
       */

      // Necessary for kysely postgres.js driver
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
      project: 't3-challenge',
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

const withNextIntl = (await import('next-intl/plugin')).default('./src/lib/localization/i18n.ts');

// @ts-ignore
export default async function configureNextConfig(phase) {
  if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
    const withBundleAnalyzer = await import('@next/bundle-analyzer');

    const bundleAnalyzerConfig = {
      enabled: process.env.ANALYZE === 'true',
    };

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
