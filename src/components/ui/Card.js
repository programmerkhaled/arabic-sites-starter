// #region card
// border-s-4: خط التمييز على «بداية» البطاقة: يمين في العربية، يسار في الإنجليزية
export default function Card({ title, children, accent = false, className = "" }) {
  return (
    <article
      className={`rounded-2xl bg-surface p-6 ${accent ? "border-s-4 border-accent" : ""} ${className}`}
    >
      {title && <h3 className="text-xl font-bold">{title}</h3>}
      <div className="mbs-2 text-ink/75">{children}</div>
    </article>
  );
}
// #endregion card
