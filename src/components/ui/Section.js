// #region section
// قسم موحّد: عنوان + تمهيد + محتوى، بنفس المسافات في كل الصفحة.
// كل المسافات منطقية (mbs = أعلى، pbs/pbe = حشو أعلى/أسفل) فتعمل في الاتجاهين.
export default function Section({ id, title, lead, children, className = "" }) {
  return (
    <section id={id} className={`scroll-mt-20 py-20 ${className}`}>
      <div className="container-page">
        {title && <h2 className="text-3xl font-bold md:text-4xl">{title}</h2>}
        {lead && <p className="mbs-3 max-w-2xl text-lg text-ink/70">{lead}</p>}
        <div className={title || lead ? "mbs-10" : ""}>{children}</div>
      </div>
    </section>
  );
}
// #endregion section
