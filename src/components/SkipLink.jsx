"use client";

import { useLanguage } from "@/components/LanguageProvider";

export default function SkipLink() {
  const { t } = useLanguage();
  return <a className="skip-link" href="#contenuto">{t("a11y.skip")}</a>;
}
