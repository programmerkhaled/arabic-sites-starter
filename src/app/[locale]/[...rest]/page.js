import { notFound } from "next/navigation";

// أي مسار غير موجود داخل اللغة يعرض صفحة 404 المترجمة
export default function CatchAll() {
  notFound();
}
