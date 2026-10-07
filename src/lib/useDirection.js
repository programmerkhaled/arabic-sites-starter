"use client";

import { useLocale } from "next-intl";
import { getDirection } from "@/i18n/routing";

// #region use-direction
// GSAP لا يعرف شيئاً عن dir: x الموجبة يمين دائماً.
// sign يحوّل «للأمام» إلى رقم: +1 في الإنجليزية (يمين)، -1 في العربية (يسار).
export function useDirection() {
  const dir = getDirection(useLocale());
  return { dir, isRtl: dir === "rtl", sign: dir === "rtl" ? -1 : 1 };
}
// #endregion use-direction
