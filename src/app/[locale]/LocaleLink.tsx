import { Link, type Locale } from '@/lib/localization/navigation';
import clsx from 'clsx';
import { useLocale } from 'next-intl';

type Props = {
  locale: Locale;
};

export default function LocaleLink({ locale }: Props) {
  const curLocale = useLocale();

  return (
    <Link
      href="/"
      locale={locale}
      className={clsx('text-slate-500', curLocale === locale && 'font-semibold text-slate-700')}
    >
      {locale.toUpperCase()}
    </Link>
  );
}
