// @ts-check
import { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } from 'next/constants.js';
import { withSentryConfig } from '@sentry/nextjs';
import nextRoutesConfig from 'nextjs-routes/config';

import './src/env.mjs';

import { withAxiom } from 'next-axiom';
import * as nextSafe from 'next-safe';

const withRoutes = nextRoutesConfig();

const isDev = process.env.NODE_ENV !== 'production';

// https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid#cross_origin_opener_policy
const firebase = {
  script: 'https://apis.google.com/ https://accounts.google.com/gsi/client',
  connect:
    'https://accounts.google.com/gsi/ https://securetoken.googleapis.com https://identitytoolkit.googleapis.com',
  image: 'https://lh3.googleusercontent.com',
};

const vercel = {
  iframe: 'https://vercel.live/',
  script: 'https://vercel.live/_next-live/feedback/',
};

const nextjs = {
  script: "'unsafe-inline'",
  style: "'unsafe-inline'", // prod wont load css without it
};

const graphiQL = {
  style: 'https://unpkg.com/@graphql-yoga/',
  script: 'https://unpkg.com/@graphql-yoga/',
  font: 'data:',
};

const sentry = {
  worker: 'blob:',
  connect: 'https://o32548.ingest.sentry.io',
};

const contentSecurityPolicy = {
  contentSecurityPolicy: {
    mergeDefaultDirectives: true,
    'script-src': `${firebase.script} ${graphiQL.script} ${vercel.script} ${nextjs.script}`,
    'frame-src': `${firebase.connect} https://${process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN}/ ${vercel.iframe}`,
    'style-src': `${graphiQL.style} ${nextjs.script}`,
    'connect-src': `${firebase.connect} ${sentry.connect}`,
    'prefetch-src': false, // chrome warning
    'img-src': `${firebase.image}`,
    'font-src': `${graphiQL.font}`,
    'worker-src': `${sentry.worker}`,
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
        headers: nextSafe.default({ ...contentSecurityPolicy, isDev }),
      },
    ];
  },

  /**
   * If you have the "experimental: { appDir: true }" setting enabled, then you
   * must comment the below `i18n` config out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  experimental: {
    serverActions: true,
    // To prevent certain packages from being included in the client bundle
    // https://codevoweb.com/setup-and-use-nextauth-in-nextjs-13-app-directory/
    // serverComponentsExternalPackages: ['@prisma/client', 'bcryptjs'],
    /* currently crashing https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#swc-plugin
    swcPlugins: [
      ['@graphql-codegen/client-preset-swc-plugin', { artifactDirectory: './src/gql', gqlTagName: 'graphql' }]
    ]
     */
  },
  images: {
    domains: ['avatars.githubusercontent.com', 'lh3.googleusercontent.com', 'robohash.org'],
  },

  webpack(config, { isServer }) {
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

// @ts-ignore
export default async function configureNextConfig(phase) {
  if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
    const withBundleAnalyzer = await import('@next/bundle-analyzer');

    const bundleAnalyzerConfig = {
      enabled: process.env.ANALYZE === 'true',
    };
    return withSentry(
      withAxiom(withRoutes(withBundleAnalyzer.default(bundleAnalyzerConfig)(config)))
    );
  }
  return withSentry(withAxiom(withRoutes(config)));
}
