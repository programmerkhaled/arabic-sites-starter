"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

// #region split-heading
// العنوان يظهر كلمة كلمة، وليس حرفاً حرفاً: تقسيم العربية لحروف يقطع اتصالها.
// mask: "words" يلف كل كلمة بحاوية تقص ما يخرج منها، فتظهر الكلمة وكأنها تصعد من خط.
export default function SplitHeading({ children, className = "" }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      // #region split-anim
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create(ref.current, { type: "words", mask: "words" });
        gsap.from(split.words, { yPercent: 110, duration: 0.8, ease: "power3.out", stagger: 0.08 });
        return () => split.revert();
      });
      // #endregion split-anim
    },
    { scope: ref },
  );

  return <h1 ref={ref} className={className}>{children}</h1>;
}
// #endregion split-heading
