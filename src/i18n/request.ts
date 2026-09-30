import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from './routing';
import * as rootParams from 'next/root-params';

export default getRequestConfig(async ({ locale }) => {
  if (!locale) {
    const lang = await rootParams.lang();
    if (hasLocale(routing.locales, lang)) {
      locale = lang;
    } else {
      notFound();
    }
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
