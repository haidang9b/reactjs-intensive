import type { Product } from "@/types/product";
import { ProductCard } from "./product-card";

export function ProductGrid({
  products,
  columns = 4,
}: {
  products: Product[];
  columns?: 1 | 4;
}) {
  const gridClass =
    columns === 1
      ? "grid grid-cols-1 gap-8"
      : "grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4";

  return (
    <div className={gridClass}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
