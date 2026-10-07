import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("Footer");
  const meta = useTranslations("Meta");
  const year = new Date().getFullYear();

  return (
    <footer className="mbs-24 border-t border-line py-8 text-sm text-ink/70">
      <div className="container-page flex flex-wrap justify-between gap-4">
        <p>© {year} {meta("siteName")}. {t("rights")}</p>
        <p>{t("demo")}</p>
      </div>
    </footer>
  );
}
