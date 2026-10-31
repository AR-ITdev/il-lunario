"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { locale, setLocale, t } = useLanguage();
  const links = [
    { href: "/", label: t("nav.home") },
    { href: "/prodotti", label: t("nav.products") },
    { href: "/chi-siamo", label: t("nav.about") },
    { href: "/contatti", label: t("nav.contacts") },
  ];

  return (
    <header className="site-header">
      <div className="header-inner page-wrap">
        <Link
          className="brand"
          href="/"
          aria-label="Il Lunario, homepage"
          onClick={() => setOpen(false)}
        >
          <span className="brand-mark">
            <Image src="/logo-il-lunario.png" alt="" width={62} height={62} priority />
          </span>
          <span className="brand-copy">
            <span className="brand-name">Il Lunario</span>
            <span className="brand-note">Storie da scoprire</span>
          </span>
        </Link>
        <button
          className="menu-toggle"
          type="button"
          aria-label={open ? t("nav.closeMenu") : t("nav.openMenu")}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
        <nav className={`main-nav${open ? " is-open" : ""}`} aria-label={t("nav.main")}>
          {links.map((link) => {
            const active =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={active ? "nav-link active" : "nav-link"}
                aria-current={active ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
          <Link className="nav-cta" href="/contatti" onClick={() => setOpen(false)}>
            {t("nav.visit")} <span aria-hidden="true">↗</span>
          </Link>
          <div className="language-control" role="group" aria-label={t("language.label")}>
            {["it", "en", "fr"].map((language) => (
              <button
                key={language}
                className={`language-flag${locale === language ? " active" : ""}`}
                type="button"
                aria-label={t(`language.${language}`)}
                aria-pressed={locale === language}
                title={t(`language.${language}`)}
                onClick={() => setLocale(language)}
              >
                <span className={`flag-art flag-${language}`} aria-hidden="true" />
              </button>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
