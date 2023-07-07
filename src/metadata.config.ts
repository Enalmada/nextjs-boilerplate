// https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadata-fields

import { type Metadata } from "next";
import {
  type ColorSchemeEnum,
  type ReferrerEnum,
} from "next/dist/lib/metadata/types/metadata-types";
import { env } from "@/env.mjs";

// Next.js auto icon generation instructions:
// Use https://realfavicongenerator.net/ to generate icons and manifest
// put them into /public
// move apple-touch-icon.png to /app and rename to apple-icon.png
// move favicon.ico to /app
// move favicon-32x32.png to /app and rename to favicon.png
// remove favicon-16x16.png and safari-pinned-tap.svg
// Update site.webmanifest with correct values

export const config = {
  siteUrl: "ToDoApp.com",
  applicationName: "ToDoApp",
  description: "Everyone loves a simple todo app exercise.",
};

export const basicFields: Metadata = {
  title: {
    template: `%s | ${config.siteUrl}`,
    default: config.siteUrl, // a default is required when creating a template
  },
  // keywords: ["Next.js", "React", "JavaScript"],
  description: config.description,
  category: "technology",
  applicationName: config.siteUrl,
  referrer: "strict-origin-when-cross-origin" as ReferrerEnum, // https://web.dev/referrer-best-practices/
  authors: [{ name: "Adam Lane" }],
  colorScheme: "dark" as ColorSchemeEnum,
  creator: "Adam Lane",
  publisher: "Lane Business Consulting",
  themeColor: "black",
  openGraph: {
    title: config.applicationName,
    description: config.description,
    url: env.NEXT_PUBLIC_REDIRECT_URL,
    siteName: config.siteUrl,
    locale: "en_US",
    type: "website",
  },
  appLinks: {
    /*
    ios: {
      url: '${env.NEXT_PUBLIC_REDIRECT_URL}/ios',
      app_store_id: 'app_store_id',
    },
    android: {
      package: 'com.example.android/package',
      app_name: 'app_name_android',
    },
     */
    web: {
      url: `${env.NEXT_PUBLIC_REDIRECT_URL}/app`,
      should_fallback: true,
    },
  },
  verification: {
    // google: undefined,
  },
  /*
  twitter: {
    // card: 'summary_large_image',
    // title: config.siteName,
    // description: config.description,

    // siteId: '1467726470533754880',
    // creator: '@nextjs',
    // creatorId: '1467726470533754880',
    // images: [],
  },
   */
  /*
  itunes: {
    appId: 'myAppStoreID',
    appArgument: 'myAppArgument',
  },
  appleWebApp: {
    title: 'Apple Web App',
    statusBarStyle: 'black-translucent',
    startupImage: [
      '/assets/startup/apple-touch-startup-image-768x1004.png',
      {
        url: '/assets/startup/apple-touch-startup-image-1536x2008.png',
        media: '(device-width: 768px) and (device-height: 1024px)',
      },
    ],
  },
   */
};

// - shortcut-icon no longer necessary
// - apple doesn’t use the mask-icon anymore.
// - The msapplication-* meta tags are no longer supported in Chromium
//  https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs
export const icons = {
  /*
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      { url: "/icon.png?v=1", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png?v=1", sizes: "180x180", type: "image/png" }],
  },
   */
  manifest: "/site.webmanifest",
};

const metadataConfig: Metadata = {
  ...basicFields,
  ...icons,
};

export default metadataConfig;
