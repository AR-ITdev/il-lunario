"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Sparkles } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { useLanguage } from "@/components/LanguageProvider";

export default function ProductDetailContent({ product, related }) {
  const { t, categoryLabel, productText } = useLanguage();
  const copy = productText(product.slug, product.shortDescription, product.description);

  return (
    <>
      <section className="detail-section page-wrap">
        <Link href="/prodotti" className="back-link"><ArrowLeft size={15} /> {t("product.back")}</Link>
        <div className="detail-layout">
          <div className="detail-image">
            <Image src={product.image} alt={product.name} fill priority sizes="(max-width: 800px) 100vw, 50vw" />
            <span className="detail-image-label"><Sparkles size={14} /> {t("product.inStock")}</span>
          </div>
          <div className="detail-copy">
            <span className="eyebrow">{categoryLabel(product.category)}</span>
            <h1>{product.name}</h1>
            <p className="detail-lead">{copy.shortDescription}</p>
            <div className="ornamental-rule"><span>✳</span></div>
            <p className="detail-description">{copy.description}</p>
            <div className="detail-note">
              <span>{t("product.curiosity")}</span>
              <p>{t("product.askText")}</p>
            </div>
            <div className="detail-actions">
              <Link className="button button-dark" href={`/contatti?oggetto=${encodeURIComponent(`Informazioni su ${product.name}`)}`}>{t("product.ask")} <ArrowUpRight size={16} /></Link>
              <Link className="underlined-link" href="/prodotti">{t("product.other")} <span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </div>
      </section>
      {related.length > 0 && (
        <section className="section related-section">
          <div className="page-wrap">
            <div className="section-topline">
              <div className="section-heading"><span className="eyebrow">{t("product.relatedEyebrow")}</span><h2>{t("product.relatedTitle")}</h2></div>
              <Link className="underlined-link desktop-only" href="/prodotti">{t("home.allProducts")} <ArrowUpRight size={16} /></Link>
            </div>
            <div className="product-grid">{related.map((item) => <ProductCard key={item.id} product={item} />)}</div>
          </div>
        </section>
      )}
    </>
  );
}
