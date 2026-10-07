"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

// #region mobile-nav
// القائمة تخرج من جهة «نهاية» السطر: يسار في العربية، يمين في الإنجليزية.
// inset-e-0 يضعها في المكان الصحيح تلقائياً، لكن translate ليس منطقياً:
// translate-x-full يدفعها لليمين دائماً، فنحتاج rtl: لعكس الاتجاه.
export default function MobileNav({ items }) {
  const t = useTranslations("Nav");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(true)}
        className="rounded-full border border-line px-4 py-1.5 text-sm"
      >
        {t("menu")}
      </button>

      {/* الحاوية تقص القائمة المخفية (overflow-hidden). بدونها، القائمة المزاحة خارج
          الشاشة توسّع منطقة التمرير الأفقي فتظهر مساحة فارغة وتتزحزح الصفحة.
          inert: روابط القائمة المغلقة لا تستقبل التركيز من لوحة المفاتيح */}
      {/* #region drawer-container */}
      <div
        className={`fixed inset-0 z-40 overflow-hidden ${open ? "" : "pointer-events-none"}`}
        inert={!open}
      >
        {/* #endregion drawer-container */}
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-ink/40 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
        />
        {/* #region drawer-nav */}
        <nav
          id="mobile-menu"
          aria-label={t("menu")}
          className={`absolute inset-y-0 inset-e-0 w-72 bg-paper p-6 shadow-xl transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full rtl:-translate-x-full"
          }`}
        >
          {/* #endregion drawer-nav */}
          <button type="button" onClick={() => setOpen(false)} className="mbe-8 text-sm underline">
            {t("close")}
          </button>
          <ul className="space-y-4 text-lg">
            {items.map((id) => (
              <li key={id}>
                <Link href={{ pathname: "/", hash: id }} onClick={() => setOpen(false)}>
                  {t(id)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
// #endregion mobile-nav
