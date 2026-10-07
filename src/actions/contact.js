"use server";

import { headers } from "next/headers";
import { validateContact } from "@/lib/contact-schema";
import { sendContactMail } from "@/lib/mail";
import { isRateLimited } from "@/lib/rate-limit";

// #region destinations
// الوجهة تُحدَّد على الخادم من نوع النموذج.
// المتصفح يرسل النوع فقط ("inquiry" أو "job")، ولا يرسل أي عنوان إيميل.
const DESTINATIONS = {
  inquiry: { mailTo: process.env.CONTACT_TO, subject: "استفسار جديد من الموقع" },
  job: { mailTo: process.env.HR_TO, sheet: process.env.JOBS_SHEET_URL, subject: "طلب توظيف جديد" },
};
// #endregion destinations

async function postToSheet(url, row) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(row),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`sheet ${res.status}`);
}

// #region action-guard
export async function sendContact(prevState, formData) {
  const data = Object.fromEntries(formData);
  const values = { name: data.name, email: data.email, phone: data.phone, message: data.message };

  // حقل الفخ: الزائر لا يراه، والبرامج الآلية تملؤه. نجاح وهمي بلا إرسال.
  if (data.website) return { status: "sent" };

  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0].trim() ?? "local";
  if (isRateLimited(ip)) return { status: "error", message: "tooMany", values };

  const errors = validateContact(data);
  if (Object.keys(errors).length) return { status: "invalid", errors, values };
  // #endregion action-guard

  // #region action-send
  const dest = DESTINATIONS[data.kind];
  try {
    await sendContactMail({
      to: dest.mailTo,
      subject: dest.subject,
      replyTo: data.email,
      fields: [["الاسم", data.name], ["الإيميل", data.email], ["الجوال", data.phone || "—"],
        ["لغة الزائر", data.locale], ["الرسالة", data.message]],
    });
    if (dest.sheet) await postToSheet(dest.sheet, { ...values, date: new Date().toISOString() });
    return { status: "sent" };
  } catch (error) {
    console.error("[contact]", error.code, error.response ?? error.message);
    return { status: "error", message: "error", values };
  }
}
// #endregion action-send
