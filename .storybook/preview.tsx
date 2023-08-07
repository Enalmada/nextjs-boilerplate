import { Inter } from 'next/font/google';
import { NextUIProvider } from '@nextui-org/system';
import { themes } from '@storybook/theming';

import Style from './style';

// https://nextjs.org/docs/app/building-your-application/optimizing/fonts#with-tailwind-css

export const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const decorators = [
  (Story, { globals: { locale } }) => {
    return (
      <NextUIProvider locale={locale}>
        <div className={`bg-dark font-sans ${fontSans.variable}`} lang={locale}>
          <Style />
          <Story />
        </div>
      </NextUIProvider>
    );
  },
];

export const parameters = {
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
