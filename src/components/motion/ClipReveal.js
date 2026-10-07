"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useDirection } from "@/lib/useDirection";

// #region clip-reveal
// clip-path: inset(أعلى يمين أسفل يسار) فيزيائي مثل margin-left.
// الكشف من «بداية» السطر يعني إخفاء جهة النهاية أولاً: اليمين في الإنجليزية، اليسار في العربية.
export default function ClipReveal({ children, className = "" }) {
  const ref = useRef(null);
  const { isRtl } = useDirection();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const hidden = isRtl ? "inset(0% 0% 0% 100%)" : "inset(0% 100% 0% 0%)";
        gsap.fromTo(
          ref.current,
          { clipPath: hidden },
          {
            clipPath: "inset(0% 0% 0% 0%)", // GSAP يضيف -webkit- تلقائياً إذا احتاجه المتصفح
            duration: 1,
            ease: "power3.inOut",
            scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
          },
        );
      });
    },
    { scope: ref, dependencies: [isRtl], revertOnUpdate: true },
  );

  return <div ref={ref} className={className}>{children}</div>;
}
// #endregion clip-reveal
