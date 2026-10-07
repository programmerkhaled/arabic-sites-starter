"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useDirection } from "@/lib/useDirection";

// قسم خدمات مثبّت: البطاقات تظهر واحدة بعد الأخرى أثناء التمرير، ومؤشر تقدم جانبي.
export default function PinnedServices({ title, lead, items }) {
  const root = useRef(null);
  const { sign } = useDirection();

  // #region pinned
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        {
          mobile: "(max-width: 767px)",
          tablet: "(min-width: 768px) and (max-width: 1023px)",
          motion: "(prefers-reduced-motion: no-preference)",
        },
        (ctx) => {
          const { mobile, tablet, motion } = ctx.conditions;
          if (!motion) return; // بدون حركة: البطاقات ظاهرة كلها بلا تثبيت

          // مسافة التثبيت حسب الشاشة: الجوال أقصر لأن الإصبع يمرر أسرع
          const distance = mobile ? 2000 : tablet ? 2300 : 2600;
          const cards = gsap.utils.toArray(".service-card", root.current);

          const tl = gsap.timeline({
            scrollTrigger: { trigger: root.current, start: "top top", end: `+=${distance}`, pin: true, scrub: true },
          });
          // البطاقة التالية تدخل من جهة «الأمام»: يمين في الإنجليزية، يسار في العربية
          tl.from(cards, { xPercent: 30 * sign, opacity: 0, stagger: 1, ease: "power2.out" });
          tl.from(".service-progress", { scaleY: 0, ease: "none", duration: tl.duration() }, 0);
        },
      );
    },
    { scope: root, dependencies: [sign], revertOnUpdate: true },
  );
  // #endregion pinned

  return (
    // overflow-x-clip: البطاقات تبدأ مزاحة جهة «الأمام» (يسار في العربية)، وبدونه
    // تتسع منطقة التمرير الأفقي. clip وليس hidden حتى لا يصبح القسم حاوية تمرير
    <section ref={root} id="services" className="scroll-mt-20 overflow-x-clip py-20">
      <div className="container-page grid gap-8 md:grid-cols-[auto_1fr]">
        <div aria-hidden="true" className="hidden w-1 overflow-hidden rounded-full bg-line md:block">
          {/* المؤشر عمودي: scaleY من الأعلى لا يتأثر باتجاه اللغة */}
          <div className="service-progress h-full origin-top bg-ink" />
        </div>
        <div>
          <h2 className="text-3xl font-bold md:text-4xl">{title}</h2>
          <p className="mbs-3 max-w-2xl text-lg text-ink/70">{lead}</p>
          <div className="mbs-10 grid gap-6 md:grid-cols-3">
            {items.map((item, i) => (
              <article
                key={item.key}
                className={`service-card rounded-2xl bg-surface p-6 ${i === 0 ? "border-s-4 border-accent" : ""}`}
              >
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="mbs-2 text-ink/75">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
