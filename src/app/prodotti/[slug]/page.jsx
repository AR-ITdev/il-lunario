import { notFound } from "next/navigation";
import { products } from "@/data/products";
import ProductDetailContent from "@/components/ProductDetailContent";

function findProductBySlug(slug) {
  // Next can pass percent-encoded slugs during prerendering.
  return products.find((item) => item.slug === slug || encodeURIComponent(item.slug) === slug);
}

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = findProductBySlug(slug);
  return product
    ? { title: product.name, description: product.shortDescription }
    : { title: "Prodotto non trovato" };
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const product = findProductBySlug(slug);
  if (!product) notFound();
  const related = products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 3);
  return <ProductDetailContent product={product} related={related} />;
}
