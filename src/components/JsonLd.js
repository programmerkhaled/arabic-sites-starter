// #region json-ld
// بيانات منظمة لمحركات البحث. استبدال < بمقابله يمنع حقن HTML عبر النص (توصية توثيق Next.js)
export default function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\u003c") }}
    />
  );
}
// #endregion json-ld
