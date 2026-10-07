import { defineRouting } from "next-intl/routing";

// #region routing
export const routing = defineRouting({
  locales: ["ar", "en"],
  defaultLocale: "ar",
});

// اتجاه كل لغة في مكان واحد، بدل تكرار locale === "ar" في كل ملف
export const directions = { ar: "rtl", en: "ltr" };

export function getDirection(locale) {
  return directions[locale] ?? "ltr";
}
// #endregion routing
