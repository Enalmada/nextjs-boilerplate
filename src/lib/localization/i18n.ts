/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access */
import { getRequestConfig } from 'next-intl/server';

export const timeZone = 'America/Los_Angeles';

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`../../../messages/${locale}.json`)).default,
  // The time zone can either be statically defined, read from the
  // user profile if you store such a setting, or based on dynamic
  // request information like the locale or headers.
  // https://next-intl-docs.vercel.app/docs/configuration#time-zone
  timeZone: 'America/Los_Angeles',
  // This is the default, a single date instance will be used
  // by all Server Components to ensure consistency
  now: new Date(),
}));
