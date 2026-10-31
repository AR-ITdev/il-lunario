"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { useLanguage } from "@/components/LanguageProvider";

export default function ProductExplorer({ initialCategory = "" }) {
  const [category, setCategory] = useState(initialCategory);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("featured");
  const { t, categoryLabel, productText } = useLanguage();

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("it");
    return products
      .filter((product) => !category || product.category === category)
      .filter(
        (product) =>
          !normalizedQuery ||
          `${product.name} ${categoryLabel(product.category)} ${productText(product.slug, product.shortDescription, product.description).shortDescription}`
            .toLocaleLowerCase("it")
            .includes(normalizedQuery),
      )
      .sort((a, b) =>
        sort === "name"
          ? a.name.localeCompare(b.name, "it")
          : Number(b.featured) - Number(a.featured) || a.id - b.id,
      );
  }, [category, query, sort, categoryLabel, productText]);

  return (
    <>
      <div className="catalog-tools">
        <label className="search-field">
          <Search size={18} aria-hidden="true" />
          <span className="sr-only">{t("catalog.search")}</span>
          <input
            type="search"
            placeholder={t("catalog.search")}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <label className="sort-field">
          <SlidersHorizontal size={16} aria-hidden="true" />
          <span className="sr-only">{t("catalog.sort")}</span>
          <select value={sort} onChange={(event) => setSort(event.target.value)}>
            <option value="featured">{t("catalog.featured")}</option>
            <option value="name">{t("catalog.alphabetical")}</option>
          </select>
        </label>
      </div>
      <div className="filter-list" role="group" aria-label={t("catalog.filter")}>
        <button className={!category ? "filter-chip selected" : "filter-chip"} onClick={() => setCategory("")}>
          {t("catalog.all")} <span>{products.length}</span>
        </button>
        {categories.map((item) => {
          const count = products.filter((product) => product.category === item.name).length;
          return (
            <button
              key={item.slug}
              className={category === item.name ? "filter-chip selected" : "filter-chip"}
              onClick={() => setCategory(category === item.name ? "" : item.name)}
            >
              {categoryLabel(item.name)} <span>{count}</span>
            </button>
          );
        })}
      </div>
      <div className="catalog-result" aria-live="polite">
        {visibleProducts.length} {t(visibleProducts.length === 1 ? "catalog.oneResult" : "catalog.manyResults")}
      </div>
      {visibleProducts.length ? (
        <div className="product-grid">
          {visibleProducts.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      ) : (
        <div className="empty-state">
          <span className="empty-icon">✳</span>
          <h2>{t("catalog.emptyTitle")}</h2>
          <p>{t("catalog.emptyText")}</p>
          <button className="text-button" onClick={() => { setQuery(""); setCategory(""); }}>{t("catalog.reset")}</button>
        </div>
      )}
    </>
  );
}
