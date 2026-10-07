import Script from "next/script";

// #region analytics
// وسم Google (gtag.js) لـ Analytics أو Ads، مع Consent Mode.
// الافتراضي denied لكل الزوار، وgranted فقط في الدول التي يحددها العميل.
// الترتيب مهم: أوامر الموافقة الافتراضية قبل config، وإلا لا تعمل.
export default function Analytics({ tagId, grantedRegions = [] }) {
  if (!/^(G|AW)-[A-Z0-9]+$/.test(tagId ?? "")) return null;

  const all = (value) =>
    `ad_storage:"${value}",ad_user_data:"${value}",ad_personalization:"${value}",analytics_storage:"${value}"`;
  const regional = grantedRegions.length
    ? `gtag("consent","default",{${all("granted")},region:${JSON.stringify(grantedRegions)}});`
    : "";

  return (
    <>
      <Script id="gtag-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag("consent","default",{${all("denied")}});
${regional}
gtag("js", new Date());
gtag("config", "${tagId}");`}
      </Script>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${tagId}`} strategy="afterInteractive" />
    </>
  );
}
// #endregion analytics
