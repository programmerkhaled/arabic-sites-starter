// #region field
// حقل نموذج موحّد. ltr: للإيميل والهاتف والروابط، تُكتب دائماً من اليسار
// حتى في نموذج عربي، مع إبقاء الـ label ورسالة الخطأ باتجاه الصفحة.
export default function Field({ label, name, type = "text", ltr = false, error, multiline = false, ...props }) {
  const Input = multiline ? "textarea" : "input";
  const id = `field-${name}`;

  return (
    <div>
      <label htmlFor={id} className="block font-bold">{label}</label>
      {/* #region field-input */}
      <Input
        id={id}
        name={name}
        type={multiline ? undefined : type}
        dir={ltr ? "ltr" : undefined}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`mbs-2 w-full rounded-xl border border-line bg-paper px-4 py-3 outline-none focus:border-ink aria-[invalid]:border-red-700 ${ltr ? "text-start" : ""} ${multiline ? "min-h-32" : ""}`}
        {...props}
      />
      {/* #endregion field-input */}
      {error && (
        <p id={`${id}-error`} className="mbs-1 text-sm text-red-700">{error}</p>
      )}
    </div>
  );
}
// #endregion field
