import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

export default function CategoryCard({ category }) {
  const { t, categoryLabel, categoryDescription } = useLanguage();
  return (
    <Link
      className="category-card"
      href={`/prodotti?categoria=${encodeURIComponent(category.name)}`}
      aria-label={`${t("category.discover")} ${categoryLabel(category.name)}`}
    >
      <Image src={category.image} alt="" fill sizes="(max-width: 700px) 90vw, 25vw" />
      <span className="category-number">{category.number} / 04</span>
      <span className="category-card-content">
        <span className="category-title">{categoryLabel(category.name)}</span>
        <span className="category-description">{categoryDescription(category.slug)}</span>
      </span>
      <span className="category-arrow"><ArrowUpRight size={18} /></span>
    </Link>
  );
}
