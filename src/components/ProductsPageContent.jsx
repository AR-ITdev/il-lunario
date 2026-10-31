"use client";

import Image from "next/image";
import { Suspense } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import ProductExplorer from "@/components/ProductExplorer";

export default function ProductsPageContent({ initialCategory }) {
  const { t } = useLanguage();
  return (
    <>
      <section className="page-hero catalog-hero">
        <Image
          src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1800&q=85"
          alt=""
          fill
          priority
          sizes="100vw"
        />
        <div className="page-hero-overlay" />
        <div className="page-wrap page-hero-content">
          <span className="eyebrow light"><span className="eyebrow-line" /> {t("catalog.eyebrow")}</span>
          <h1>{t("catalog.title")}<br /><em>{t("catalog.titleEm")}</em></h1>
          <p>{t("catalog.subtitle")}</p>
        </div>
      </section>
      <section className="section catalog-section">
        <div className="page-wrap">
          <div className="catalog-intro">
            <span className="eyebrow">{t("catalog.introEyebrow")}</span>
            <p>{t("catalog.intro")}</p>
          </div>
          <Suspense fallback={<div className="loading-state">{t("catalog.loading")}</div>}>
            <ProductExplorer initialCategory={initialCategory} />
          </Suspense>
        </div>
      </section>
    </>
  );
}
