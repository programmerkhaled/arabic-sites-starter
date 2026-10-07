"use client";

import { useEffect, useState } from "react";

// #region submit-button
// زر إرسال بشريط تقدم ومراحل نصية: عند الرفع البطيء (سيرة ذاتية مثلاً)
// المستخدم يرى أن شيئاً يحدث بدل أن يضغط الزر مرة ثانية.
// الشريط يتقدم تقديرياً حتى 90%، وعند وصول الرد يعود الزر لنصه الأصلي.
export default function SubmitButton({ pending, label, stages }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!pending) return;
    setProgress(8);
    const id = setInterval(() => setProgress((p) => Math.min(p + (90 - p) * 0.15, 90)), 300);
    return () => {
      clearInterval(id);
      setProgress(0);
    };
  }, [pending]);

  const stage = stages[Math.min(Math.floor((progress / 90) * stages.length), stages.length - 1)];

  return (
    // #region submit-bar
    <button type="submit" disabled={pending} className="btn group relative overflow-hidden disabled:cursor-wait">
      <span
        aria-hidden="true"
        className="absolute inset-y-0 inset-s-0 bg-accent/30 transition-[width] duration-300"
        style={{ width: `${progress}%` }}
      />
      <span className="relative" aria-live="polite">
        {pending ? stage : label}
      </span>
    </button>
    // #endregion submit-bar
  );
}
// #endregion submit-button
