"use client";

import Image from "next/image";
import { Instagram, MapPin, ArrowUpRight } from "lucide-react";
import { store } from "@/data/store";
import ContactForm from "@/components/ContactForm";
import { useLanguage } from "@/components/LanguageProvider";

export default function ContactPageContent({ initialSubject }) {
  const { t } = useLanguage();
  const productSubject = initialSubject.startsWith("Informazioni su ")
    ? `${t("contact.productSubject")}${initialSubject.slice("Informazioni su ".length)}`
    : initialSubject;
  return (
    <>
      <section className="page-hero contact-hero">
        <Image
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1800&q=85"
          alt=""
          fill
          priority
          sizes="100vw"
        />
        <div className="page-hero-overlay" />
        <div className="page-wrap page-hero-content">
          <span className="eyebrow light"><span className="eyebrow-line" /> {t("contact.eyebrow")}</span>
          <h1>{t("contact.title")}<br /><em>{t("contact.titleEm")}</em></h1>
          <p>{t("contact.subtitle")}</p>
        </div>
      </section>
      <section className="section contact-section">
        <div className="page-wrap contact-layout">
          <aside className="contact-sidebar">
            <span className="eyebrow">{t("contact.shop")}</span>
            <h2>{t("contact.chat")}<br /><em>{t("contact.chatEm")}</em></h2>
            <p>{t("contact.intro")}</p>
            <div className="contact-detail"><MapPin size={18} /><div><span>{t("contact.address")}</span><a href={store.mapsUrl} target="_blank" rel="noreferrer">{store.address} <ArrowUpRight size={13} /></a></div></div>
            <div className="contact-detail"><Instagram size={18} /><div><span>{t("contact.instagram")}</span><a href={store.instagram} target="_blank" rel="noreferrer">@il.lunario <ArrowUpRight size={13} /></a></div></div>
            <div className="hours-block">
              <div className="hours-title"><Instagram size={17} /><h3>{t("contact.hours")}</h3></div>
              <p className="hours-note">{t("contact.hoursText")}</p>
              <a className="map-link" href={store.instagram} target="_blank" rel="noreferrer">{t("contact.follow")} <ArrowUpRight size={15} /></a>
            </div>
            <a className="map-card" href={store.mapsUrl} target="_blank" rel="noreferrer">
              <span className="map-pin"><MapPin size={19} /></span>
              <span><strong>{store.address}</strong><small>{t("contact.openMap")}</small></span>
              <ArrowUpRight size={16} />
            </a>
          </aside>
          <div className="form-panel">
            <div className="form-panel-heading">
              <span className="eyebrow">{t("contact.formEyebrow")}</span>
              <h2>{t("contact.formTitle")}</h2>
              <p>{t("contact.formText")}</p>
            </div>
            <ContactForm initialSubject={productSubject} />
          </div>
        </div>
      </section>
    </>
  );
}
