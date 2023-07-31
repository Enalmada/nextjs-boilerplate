import sentryPlugin from '@cloudflare/pages-plugin-sentry';

export const onRequest: PagesFunction<{
  SENTRY_DSN: string;
}> = (context) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-assignment
  return sentryPlugin({ dsn: context.env.SENTRY_DSN })(context);
};
