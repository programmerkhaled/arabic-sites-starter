// #region validate
// تحقق مشترك بين المتصفح والخادم. يرجع مفاتيح ترجمة وليس نصوصاً،
// فتعرض الواجهة الرسالة بلغة الزائر، والخادم لا يعرف شيئاً عن اللغة.
export const KINDS = ["inquiry", "job"];

export function validateContact(data) {
  const errors = {};
  const name = String(data.name ?? "").trim();
  const email = String(data.email ?? "").trim();
  const message = String(data.message ?? "").trim();

  if (!name) errors.name = "required";
  if (!email) errors.email = "required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "invalidEmail";
  if (!message) errors.message = "required";
  else if (message.length > 5000) errors.message = "tooLong";
  if (!KINDS.includes(data.kind)) errors.form = "error";
  return errors;
}
// #endregion validate
