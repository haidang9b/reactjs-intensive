import type { Product } from "@/types/product";

export type SortKey = "default" | "price-asc" | "price-desc" | "name-asc";

export const sortOptions: { value: SortKey; label: string }[] = [
  { value: "default", label: "Default" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A to Z" },
];

export function filterProducts(
  products: Product[],
  { search, category }: { search: string; category: string },
): Product[] {
  const keyword = search.trim().toLowerCase();
  return products.filter((product) => {
    const matchesCategory = category === "all" || product.category === category;
    const matchesKeyword =
      keyword.length === 0 ||
      product.name.toLowerCase().includes(keyword) ||
      product.shortDescription.toLowerCase().includes(keyword) ||
      product.tags.some((tag) => tag.toLowerCase().includes(keyword));
    return matchesCategory && matchesKeyword;
  });
}

export function sortProducts(products: Product[], sort: SortKey): Product[] {
  const copy = [...products];
  switch (sort) {
    case "price-asc":
      return copy.sort((a, b) => a.price - b.price);
    case "price-desc":
      return copy.sort((a, b) => b.price - a.price);
    case "name-asc":
      return copy.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return copy;
  }
}
