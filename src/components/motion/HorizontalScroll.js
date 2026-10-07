"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useDirection } from "@/lib/useDirection";

// خطوات أفقية تتحرك مع التمرير العمودي (من 768px فما فوق).
export default function HorizontalScroll({ title, steps }) {
  const root = useRef(null);
  const track = useRef(null);
  const { sign } = useDirection();

  // #region horizontal
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        // المسافة = عرض الشريط ناقص عرض الحاوية. في العربية الشريط يبدأ من اليمين
        // ويفيض جهة اليسار، فنحركه لليمين (x موجبة)؛ وفي الإنجليزية العكس
        const distance = () => track.current.offsetWidth - root.current.clientWidth;

        gsap.to(track.current, {
          x: () => -distance() * sign,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: true,
            invalidateOnRefresh: true, // إعادة الحساب عند تغيير حجم النافذة
          },
        });
      });
    },
    { scope: root, dependencies: [sign], revertOnUpdate: true },
  );
  // #endregion horizontal

  return (
    <section ref={root} id="process" className="scroll-mt-20 overflow-hidden py-20">
      <h2 className="container-page text-3xl font-bold md:text-4xl">{title}</h2>
      <ol ref={track} className="mbs-10 flex flex-col gap-6 px-5 md:w-max md:flex-row">
        {steps.map((step, i) => (
          <li key={step.key} className="rounded-2xl border border-line p-8 md:w-96">
            <span className="font-mono text-sm text-ink/60">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="mbs-3 text-2xl font-bold">{step.title}</h3>
            <p className="mbs-2 text-ink/75">{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
