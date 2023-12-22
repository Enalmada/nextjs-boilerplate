import { formatRelative } from 'date-fns/formatRelative';
import { enUS } from 'date-fns/locale/en-US';

// https://date-fns.org/docs/I18n-Contribution-Guide#formatrelative
// https://github.com/date-fns/date-fns/blob/master/src/locale/en-US/_lib/formatRelative/index.js
// https://github.com/date-fns/date-fns/issues/1218
// https://stackoverflow.com/questions/47244216/how-to-customize-date-fnss-formatrelative
interface FormatRelativeLocale {
  lastWeek: string;
  yesterday: string;
  today: string;
  tomorrow: string;
  nextWeek: string;
  other: string;
  [key: string]: string;
}
const formatRelativeLocale: FormatRelativeLocale = {
  lastWeek: "'Last' eeee",
  yesterday: "'Yesterday'",
  today: "'Today'",
  tomorrow: "'Tomorrow'",
  nextWeek: "'Next' eeee",
  other: 'MM/dd/yyyy',
};

const locale = {
  ...enUS,
  formatRelative: (token: string) => {
    // Return the corresponding string or a default string if the token is not found
    return formatRelativeLocale[token] || formatRelativeLocale.other;
  },
};

// Remove the time from the default
// https://github.com/date-fns/date-fns/issues/1218#issuecomment-599182307
export const formatRelativeDate = (tomorrow: Date) => {
  return formatRelative(tomorrow, new Date(), { locale });
};
