import { useLocale, useTranslations } from "next-intl";
import Section from "@/components/ui/Section";
import { formatNumber, formatCurrency } from "@/lib/format";

// #region stats
// التنسيق في Server Component: الرقم يُنسَّق مرة واحدة على الخادم،
// فلا يختلف ناتج Node عن ناتج المتصفح ولا يظهر خطأ hydration.
export default function Stats() {
  // #region stats-items
  const t = useTranslations("Stats");
  const locale = useLocale();

  const items = [
    { value: formatNumber(120, locale), label: t("projects") },
    { value: formatNumber(2, locale), label: t("languages") },
    { value: formatCurrency(15000, locale), label: t("budget") },
  ];
  // #endregion stats-items

  return (
    <Section title={t("title")} lead={t("note")}>
      <dl className="grid gap-6 sm:grid-cols-3">
        {items.map((item) => (
          <div key={item.label} className="rounded-2xl border border-line p-6">
            <dt className="text-ink/70">{item.label}</dt>
            <dd className="mbs-2 text-4xl font-bold tabular-nums">{item.value}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
// #endregion stats
