"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BookOpen, Clapperboard, Dices, Sparkles } from "lucide-react";
import { categories } from "@/data/categories";
import { useLanguage } from "@/components/LanguageProvider";

const passionIcons = [BookOpen, Clapperboard, Dices, Sparkles, BookOpen];

export default function AboutPage() {
  const { t, categoryLabel, categoryDescription } = useLanguage();
  return (
    <>
      <section className="page-hero about-hero">
        <Image
          src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1800&q=85"
          alt={t("about.heroImage")}
          fill
          priority
          sizes="100vw"
        />
        <div className="page-hero-overlay" />
        <div className="page-wrap page-hero-content">
          <span className="eyebrow light"><span className="eyebrow-line" /> {t("about.eyebrow")}</span>
          <h1>{t("about.title")}<br /><em>{t("about.titleEm")}</em></h1>
          <p>{t("about.subtitle")}</p>
        </div>
      </section>
      <section className="about-intro section">
        <div className="page-wrap about-intro-grid">
          <div className="about-quote">
            <span className="eyebrow">{t("about.quoteEyebrow")}</span>
            <p>“{t("about.quote")}”</p>
            <span className="quote-mark">Il Lunario</span>
          </div>
          <div className="about-body">
            <h2>{t("about.smallWorld")}<br /><em>{t("about.bigPassions")}</em></h2>
            <p>{t("about.p1")}</p>
            <p>{t("about.p2")}</p>
            <p>{t("about.p3")}</p>
          </div>
        </div>
      </section>
      <section className="about-image-band">
        <Image
          src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1800&q=85"
          alt={t("about.bandImage")}
          fill
          sizes="100vw"
        />
        <div className="about-image-caption"><span>{t("about.band1")}</span><span>{t("about.band2")}</span><span>{t("about.band3")}</span></div>
      </section>
      <section className="section passions-section">
        <div className="page-wrap">
          <div className="section-heading centered"><span className="eyebrow">{t("about.passionsEyebrow")}</span><h2>{t("about.passionsTitle")}</h2><p>{t("about.passionsText")}</p></div>
          <div className="passion-grid">
            {categories.map((category, index) => {
              const Icon = passionIcons[index];
              return (
                <Link className="passion-card" key={category.slug} href={`/prodotti?categoria=${encodeURIComponent(category.name)}`}>
                  <span className="passion-icon"><Icon size={22} strokeWidth={1.5} /></span>
                  <span className="passion-number">{category.number}</span>
                  <h3>{categoryLabel(category.name)}</h3>
                  <p>{categoryDescription(category.slug)}</p>
                  <span className="passion-link">{t("about.explore")} <ArrowUpRight size={15} /></span>
                </Link>
              );
            })}
          </div>
          <div className="about-cta">
            <p>{t("about.closing")} <em>{t("about.closingEm")}</em></p>
            <Link className="button button-dark" href="/contatti">{t("nav.visit")} <ArrowUpRight size={16} /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
