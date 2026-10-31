"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, ChevronDown, Instagram, MapPin, Newspaper } from "lucide-react";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { store } from "@/data/store";
import CategoryCard from "@/components/CategoryCard";
import ProductCard from "@/components/ProductCard";
import SectionHeading from "@/components/SectionHeading";
import { useLanguage } from "@/components/LanguageProvider";

const nightSkyStars = [
  { x: "4%", y: "15%", size: "2px", duration: "4.1s", delay: "-1.7s", bright: true },
  { x: "11%", y: "63%", size: "1px", duration: "6.3s", delay: "-4.6s" },
  { x: "19%", y: "29%", size: "1.5px", duration: "3.8s", delay: "-2.1s" },
  { x: "24%", y: "84%", size: "1px", duration: "7.2s", delay: "-5.4s" },
  { x: "31%", y: "8%", size: "2px", duration: "5.1s", delay: "-3.3s", bright: true },
  { x: "36%", y: "46%", size: "1px", duration: "6.8s", delay: "-1.2s" },
  { x: "40%", y: "73%", size: "1.5px", duration: "4.7s", delay: "-3.9s" },
  { x: "47%", y: "21%", size: "1px", duration: "5.7s", delay: "-2.8s" },
  { x: "51%", y: "91%", size: "1.5px", duration: "7.4s", delay: "-6.2s" },
  { x: "57%", y: "54%", size: "2px", duration: "4.5s", delay: "-1.4s", bright: true },
  { x: "63%", y: "12%", size: "1px", duration: "6.1s", delay: "-4.8s" },
  { x: "68%", y: "77%", size: "1.5px", duration: "3.9s", delay: "-2.6s" },
  { x: "72%", y: "34%", size: "1px", duration: "5.4s", delay: "-3.6s" },
  { x: "79%", y: "93%", size: "2px", duration: "6.5s", delay: "-5.1s", bright: true },
  { x: "84%", y: "16%", size: "1.5px", duration: "4.3s", delay: "-2.4s" },
  { x: "89%", y: "58%", size: "1px", duration: "7.1s", delay: "-6.5s" },
  { x: "94%", y: "31%", size: "2px", duration: "5.8s", delay: "-3.1s", bright: true },
  { x: "8%", y: "37%", size: "1.5px", duration: "6.6s", delay: "-4.2s" },
  { x: "27%", y: "55%", size: "1px", duration: "4.8s", delay: "-2.9s" },
  { x: "42%", y: "95%", size: "1px", duration: "5.6s", delay: "-1.9s" },
  { x: "60%", y: "68%", size: "1.5px", duration: "7.3s", delay: "-5.8s" },
  { x: "74%", y: "7%", size: "1px", duration: "4.6s", delay: "-3.4s" },
  { x: "91%", y: "84%", size: "1.5px", duration: "5.2s", delay: "-1.6s" },
  { x: "53%", y: "38%", size: "1px", duration: "6.9s", delay: "-4.9s" },
  { x: "2%", y: "82%", size: "1px", duration: "5.3s", delay: "-2.7s" },
  { x: "15%", y: "8%", size: "1.5px", duration: "6.7s", delay: "-5.9s" },
  { x: "22%", y: "47%", size: "2px", duration: "4.4s", delay: "-1.5s", bright: true },
  { x: "30%", y: "94%", size: "1px", duration: "7.6s", delay: "-3.8s" },
  { x: "35%", y: "14%", size: "1px", duration: "3.7s", delay: "-2.2s" },
  { x: "44%", y: "62%", size: "1.5px", duration: "6.2s", delay: "-4.4s" },
  { x: "49%", y: "43%", size: "1px", duration: "5.5s", delay: "-1.8s" },
  { x: "56%", y: "26%", size: "2px", duration: "4.9s", delay: "-3.7s", bright: true },
  { x: "62%", y: "94%", size: "1px", duration: "6.4s", delay: "-5.2s" },
  { x: "70%", y: "87%", size: "1.5px", duration: "3.6s", delay: "-2.5s" },
  { x: "77%", y: "48%", size: "1px", duration: "7.1s", delay: "-6.1s" },
  { x: "82%", y: "73%", size: "2px", duration: "4.7s", delay: "-3.2s", bright: true },
  { x: "87%", y: "5%", size: "1px", duration: "5.9s", delay: "-4.7s" },
  { x: "96%", y: "68%", size: "1.5px", duration: "6.8s", delay: "-1.3s" },
  { x: "17%", y: "87%", size: "1px", duration: "4.2s", delay: "-3.5s" },
  { x: "33%", y: "77%", size: "1.5px", duration: "5.8s", delay: "-5.6s" },
  { x: "45%", y: "3%", size: "1px", duration: "7.3s", delay: "-2.9s" },
  { x: "58%", y: "83%", size: "1.5px", duration: "4.6s", delay: "-1.6s" },
  { x: "66%", y: "60%", size: "1px", duration: "6.5s", delay: "-4.1s" },
  { x: "80%", y: "24%", size: "1.5px", duration: "3.9s", delay: "-2.3s" },
  { x: "92%", y: "43%", size: "1px", duration: "5.1s", delay: "-5.3s" },
];

export default function HomePage() {
  const { t } = useLanguage();
  const featured = products.filter((product) => product.featured).slice(0, 6);
  const heroRef = useRef(null);
  const [shootingStars, setShootingStars] = useState([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let disposed = false;
    let nextId = 0;
    const timers = new Set();
    const schedule = (callback, delay) => {
      const timer = window.setTimeout(() => {
        timers.delete(timer);
        if (!disposed) callback();
      }, delay);
      timers.add(timer);
    };
    const launch = () => {
      schedule(() => {
        const bounds = heroRef.current?.getBoundingClientRect();
        if (bounds?.width && bounds.height) {
          const length = 52 + Math.random() * 85;
          const distanceX = Math.min(70 + Math.random() * 135, bounds.width * 0.28);
          const direction = Math.random() < 0.5 ? -1 : 1;
          const distanceY = 55 + Math.random() * 100;
          const maxX = Math.max(0, bounds.width - length - distanceX);
          const left = direction > 0
            ? Math.random() * maxX
            : distanceX + Math.random() * maxX;
          const top = Math.random() * Math.max(0, bounds.height - distanceY - 20);
          const duration = 850 + Math.random() * 750;
          const id = nextId++;
          const angle = direction * Math.atan2(distanceY, distanceX) * (180 / Math.PI);

          setShootingStars((current) => [...current.slice(-1), {
            id,
            direction,
            style: {
              left: `${left}px`,
              top: `${top}px`,
              "--meteor-length": `${length}px`,
              "--meteor-angle": `${angle}deg`,
              "--meteor-dx": `${direction * distanceX}px`,
              "--meteor-dy": `${distanceY}px`,
              animationDuration: `${duration}ms`,
            },
          }]);
          schedule(() => {
            setShootingStars((current) => current.filter((star) => star.id !== id));
          }, duration);
        }
        launch();
      }, 1400 + Math.random() * 3800);
    };

    launch();
    return () => {
      disposed = true;
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  return (
    <>
      <section className="hero" ref={heroRef}>
        <div className="hero-grain" />
        <div className="night-sky" aria-hidden="true">
          {nightSkyStars.map((star) => (
            <span
              key={`${star.x}-${star.y}`}
              className={star.bright ? "sky-star sky-star--bright" : "sky-star"}
              style={{
                "--star-x": star.x,
                "--star-y": star.y,
                "--star-size": star.size,
                "--star-duration": star.duration,
                "--star-delay": star.delay,
              }}
            />
          ))}
          {shootingStars.map((star) => (
            <span
              key={star.id}
              className={`shooting-star${star.direction < 0 ? " shooting-star--reverse" : ""}`}
              style={star.style}
            />
          ))}
        </div>
        <div className="hero-inner page-wrap">
          <div className="hero-copy">
            <span className="eyebrow light"><span className="eyebrow-line" /> {t("home.heroEyebrow")}</span>
            <h1>Il Lunario<span className="hero-period">.</span><br /><em>{t("home.heroTitle")}</em></h1>
            <p>{t("home.heroText")}</p>
            <div className="hero-actions">
              <Link href="/prodotti" className="button button-gold">{t("home.explore")} <ArrowUpRight size={16} /></Link>
              <Link href="/chi-siamo" className="hero-text-link">{t("home.story")} <ArrowRight size={15} /></Link>
            </div>
            <div className="hero-footnote"><span>01</span><span className="footnote-rule" /> {t("home.footnote")}</div>
          </div>
          <div className="hero-visual">
            <div className="hero-photo-frame">
              <Image
                src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1500&q=90"
                alt={t("home.heroImage")}
                fill
                priority
                sizes="(max-width: 900px) 90vw, 50vw"
              />
              <div className="photo-caption"><span>{t("home.photoCaption")}</span><span>{t("home.photoLocation")}</span></div>
            </div>
            <div className="hero-stamp"><span>{t("home.stamp")}</span><span className="stamp-star">✳</span></div>
            <span className="hero-side-label">{t("home.sideLabel")}</span>
          </div>
        </div>
        <a href="#categorie" className="hero-scroll" aria-label={t("a11y.scroll")}><ArrowDown size={16} /></a>
        <span className="hero-decoration" aria-hidden="true">✳</span>
      </section>

      <section className="section categories-section" id="categorie">
        <div className="page-wrap">
          <SectionHeading eyebrow={t("home.categoryEyebrow")} title={t("home.categoryTitle")} description={t("home.categoryText")} />
          <div className="category-grid">
            {categories.map((category) => <CategoryCard key={category.slug} category={category} />)}
          </div>
        </div>
      </section>

      <section className="section featured-section">
        <div className="page-wrap">
          <div className="section-topline">
            <SectionHeading eyebrow={t("home.featuredEyebrow")} title={t("home.featuredTitle")} description={t("home.featuredText")} />
            <Link className="underlined-link desktop-only" href="/prodotti">{t("home.allProducts")} <ArrowUpRight size={16} /></Link>
          </div>
          <div className="product-grid featured-grid">
            {featured.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
          <Link className="button button-outline mobile-only" href="/prodotti">{t("home.allProducts")} <ArrowRight size={15} /></Link>
        </div>
      </section>

      <section className="story-section">
        <div className="story-image">
          <Image
            src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=85"
            alt={t("home.storyImage")}
            fill
            sizes="(max-width: 780px) 100vw, 50vw"
          />
          <span className="story-image-note">{t("home.imageNote")}</span>
        </div>
        <div className="story-copy">
          <span className="eyebrow">{t("home.storyEyebrow")}</span>
          <h2>{t("home.storyTitle")}<br /><em>{t("home.storyTitleEm")}</em></h2>
          <p>{t("home.storyText")}</p>
          <Link href="/chi-siamo" className="button button-dark">{t("home.ourStory")} <ArrowUpRight size={16} /></Link>
          <span className="story-ornament" aria-hidden="true">✳</span>
        </div>
      </section>

      <section className="visit-section">
        <div className="page-wrap visit-inner">
          <div className="visit-copy">
            <span className="eyebrow light">{t("home.visitEyebrow")}</span>
            <h2>{t("home.visitTitle")}<br /><em>{t("home.visitTitleEm")}</em></h2>
            <p>{t("home.visitText")}</p>
            <Link className="button button-gold" href="/contatti">{t("home.visit")} <ArrowUpRight size={16} /></Link>
          </div>
          <div className="visit-card">
            <div className="visit-info-row"><MapPin size={18} /><div><span>{t("home.address")}</span><a href={store.mapsUrl} target="_blank" rel="noreferrer">{store.address}</a></div></div>
            <div className="visit-info-row"><Instagram size={18} /><div><span>{t("home.follow")}</span><a href={store.instagram} target="_blank" rel="noreferrer">{t("home.instagram")}</a></div></div>
            <a href={store.mapsUrl} className="map-link" target="_blank" rel="noreferrer">{t("home.openMaps")} <ArrowUpRight size={15} /></a>
          </div>
        </div>
      </section>

      <section className="press-section">
        <div className="page-wrap">
          <details className="press-accordion">
            <summary>
              <span className="press-icon" aria-hidden="true"><Newspaper size={19} /></span>
              <span className="press-summary-copy">
                <span className="press-label">{t("press.eyebrow")}</span>
                <span className="press-summary-title">{t("press.trigger")}</span>
              </span>
              <ChevronDown className="press-chevron" size={19} aria-hidden="true" />
            </summary>
            <div className="press-content">
              <div className="press-meta">
                <span>Valfiaba24</span>
                <time dateTime="2026-03-21">{t("press.date")}</time>
              </div>
              <h2>{t("press.title")}</h2>
              <p>{t("press.summary")}</p>
              <a href="#nota-demo">
                {t("press.link")} <ArrowUpRight size={15} />
              </a>
            </div>
          </details>
        </div>
      </section>

      <section className="closing-note">
        <div className="page-wrap closing-inner">
          <span>{t("home.closingA")}</span><span className="closing-mark">✳</span><span>{t("home.closingB")}</span>
        </div>
      </section>
    </>
  );
}
