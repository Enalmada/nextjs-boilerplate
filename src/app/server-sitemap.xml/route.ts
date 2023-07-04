/* eslint-disable @typescript-eslint/no-unused-vars */
import { getServerSideSitemap } from "next-sitemap";

export async function GET(request: Request) {
  // Method to source urls from cms
  // const urls = await fetch('https//example.com/api')

  return getServerSideSitemap([
    {
      loc: `${process.env.NEXT_PUBLIC_REDIRECT_URL || ""}`,
      lastmod: new Date().toISOString(),
    },
  ]);
}
