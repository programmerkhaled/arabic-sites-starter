"use client";

import { useRef } from "react";
import { SplitText, useGSAP } from "@/lib/gsap";

// #region split-demo
// يقسّم النص بالنوع المطلوب ويترك التقسيم ظاهراً (بلا حركة) لنرى ماذا يحدث للعربية
export default function SplitDemo({ type, text }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const split = SplitText.create(ref.current, { type, [`${type}Class`]: "split-piece" });
      return () => split.revert();
    },
    { scope: ref },
  );

  return (
    <p ref={ref} className="text-4xl font-bold leading-relaxed">
      {text}
    </p>
  );
}
// #endregion split-demo
