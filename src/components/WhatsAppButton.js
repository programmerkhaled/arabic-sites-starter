// #region whatsapp
// رابط واتساب برسالة جاهزة. الرقم بالصيغة الدولية أرقاماً فقط:
// بلا + ولا أصفار في البداية ولا مسافات (مثل 9665xxxxxxxx).
// النص العربي يُرمَّز بـ encodeURIComponent، وإلا انقطع عند أول مسافة أو علامة.
export default function WhatsAppButton({ phone, text, label }) {
  // #region wa-link
  const href = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  // #endregion wa-link
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
      {label}
    </a>
  );
}
// #endregion whatsapp
