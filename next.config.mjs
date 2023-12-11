// @ts-check
// noinspection JSFileReferences
import { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } from 'next/constants.js';
import { generateCspTemplates } from '@enalmada/next-secure';
import { withSentryConfig } from '@sentry/nextjs';

import './src/env.mjs';

import { withAxiom } from 'next-axiom';

import { cspConfig, cspRules } from './src/cspRules.mjs';

const contentSecurityPolicyTemplates = generateCspTemplates(cspConfig, cspRules);

// As a best practice, all plugins have their own config and nextConfig is just for next.js
// noinspection JSUnusedLocalSymbols
/** @type {import("next").NextConfig} */
const nextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  reactStrictMode: true,

  async headers() {
    return [...contentSecurityPolicyTemplates];
  },

  experimental: {
    webpackBuildWorker: true,
    // serverActions: true,
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

// TODO figure out how to not get error with .default
// @ts-ignore
const withNextIntl = (await import('next-intl/plugin')).default('./src/lib/localization/i18n.ts');

/**
 * @param {string} phase
 * @param {import('next').NextConfig} defaultConfig
 */
export default async function configureNextConfig(phase, { defaultConfig }) {
  // Push configured plugins into array

  const plugins = [
    withNextIntl,
    // @ts-ignore
    (config) => withSentry(config),
    withAxiom,
  ];

  if (process.env.ANALYZE === 'true') {
    const withBundleAnalyzer = await import('@next/bundle-analyzer');
    plugins.push(withBundleAnalyzer.default({ enabled: true }));
  }

  // Only load libraries necessary for building during dev or prod build (not runtime)
  if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
    const withPWA = (await import('@ducanh2912/next-pwa')).default({
      disable: process.env.APP_ENV === 'local',
      dest: 'public',
      workboxOptions: {
        exclude: [
          // See following for why these buildExcludes:
          // https://github.com/DuCanhGH/next-pwa/issues/101#issue-1919711481
          /\.map$/, // Exclude all .map files
          /^((?!~offline).)*\.js$/, // Exclude all .js files that do not contain ~offline in the path
          /(?<!\.p)\.woff2$/, // Exclude all .woff2 files that are not .p.woff2 (preloaded subset)
        ],
      },
    });

    // @ts-ignore
    plugins.push(withPWA);
  }

  return plugins.reduce(
    // @ts-ignore
    (acc, plugin) => {
      const update = plugin(acc);
      // @ts-ignore
      return typeof update === 'function' ? update(phase, defaultConfig) : update;
    },
    { ...nextConfig }
  );
}
