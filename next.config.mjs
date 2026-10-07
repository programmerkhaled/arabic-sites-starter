import createNextIntlPlugin from "next-intl/plugin";

// يربط next-intl بملف src/i18n/request.js
const withNextIntl = createNextIntlPlugin();

// #region csp
// CSP بدون nonce: الصفحات تبقى ثابتة (nonce يفرض تصييراً ديناميكياً لكل طلب).
// نطاقات Google من دليل CSP الرسمي لوسم Google (Analytics وAds).
// كل نطاق دولة لـ Google يُكتب منفرداً، فلا wildcard في آخر اسم النطاق.
const isDev = process.env.NODE_ENV === "development";
const GOOGLE_TLDS = "https://www.google.com https://www.google.com.sa https://www.google.ae";
const GOOGLE_ADS = "https://www.googleadservices.com https://googleads.g.doubleclick.net https://pagead2.googlesyndication.com";

const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com https://www.googleadservices.com https://www.google.com`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' blob: data: https://www.googletagmanager.com https://*.google-analytics.com ${GOOGLE_ADS} ${GOOGLE_TLDS}`,
  "font-src 'self'",
  `connect-src 'self' https://www.googletagmanager.com https://*.google-analytics.com https://*.google.com ${GOOGLE_ADS} ${GOOGLE_TLDS} https://ad.doubleclick.net`,
  "frame-src https://www.googletagmanager.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");
// #endregion csp

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  // #region images-config
  images: {
    formats: ["image/avif", "image/webp"], // AVIF أولاً، وWebP لمن لا يدعمه
    qualities: [75], // مطلوبة منذ Next.js 16: الجودات المسموح بها فقط
  },
  // #endregion images-config
  // #region headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
  // #endregion headers
};

export default withNextIntl(nextConfig);
