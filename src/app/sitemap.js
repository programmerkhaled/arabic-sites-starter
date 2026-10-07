import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/seo";

// #region sitemap
// كل صفحة بكل لغة، ومع كل رابط نسخه باللغات الأخرى (xhtml:link hreflang)
const PATHS = ["", "/work"];

export default function sitemap() {
  return PATHS.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(routing.locales.map((l) => [l, `${SITE_URL}/${l}${path}`])),
      },
    })),
  );
}
// #endregion sitemap
