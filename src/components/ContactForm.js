"use client";

import { useActionState, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { sendContact } from "@/actions/contact";
import { validateContact } from "@/lib/contact-schema";
import Field from "./Field";
import SubmitButton from "./SubmitButton";

export default function ContactForm({ kind = "inquiry" }) {
  const t = useTranslations("Contact");
  const locale = useLocale();
  // #region contact-form
  const [state, formAction, pending] = useActionState(sendContact, { status: "idle" });
  const [clientErrors, setClientErrors] = useState(null);

  // التحقق في المتصفح أولاً: لا طلب للخادم إذا كانت البيانات ناقصة.
  function onSubmit(event) {
    const errors = validateContact(Object.fromEntries(new FormData(event.currentTarget)));
    setClientErrors(errors);
    if (Object.keys(errors).length) event.preventDefault();
  }
  // #endregion contact-form

  const errors = { ...state.errors, ...clientErrors };
  const err = (name) => (errors[name] ? t(errors[name]) : undefined);
  const v = state.values ?? {};

  if (state.status === "sent") return <p role="status" className="text-lg font-bold">{t("sent")}</p>;

  return (
    <form action={formAction} onSubmit={onSubmit} noValidate className="relative grid max-w-2xl gap-5">
      <input type="hidden" name="kind" value={kind} />
      <input type="hidden" name="locale" value={locale} />
      {/* #region honeypot-field */}
      <div aria-hidden="true" className="absolute -start-[9999px] top-0">
        <label>Website <input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      {/* #endregion honeypot-field */}
      <Field label={t("name")} name="name" autoComplete="name" defaultValue={v.name} error={err("name")} />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t("email")} name="email" type="email" ltr autoComplete="email" defaultValue={v.email} error={err("email")} />
        <Field label={t("phone")} name="phone" type="tel" ltr autoComplete="tel" defaultValue={v.phone} />
      </div>
      <Field label={t("message")} name="message" multiline defaultValue={v.message} error={err("message")} />
      {(state.message ?? errors.form) && <p role="alert" className="text-red-700">{t(state.message ?? errors.form)}</p>}
      <div>
        <SubmitButton pending={pending} label={t("submit")} stages={t.raw("stages")} />
      </div>
    </form>
  );
}
