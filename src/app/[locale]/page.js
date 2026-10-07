import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import Section from "@/components/ui/Section";
import Stats from "@/components/sections/Stats";
import DirectionalIcon from "@/components/DirectionalIcon";
import ContactForm from "@/components/ContactForm";
import WhatsAppButton from "@/components/WhatsAppButton";
import SplitHeading from "@/components/motion/SplitHeading";
import PinnedServices from "@/components/motion/PinnedServices";
import HorizontalScroll from "@/components/motion/HorizontalScroll";
import RevealOnScroll from "@/components/motion/RevealOnScroll";
import PageTransition from "@/components/motion/PageTransition";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, alternatesFor } from "@/lib/seo";

const SERVICES = ["web", "motion", "care"];
const STEPS = ["discover", "design", "build", "launch"];

// #region page-metadata
export async function generateMetadata({ params }) {
  const { locale } = await params;
  return { alternates: alternatesFor(locale) };
}
// #endregion page-metadata

export default function Home() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <PageTransition>
      {/* #region home-jsonld */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: t("Meta.siteName"),
          description: t("Meta.description"),
          url: SITE_URL,
          inLanguage: locale,
        }}
      />
      {/* #endregion home-jsonld */}
      <section className="container-page grid items-center gap-12 py-24 md:grid-cols-2">
        <div>
          <p className="inline-block rounded-full border border-line px-4 py-1 text-sm">{t("Hero.kicker")}</p>
          <SplitHeading className="mbs-6 max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
            {t("Hero.title")}
          </SplitHeading>
          <p className="mbs-6 max-w-2xl text-lg text-ink/75">{t("Hero.lead")}</p>
          <div className="mbs-10 flex flex-wrap gap-3">
            <Link href={{ pathname: "/", hash: "contact" }} className="btn group">
              {t("Hero.cta")} <DirectionalIcon />
            </Link>
            <Link href={{ pathname: "/", hash: "services" }} className="btn btn-ghost">{t("Hero.secondary")}</Link>
          </div>
          {/* #region forward-link */}
          <Link href="/work" transitionTypes={["nav-forward"]} className="group mbs-8 inline-flex items-center gap-2 font-bold underline">
            {t("Work.link")} <DirectionalIcon />
          </Link>
          {/* #endregion forward-link */}
        </div>
        {/* #region hero-image */}
        <Image
          src="/images/hero.png"
          alt=""
          width={2400}
          height={1500}
          sizes="(min-width: 768px) 50vw, 100vw"
          loading="eager"
          fetchPriority="high"
          className="h-auto w-full rounded-2xl"
        />
        {/* #endregion hero-image */}
      </section>

      <PinnedServices
        title={t("Services.title")}
        lead={t("Services.lead")}
        items={SERVICES.map((key) => ({
          key,
          title: t(`Services.items.${key}.title`),
          text: t(`Services.items.${key}.text`),
        }))}
      />

      <HorizontalScroll
        title={t("Process.title")}
        steps={STEPS.map((key) => ({
          key,
          title: t(`Process.steps.${key}.title`),
          text: t(`Process.steps.${key}.text`),
        }))}
      />

      <RevealOnScroll>
        <Stats />
      </RevealOnScroll>

      <Section id="contact" title={t("Contact.title")} lead={t("Contact.lead")}>
        <ContactForm />
        {process.env.WHATSAPP_NUMBER && (
          <div className="mbs-8">
            <WhatsAppButton phone={process.env.WHATSAPP_NUMBER} text={t("Contact.whatsappText")} label={t("Contact.whatsapp")} />
          </div>
        )}
      </Section>
    </PageTransition>
  );
}
