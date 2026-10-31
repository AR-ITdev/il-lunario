import { products } from "@/data/products";
import ProductsPageContent from "@/components/ProductsPageContent";

export const metadata = {
  title: "Prodotti",
  description: "Esplora libri, fumetti, giochi da tavolo e carte collezionabili selezionati da Il Lunario.",
};

export default async function ProductsPage({ searchParams }) {
  const params = await searchParams;
  const initialCategory = products.some((product) => product.category === params?.categoria)
    ? params.categoria
    : "";
  return <ProductsPageContent initialCategory={initialCategory} />;
}
