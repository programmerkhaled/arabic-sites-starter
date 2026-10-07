import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// #region proxy
// Next.js 16: هذا الملف اسمه proxy.js (كان middleware.js)
// يحوّل الزائر من / إلى /ar أو /en حسب لغة متصفحه
export default createMiddleware(routing);

export const config = {
  // كل المسارات ما عدا الـ API وملفات Next الداخلية والملفات الثابتة (فيها نقطة)
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
// #endregion proxy
