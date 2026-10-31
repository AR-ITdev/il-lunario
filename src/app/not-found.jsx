"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";

export default function NotFound() {
  const { t } = useLanguage();
  return (
    <section className="not-found page-wrap">
      <span className="eyebrow">{t("contact.notFound")}</span>
      <h1>{t("contact.notFoundTitle")}<br /><em>{t("contact.notFoundEm")}</em></h1>
      <p>{t("contact.notFoundText")}</p>
      <Link className="button button-dark" href="/">{t("contact.home")} <span aria-hidden="true">↗</span></Link>
    </section>
  );
}
