import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

export default function ProductCard({ product }) {
  const { categoryLabel, productText, t } = useLanguage();
  const copy = productText(product.slug, product.shortDescription, product.description);
  return (
    <article className="product-card">
      <Link href={`/prodotti/${product.slug}`} className="product-image" aria-label={`${t("product.open")} ${product.name}`}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 1000px) 45vw, 25vw"
        />
        <span className="image-open"><ArrowUpRight size={17} /></span>
      </Link>
      <div className="product-info">
        <span className="product-category">{categoryLabel(product.category)}</span>
        <h3><Link href={`/prodotti/${product.slug}`}>{product.name}</Link></h3>
        <p>{copy.shortDescription}</p>
      </div>
    </article>
  );
}
