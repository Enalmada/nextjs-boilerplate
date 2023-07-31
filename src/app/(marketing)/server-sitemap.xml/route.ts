/* eslint-disable @typescript-eslint/no-unused-vars */
import { env } from '@/env.mjs';
import { getServerSideSitemap } from 'next-sitemap';


export async function GET(request: Request) {
  // Method to source urls from cms
  // const urls = await fetch('https//example.com/api')

  return getServerSideSitemap([
    {
      loc: `${env.NEXT_PUBLIC_REDIRECT_URL || ''}`,
      lastmod: new Date().toISOString(),
    },
  ]);
}
