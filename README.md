# المشروع التطبيقي لكتاب «المواقع العربية»

موقع ثنائي اللغة (عربي/إنجليزي) بـ Next.js وTailwind CSS وGSAP. كل مقطع كود في الكتاب مأخوذ من ملفات هذا المشروع، بين علامتي `#region` و`#endregion`.

الإصدارات وقت الكتابة: Next.js 16.3، React 19.2، Tailwind CSS 4.3، GSAP 3.15، next-intl 4.14، Nodemailer 10.0. يحتاج Node.js 20.9 أو أحدث.

## التشغيل

```bash
npm install
cp .env.example .env.local
npm run dev
```

ثم افتح `http://localhost:3000/ar` و`http://localhost:3000/en`.

للقياس (الفصل 8) استخدم نسخة الإنتاج:

```bash
npm run build
npm run start
```

بدون إعدادات SMTP في `.env.local` لا يُرسل النموذج أي إيميل، بل تُطبع الرسالة في الطرفية. وبدون `GTAG_ID` لا يُحمَّل أي سكريبت تتبع.

## أين أجد ما شرحه كل فصل

| الفصل | الملفات |
| --- | --- |
| 1. لماذا تنكسر المواقع العربية | `src/app/[locale]/lab/rtl/page.js` (مختبر الأخطاء) |
| 2. تأسيس المشروع | `src/i18n/`، `src/proxy.js`، `src/app/[locale]/layout.js`، `src/components/LocaleSwitcher.js` |
| 3. Tailwind v4 للـ RTL | `src/app/globals.css`، `src/components/ui/` |
| 4. الخطوط والأرقام | `src/app/fonts.js`، `src/lib/format.js` |
| 5. واجهات عربية صحيحة | `src/components/DirectionalIcon.js`، `Field.js`، `MobileNav.js`، `SubmitButton.js` |
| 6. GSAP في RTL | `src/lib/gsap.js`، `src/lib/useDirection.js`، `src/components/motion/`، `src/app/[locale]/lab/split/page.js` |
| 7. حركات بدون أذى | `src/components/motion/PageTransition.js`، `ClipReveal.js`، `globals.css` (vt-direction، reduced-motion) |
| 8. الأداء | `src/app/[locale]/page.js` (hero-image)، `next.config.mjs` (images) |
| 9. السيو | `src/lib/seo.js`، `src/app/sitemap.js`، `robots.js`، `opengraph-image.js`، `src/components/JsonLd.js` |
| 10. النماذج | `src/actions/contact.js`، `src/lib/mail.js`، `contact-schema.js`، `rate-limit.js`، `src/components/ContactForm.js`، `WhatsAppButton.js` |
| 11. الإطلاق | `src/components/Analytics.js`، `next.config.mjs` (csp، headers)، `.env.example` |

صفحات المختبر (`/ar/lab/...`) مستثناة من الفهرسة في `robots.js`.

## الترخيص

الكود مرخّص بترخيص MIT (ملف `LICENSE`): استخدمه في مشاريعك ومشاريع عملائك بحرية. نص الكتاب نفسه ليس جزءاً من هذا الترخيص.
