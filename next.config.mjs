// @ts-check
import { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } from "next/constants.js";

import "./src/env.mjs";

const graphiQL = "https://unpkg.com/@graphql-yoga/";

// https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid#cross_origin_opener_policy
const firebase = {
  script: "https://apis.google.com/ https://accounts.google.com/gsi/client",
  connect: "https://accounts.google.com/gsi/",
};

// https://www.yagiz.co/securing-your-nextjs-13-application
// font-src data: added for graphiQL
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' ${firebase.script} ${graphiQL};
  frame-src 'self' ${firebase.connect} https://${process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN}/;
  style-src 'self' 'unsafe-inline' ${graphiQL};
  img-src * blob: data:;
  media-src 'none';
  connect-src * ${firebase.connect};
  font-src 'self' data:;
`.replace(/\n/g, "");

const securityHeaders = [
  { key: "Content-Security-Policy", value: ContentSecurityPolicy },
  { key: "Referrer-Policy", value: "origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  // { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  // https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid#cross_origin_opener_policy
  { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
];

const cloudflarePages = {
  images: {
    loader: "custom",
    loaderFile: "./imageLoader.js",
  },
};

/** @type {import("next").NextConfig} */
const config = {
  poweredByHeader: false,
  reactStrictMode: true,
  ...cloudflarePages,
  async headers() {
    return [
      { source: "/", headers: securityHeaders },
      { source: "/(.*)", headers: securityHeaders },
    ];
  },

  /**
   * If you have the "experimental: { appDir: true }" setting enabled, then you
   * must comment the below `i18n` config out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  experimental: {
    appDir: true,
    // To prevent certain packages from being included in the client bundle
    // https://codevoweb.com/setup-and-use-nextauth-in-nextjs-13-app-directory/
    serverComponentsExternalPackages: ["@prisma/client", "bcryptjs"],
    /* currently crashing https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#swc-plugin
    swcPlugins: [
      ['@graphql-codegen/client-preset-swc-plugin', { artifactDirectory: './src/gql', gqlTagName: 'graphql' }]
    ]
     */
  },
  images: {
    domains: ["avatars.githubusercontent.com", "lh3.googleusercontent.com", "robohash.org"],
  },
};

// @ts-ignore
export default async function configureNextConfig(phase) {
  if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
    const withBundleAnalyzer = await import("@next/bundle-analyzer");

    const bundleAnalyzerConfig = {
      enabled: process.env.ANALYZE === "true",
    };
    return withBundleAnalyzer.default(bundleAnalyzerConfig)(config);
  }
  return config;
}
