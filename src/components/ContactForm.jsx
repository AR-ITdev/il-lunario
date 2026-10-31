"use client";

import { useState } from "react";
import { Copy, Send } from "lucide-react";
import { store } from "@/data/store";
import { useLanguage } from "@/components/LanguageProvider";

export default function ContactForm({ initialSubject = "" }) {
  const [errors, setErrors] = useState({});
  const [draft, setDraft] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  const { t } = useLanguage();

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const nextErrors = {};
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const subject = String(data.get("subject") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (name.length < 2) nextErrors.name = t("form.nameError");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = t("form.emailError");
    if (subject.length < 3) nextErrors.subject = t("form.subjectError");
    if (message.length < 10) nextErrors.message = t("form.messageError");
    if (!data.get("confirmation")) nextErrors.confirmation = t("form.confirmError");

    setErrors(nextErrors);
    setCopyStatus("");
    if (Object.keys(nextErrors).length) {
      setDraft("");
      return;
    }
    setDraft(`Ciao Il Lunario,\n\n${message}\n\n${subject}\nDa: ${name} (${email})`);
  }

  async function copyMessage() {
    try {
      if (!navigator.clipboard) throw new Error("Clipboard API unavailable.");
      await navigator.clipboard.writeText(draft);
      setCopyStatus(t("form.copied"));
    } catch {
      setCopyStatus(t("form.copyFailed"));
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="form-row">
        <label className="form-field">
          {t("form.name")}
          <input name="name" autoComplete="name" placeholder={t("form.namePlaceholder")} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} />
          {errors.name && <span id="name-error" className="field-error">{errors.name}</span>}
        </label>
        <label className="form-field">
          {t("form.email")}
          <input name="email" type="email" autoComplete="email" placeholder={t("form.emailPlaceholder")} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} />
          {errors.email && <span id="email-error" className="field-error">{errors.email}</span>}
        </label>
      </div>
      <label className="form-field">
        {t("form.subject")}
        <input name="subject" defaultValue={initialSubject} placeholder={t("form.subjectPlaceholder")} aria-invalid={Boolean(errors.subject)} aria-describedby={errors.subject ? "subject-error" : undefined} />
        {errors.subject && <span id="subject-error" className="field-error">{errors.subject}</span>}
      </label>
      <label className="form-field">
        {t("form.message")}
        <textarea name="message" rows={5} placeholder={t("form.messagePlaceholder")} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "message-error" : undefined} />
        {errors.message && <span id="message-error" className="field-error">{errors.message}</span>}
      </label>
      <label className="privacy-check">
        <input type="checkbox" name="confirmation" />
        <span>{t("form.confirm")}</span>
      </label>
      {errors.confirmation && <span className="field-error privacy-error">{errors.confirmation}</span>}
      <button className="button button-dark form-submit" type="submit">{t("form.prepare")} <Send size={15} /></button>
      {draft && (
        <div className="message-draft">
          <p role="status">{t("form.ready")}</p>
          <label className="form-field">
            {t("form.message")}
            <textarea value={draft} readOnly rows={5} onFocus={(event) => event.target.select()} />
          </label>
          <div className="draft-actions">
            <button className="button button-outline" type="button" onClick={copyMessage}>{t("form.copy")} <Copy size={15} /></button>
            <a className="underlined-link" href={store.instagram} target="_blank" rel="noreferrer">{t("form.sendInstagram")} <Send size={14} /></a>
          </div>
          {copyStatus && <p className="copy-status" role="status">{copyStatus}</p>}
        </div>
      )}
      <p className="form-note">{t("form.note")}</p>
    </form>
  );
}
