import nodemailer from "nodemailer";

// #region transport
// SMTP من متغيرات البيئة. بدونها (أثناء التطوير) لا يُرسل شيء:
// jsonTransport يبني الرسالة كاملة ويطبعها في الطرفية فقط.
const transport = process.env.SMTP_HOST
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: false, // true للمنفذ 465 فقط. مع 587 يرقّي الاتصال إلى TLS
      requireTLS: true,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    })
  : nodemailer.createTransport({ jsonTransport: true });
// #endregion transport

const escape = (value) => String(value).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

// #region mail-html
// الإيميل يصل لصاحب الموقع بلغته (العربية)، أياً كانت لغة الزائر.
// القيم بـ dir="auto": رسالة إنجليزية داخل إيميل عربي تبقى مقروءة.
export async function sendContactMail({ to, subject, replyTo, fields }) {
  const rows = fields
    .map(([label, value]) => `<p><b>${escape(label)}:</b> <span dir="auto">${escape(value)}</span></p>`)
    .join("");

  const info = await transport.sendMail({
    from: process.env.MAIL_FROM ?? process.env.SMTP_USER,
    to,
    replyTo,
    subject,
    text: fields.map(([label, value]) => `${label}: ${value}`).join("\n"),
    html: `<div dir="rtl" lang="ar" style="direction:rtl;text-align:right">${rows}</div>`,
  });
  if (!process.env.SMTP_HOST) console.log("[mail:dev]", info.message);
}
// #endregion mail-html
