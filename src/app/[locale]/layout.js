import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import { routing, getDirection } from "@/i18n/routing";
import { SITE_URL, OG_LOCALES } from "@/lib/seo";
import { fontVariables } from "@/app/fonts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Analytics from "@/components/Analytics";
import "../globals.css";

// #region static-params
// صفحة ثابتة لكل لغة وقت البناء
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
// #endregion static-params

// #region layout-metadata
// ما يشترك فيه كل الصفحات فقط. canonical وhreflang لكل صفحة في page.js الخاص بها
export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return {
    metadataBase: new URL(SITE_URL),
    title: t("title"),
    description: t("description"),
    openGraph: {
      type: "website",
      siteName: t("siteName"),
      locale: OG_LOCALES[locale],
      alternateLocale: routing.locales.filter((l) => l !== locale).map((l) => OG_LOCALES[l]),
    },
  };
}
// #endregion layout-metadata

// #region granted-regions
// الدول التي يوافق العميل على تفعيل التتبع فيها افتراضياً، مثل "SA,AE"
const GRANTED_REGIONS = process.env.CONSENT_GRANTED_REGIONS?.split(",").filter(Boolean);
// #endregion granted-regions

// #region locale-layout
export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  return (
    <html lang={locale} dir={getDirection(locale)} className={fontVariables}>
      <body>
        <NextIntlClientProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </NextIntlClientProvider>
        {/* #region analytics-tag */}
        <Analytics tagId={process.env.GTAG_ID} grantedRegions={GRANTED_REGIONS} />
        {/* #endregion analytics-tag */}
      </body>
    </html>
  );
}
// #endregion locale-layout
