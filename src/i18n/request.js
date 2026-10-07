import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import * as rootParams from "next/root-params";
import { routing } from "./routing";

// #region request
export default getRequestConfig(async ({ locale: explicit }) => {
  // اللغة من مقطع [locale] مباشرة (Next.js 16.3+)، بدون قراءة الـ headers.
  // root-params لا يعمل في Route Handlers (مثل opengraph-image)، فهناك نمرر اللغة صراحة:
  // getTranslations({ locale })
  const locale = explicit ?? (await rootParams.locale());
  if (!hasLocale(routing.locales, locale)) notFound();

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
// #endregion request
