// #region directional-icon
// أيقونة اتجاهية (سهم «للأمام»): تنعكس في RTL.
// الانعكاس على العنصر الخارجي، والحركة عند المرور على العنصر الداخلي.
// لو وضعناهما على نفس العنصر: خاصية scale (من rtl:-scale-x-100) تُطبَّق قبل
// translate، فتنعكس الحركة أيضاً وتتحرك الأيقونة للخلف.
export default function DirectionalIcon({ className = "" }) {
  return (
    <span className={`inline-flex rtl:-scale-x-100 ${className}`} aria-hidden="true">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1"
      >
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </span>
  );
}
// #endregion directional-icon
