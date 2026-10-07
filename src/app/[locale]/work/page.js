import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import PageTransition from "@/components/motion/PageTransition";
import ClipReveal from "@/components/motion/ClipReveal";
import { getTranslations } from "next-intl/server";
import { alternatesFor } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Work" });
  return { title: t("title"), alternates: alternatesFor(locale, "/work") };
}

export default function WorkPage() {
  const t = useTranslations("Work");
  const items = t.raw("items");

  return (
    <PageTransition>
      <section className="container-page py-24">
        {/* #region back-link */}
        <Link href="/" transitionTypes={["nav-back"]} className="text-sm underline">
          {t("back")}
        </Link>
        {/* #endregion back-link */}
        <h1 className="mbs-6 text-4xl font-bold md:text-5xl">{t("title")}</h1>
        <p className="mbs-4 max-w-2xl text-lg text-ink/75">{t("lead")}</p>
        <div className="mbs-12 grid gap-6 md:grid-cols-3">
          {items.map((item, i) => (
            <ClipReveal key={item} className="aspect-[4/3] rounded-2xl bg-ink p-6 text-paper">
              <span className="font-mono text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="mbs-3 text-2xl font-bold">{item}</h2>
            </ClipReveal>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
