import { routing } from "@/i18n/routing";

// عنوان الموقع الحقيقي يأتي من متغير بيئة عند النشر (الفصل 11)
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

// #region alternates
// روابط كل نسخ الصفحة باللغات المختلفة: تتحول إلى <link rel="alternate" hreflang>.
// x-default: الصفحة التي يراها زائر لغته ليست من لغات الموقع.
export function alternatesFor(locale, path = "") {
  const url = (l) => `${SITE_URL}/${l}${path}`;
  const languages = Object.fromEntries(routing.locales.map((l) => [l, url(l)]));
  languages["x-default"] = url(routing.defaultLocale);
  return { canonical: url(locale), languages };
}
// #endregion alternates

// لغة Open Graph بصيغة language_TERRITORY
export const OG_LOCALES = { ar: "ar_SA", en: "en_US" };
