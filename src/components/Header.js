import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LocaleSwitcher from "./LocaleSwitcher";
import MobileNav from "./MobileNav";

const NAV = ["services", "process", "contact"];

export default function Header() {
  const t = useTranslations("Nav");
  const meta = useTranslations("Meta");

  return (
    <header className="sticky top-0 z-40 border-b border-line" style={{ viewTransitionName: "site-header" }}>
      {/* #region header-blur */}
      {/* الضبابية على طبقة منفصلة وليس على header نفسه: backdrop-filter يجعل العنصر
          «حاوية» لأي عنصر fixed بداخله، فتنحصر قائمة الموبايل في ارتفاع الهيدر */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-paper/90 backdrop-blur" />
      {/* #endregion header-blur */}
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:inset-s-4 focus:top-4 btn">
        {t("skip")}
      </a>
      <div className="container-page flex h-16 items-center justify-between gap-6">
        <Link href="/" className="text-xl font-bold">
          {meta("siteName")}
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {NAV.map((id) => (
            <Link key={id} href={{ pathname: "/", hash: id }} className="hover:underline">
              {t(id)}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <LocaleSwitcher />
          <MobileNav items={NAV} />
        </div>
      </div>
    </header>
  );
}
