"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useDirection } from "@/lib/useDirection";

// #region reveal
// العناصر تدخل من جهة «بداية» السطر: من اليسار في الإنجليزية، ومن اليمين في العربية.
export default function RevealOnScroll({ children, className = "" }) {
  const root = useRef(null);
  const { sign } = useDirection();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(root.current.children, {
          x: -48 * sign, // البداية = عكس «الأمام»
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: root.current, start: "top 80%", once: true },
        });
      });
    },
    { scope: root, dependencies: [sign], revertOnUpdate: true },
  );

  return <div ref={root} className={className}>{children}</div>;
}
// #endregion reveal
