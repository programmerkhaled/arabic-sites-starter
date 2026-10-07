import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("NotFound");
  return (
    <section className="container-page py-32 text-center">
      <p className="font-mono text-6xl font-bold">404</p>
      <h1 className="mbs-4 text-2xl font-bold">{t("title")}</h1>
      <p className="mbs-2 text-ink/70">{t("text")}</p>
      <Link href="/" className="btn mbs-8">{t("back")}</Link>
    </section>
  );
}
