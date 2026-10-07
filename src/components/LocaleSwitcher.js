"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

// #region switcher
// روابط عادية وليست أزرار: تعمل بدون JavaScript، ومحركات البحث تتبعها،
// وكل رابط يفتح نفس الصفحة الحالية باللغة الأخرى.
export default function LocaleSwitcher() {
  const t = useTranslations("LocaleSwitcher");
  const current = useLocale();
  const pathname = usePathname(); // المسار بدون اللغة، مثل /contact

  return (
    <nav aria-label={t("label")} className="flex items-center gap-1 text-sm">
      {/* #region switcher-link */}
      {routing.locales.map((locale) => (
        <Link
          key={locale}
          href={pathname}
          locale={locale}
          lang={locale}
          hrefLang={locale}
          aria-current={locale === current ? "true" : undefined}
          className="rounded-full px-3 py-1 aria-[current]:bg-ink aria-[current]:text-paper"
        >
          {t(locale)}
        </Link>
      ))}
      {/* #endregion switcher-link */}
    </nav>
  );
}
// #endregion switcher
