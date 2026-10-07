import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getTranslations } from "next-intl/server";

export const alt = "مدار — Madar";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// ImageResponse يقبل ttf وotf وwoff فقط (وليس woff2)، فنقرأ ملفات woff من حزمة Fontsource
const fontDir = join(process.cwd(), "node_modules/@fontsource/ibm-plex-sans-arabic/files");
const fonts = Promise.all(
  ["arabic", "latin"].map((subset) => readFile(join(fontDir, `ibm-plex-sans-arabic-${subset}-700-normal.woff`))),
);

// #region og-rtl
// Satori (محرك ImageResponse) يصل الحروف العربية لكنه يتجاهل dir: يرتب الكلمات
// من اليسار ويحاذي لليسار. نرتب الكلمات بأنفسنا: كل كلمة عنصر، والصف معكوس.
// يكفي لنص عربي خالص؛ الكلمات اللاتينية داخل جملة عربية تحتاج معالجة إضافية.
function Line({ text, rtl, style }) {
  if (!rtl) return <div style={style}>{text}</div>;
  return (
    <div style={{ ...style, display: "flex", flexDirection: "row-reverse", flexWrap: "wrap", gap: "0 0.28em" }}>
      {text.split(" ").map((word, i) => (
        <span key={i}>{word}</span>
      ))}
    </div>
  );
}
// #endregion og-rtl

// #region og-image
export default async function Image({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  const [arabic, latin] = await fonts;
  const rtl = locale === "ar";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: rtl ? "flex-end" : "flex-start", // المحاذاة يدوياً أيضاً
          padding: 80,
          background: "#0d0d0d",
          color: "#f9f4eb",
          fontFamily: "Plex",
        }}
      >
        <Line rtl={rtl} text={t("siteName")} style={{ fontSize: 84, color: "#ffe32e" }} />
        <Line rtl={rtl} text={t("title")} style={{ fontSize: 44, marginTop: 24 }} />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Plex", data: arabic, weight: 700, style: "normal" },
        { name: "Plex", data: latin, weight: 700, style: "normal" },
      ],
    },
  );
}
// #endregion og-image
