import { Inter } from 'next/font/google';
import { getRoute } from '@/client/utils/routes';
import { MockedProvider } from '@apollo/client/testing';
import { NextSSRInMemoryCache } from '@apollo/experimental-nextjs-app-support/ssr';
import { NextUIProvider } from '@nextui-org/react';
import { action } from '@storybook/addon-actions';
import { navigate } from '@storybook/addon-links';
import { themes } from '@storybook/theming';
import { NextIntlClientProvider } from 'next-intl';

import messages from '../messages/en.json';
import { defaultOptions } from '../src/client/gql/apollo-wrapper';
import { globalMocks } from '../src/client/gql/globalMocks';
import typePolicies from '../src/client/gql/typePolicies';
import Style from './style';

// https://nextjs.org/docs/app/building-your-application/optimizing/fonts#with-tailwind-css

export const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

// https://github.com/lifeiscontent/storybook-addon-apollo-client#known-issues
// https://github.com/lifeiscontent/storybook-addon-apollo-client/issues/90
const apolloCacheConfig = new NextSSRInMemoryCache({
  resultCaching: false, // Doesn't seem to be working
  typePolicies: typePolicies,
});

const selectedMessages = {
  Index: messages.Index,
};

export const decorators = [
  (Story, { globals: { locale } }) => {
    // clears the mocks completely
    // apolloCacheConfig.reset().then();
    return (
      <NextIntlClientProvider locale="en" messages={selectedMessages}>
        <NextUIProvider locale={locale}>
          <div className={`bg-dark font-sans ${fontSans.variable}`} lang={locale}>
            <Style />
            <Story />
          </div>
        </NextUIProvider>
      </NextIntlClientProvider>
    );
  },
];

export const parameters = {
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
  apolloClient: {
    MockedProvider,
    cache: apolloCacheConfig,
    defaultOptions: {
      ...defaultOptions,
      query: {
        ...defaultOptions.query,
        fetchPolicy: 'no-cache', // Doesn't seem to be working
      },
    },
    globalMocks: globalMocks,
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
