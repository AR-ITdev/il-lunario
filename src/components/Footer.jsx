"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Instagram, MapPin, WandSparkles } from "lucide-react";
import { categories } from "@/data/categories";
import { store } from "@/data/store";
import { useLanguage } from "@/components/LanguageProvider";

export default function Footer() {
  const { t, categoryLabel } = useLanguage();
  return (
    <footer className="site-footer">
      <div className="page-wrap">
        <div className="footer-main">
          <div className="footer-intro">
            <Link className="footer-brand" href="/">
              <Image src="/logo-il-lunario.png" alt="" width={66} height={66} />
              <span>Il Lunario</span>
            </Link>
            <p>{t("footer.tagline")}</p>
            <a className="social-link" href={store.instagram} aria-label="Instagram">
              <Instagram size={17} /> {t("footer.instagram")} <ArrowUpRight size={14} />
            </a>
          </div>
          <div className="footer-column">
            <h2>{t("footer.explore")}</h2>
            <Link href="/">{t("nav.home")}</Link>
            <Link href="/prodotti">{t("footer.allProducts")}</Link>
            <Link href="/chi-siamo">{t("footer.story")}</Link>
            <Link href="/contatti">{t("nav.contacts")}</Link>
          </div>
          <div className="footer-column">
            <h2>{t("footer.passions")}</h2>
            {categories.map((category) => (
              <Link key={category.slug} href={`/prodotti?categoria=${encodeURIComponent(category.name)}`}>
                {categoryLabel(category.name)}
              </Link>
            ))}
          </div>
          <div className="footer-column footer-contact">
            <h2>{t("footer.findUs")}</h2>
            <a href={store.mapsUrl} target="_blank" rel="noreferrer"><MapPin size={15} /> {store.address}</a>
            <a href={store.instagram} target="_blank" rel="noreferrer"><Instagram size={15} /> {t("footer.updated")}</a>
            <Link href="/contatti">{t("nav.contacts")} <ArrowUpRight size={14} /></Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Il Lunario. {t("footer.copyright")}</span>
          <span>{t("footer.made")}</span>
        </div>
        <div className="footer-demo">
          <p id="nota-demo" className="demo-badge">
            <span className="demo-badge-mark" aria-hidden="true"><WandSparkles size={13} /></span>
            <span className="demo-badge-label">{t("footer.demoLabel")}</span>
            <span className="demo-badge-text">{t("footer.demoNote")}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
