import { Inter } from 'next/font/google';
import cacheExchange from '@/client/gql/cacheExchange';
import { getRoute } from '@/client/utils/routes';
import { NextUIProvider } from '@nextui-org/react';
import { action } from '@storybook/addon-actions';
import { navigate } from '@storybook/addon-links';
import { themes } from '@storybook/theming';
import { createClient, fetchExchange, ssrExchange, UrqlProvider } from '@urql/next';
import { NextIntlClientProvider } from 'next-intl';

import messages from '../messages/en.json';
import { findDataByOperationNameAndVariables, MockRequest } from '../src/client/gql/globalMocks';
import Style from './style';

// https://nextjs.org/docs/app/building-your-application/optimizing/fonts#with-tailwind-css

export const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const selectedMessages = {
  Index: messages.Index,
};

const ssr = ssrExchange();

const GRAPHQL_API = 'http://localhost:3001/api/graphql';

const mockedClient = createClient({
  exchanges: [cacheExchange, ssr, fetchExchange],
  url: GRAPHQL_API,
  requestPolicy: 'network-only',
  suspense: true,
});

export const decorators = [
  (Story, { globals: { locale } }) => {
    // clears the mocks completely
    // apolloCacheConfig.reset().then();
    return (
      <UrqlProvider client={mockedClient} ssr={ssr}>
        <NextIntlClientProvider locale="en" messages={selectedMessages}>
          <NextUIProvider locale={locale}>
            <div className={`bg-dark font-sans ${fontSans.variable}`} lang={locale}>
              <Style />
              <Story />
            </div>
          </NextUIProvider>
        </NextIntlClientProvider>
      </UrqlProvider>
    );
  },
];

export const parameters = {
  mockAddonConfigs: {
    globalMockData: [
      {
        url: GRAPHQL_API,
        method: 'POST', // Generally, GraphQL uses POST for its requests. Adjust if necessary.
        status: 200, // A common status for OK responses. Adjust based on your needs.
        response: (request: MockRequest) => {
          const { body } = request;
          const parsedBody = JSON.parse(body);
          return findDataByOperationNameAndVariables(
              parsedBody.operationName,
              parsedBody.variables,
              'POST' // Assuming GraphQL always uses POST.
          );
  
        },
      },
    ],
    ignoreQueryParams: true, // Whether or not to ignore query parameters globally
    refreshStoryOnUpdate: true, // This property re-renders the story if there's any data changes
    disableUsingOriginal: true, // This property disables the toggle (on/off) option to use the original endpoint
    disable: false, // This property disables the panel from all the stories
  },
  nextjs: {
    appDirectory: true,
    navigation: {
      push(...args) {
        // This logs to the Actions panel
        action('nextNavigation.push')(...args);
        // Navigate
        const routeArgs = args[0];
        const { storybook: storyId } = getRoute(routeArgs);
        if (storyId) {
          navigate({ storyId });
        }
      },
    },
  },
  actions: { argTypesRegex: '^on[A-Z].*' },
  options: {
    storySort: {
      method: 'alphabetical',
      order: ['Foundations', 'Components'],
    },
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  darkMode: {
    current: 'dark',
    stylePreview: true,
    darkClass: 'dark',
    lightClass: 'light',
    classTarget: 'html',
    dark: {
      ...themes.dark,
      appBg: '#161616',
      barBg: 'black',
      background: 'black',
      appContentBg: 'black',
      appBorderRadius: 14,
    },
    light: {
      ...themes.light,
      appBorderRadius: 14,
    },
  },
};

const locales = ['en-US'];

function isRtlLocale(locale: string) {
  const rtlLocales = ['ar', 'he', 'fa', 'ur']; // Add more if needed
  const lang = locale.split('-')[0];
  return rtlLocales.includes(lang);
}

export const globalTypes = {
  locale: {
    toolbar: {
      icon: 'globe',
      items: locales.map((locale) => ({
        value: locale,
        title: new Intl.DisplayNames(undefined, { type: 'language' }).of(locale),
        // right: new Intl.Locale(locale)?.textInfo?.direction === "rtl" ? "Right to Left" : undefined,
        right: isRtlLocale(locale) ? 'Right to Left' : undefined,
      })),
    },
  },
};
