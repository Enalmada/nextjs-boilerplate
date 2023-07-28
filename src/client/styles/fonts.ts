import { Inter as FontSans } from 'next/font/google';

// https://nextjs.org/docs/app/building-your-application/optimizing/fonts#with-tailwind-css

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});
