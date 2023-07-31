// @ts-check
import { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } from 'next/constants.js';

import './src/env.mjs';

import { withAxiom } from 'next-axiom';
import * as nextSafe from 'next-safe';

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

const contentSecurityPolicy = {
  contentSecurityPolicy: {
    mergeDefaultDirectives: true,
    'script-src': `${firebase.script} ${graphiQL.script} ${vercel.script} ${nextjs.script}`,
    'frame-src': `${firebase.connect} https://${process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN}/ ${vercel.iframe}`,
    'style-src': `${graphiQL.style} ${nextjs.script}`,
    'connect-src': `${firebase.connect}`,
    'prefetch-src': false, // chrome warning
    'img-src': `${firebase.image}`,
    'font-src': `${graphiQL.font}`,
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
  }
};

// @ts-ignore
export default async function configureNextConfig(phase) {
  if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
    const withBundleAnalyzer = await import('@next/bundle-analyzer');

    const bundleAnalyzerConfig = {
      enabled: process.env.ANALYZE === 'true',
    };
    return withAxiom(withBundleAnalyzer.default(bundleAnalyzerConfig)(config));
  }
  return withAxiom(config);
}
