import SplitDemo from "@/components/motion/SplitDemo";

// مختبر الفصل 6: ماذا يفعل SplitText بالنص العربي؟
export const metadata = { title: "مختبر SplitText", robots: { index: false } };

const TEXT = "مواقع عربية تُقرأ كما يجب";

export default function SplitLab() {
  return (
    <main dir="rtl" lang="ar" className="mx-auto max-w-3xl space-y-8 px-4 py-12">
      <h1 className="text-2xl font-bold">SplitText والنص العربي</h1>
      {["chars", "words", "lines"].map((type) => (
        <section key={type} data-type={type} className="rounded-2xl border border-line bg-surface p-6">
          <p className="mbe-3 font-mono text-sm text-ink/60" dir="ltr">type: &quot;{type}&quot;</p>
          <SplitDemo type={type} text={TEXT} />
        </section>
      ))}
    </main>
  );
}
