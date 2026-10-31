import { notFound } from "next/navigation";
import { products } from "@/data/products";
import ProductDetailContent from "@/components/ProductDetailContent";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  return product
    ? { title: product.name, description: product.shortDescription }
    : { title: "Prodotto non trovato" };
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!product) notFound();
  const related = products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 3);
  return <ProductDetailContent product={product} related={related} />;
}
