import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/features/cart/hooks/use-cart";
import { useCompare } from "@/features/compare/hooks/use-compare";
import { useWishlist } from "@/features/wishlist/hooks/use-wishlist";
import type { Product } from "@/types/product";
import { formatCurrency } from "@/utils/format";
import { ProductBadge } from "./product-badge";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const compare = useCompare();
  const wishlist = useWishlist();
  const navigate = useNavigate();
  const wished = wishlist.has(product.id);

  const discount =
    product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) * 100,
        )
      : 0;

  return (
    <article className="group relative flex flex-col overflow-hidden bg-[#f4f5f7]">
      <ProductBadge
        className="absolute right-6 top-6 z-10 size-12 text-sm"
        discount={discount}
        label={product.badge}
      />

      <Link className="block overflow-hidden" to={`/products/${product.slug}`}>
        <img
          alt={product.name}
          className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          src={product.thumbnail}
        />
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="text-lg font-semibold text-[#3a3a3a]">
          <Link to={`/products/${product.slug}`}>{product.name}</Link>
        </h3>
        <p className="line-clamp-1 text-sm text-[#898989]">
          {product.shortDescription}
        </p>
        <div className="mt-1 flex items-center gap-3">
          <span className="text-lg font-semibold text-[#3a3a3a]">
            {formatCurrency(product.price)}
          </span>
          {discount ? (
            <span className="text-sm text-[#b0b0b0] line-through">
              {formatCurrency(product.originalPrice)}
            </span>
          ) : null}
        </div>
      </div>

      {/* Hover overlay with quick add-to-cart */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <button
          className="bg-white px-9 py-3 text-base font-semibold text-[#b88e2f] transition-colors hover:bg-[#b88e2f] hover:text-white"
          onClick={() =>
            addItem({
              productId: product.id,
              slug: product.slug,
              name: product.name,
              image: product.thumbnail,
              price: product.price,
            })
          }
          type="button"
        >
          Add to cart
        </button>
        <div className="flex items-center gap-4 text-sm font-semibold text-white">
          <Link className="hover:text-[#b88e2f]" to={`/products/${product.slug}`}>
            View
          </Link>
          <button
            className="hover:text-[#b88e2f]"
            onClick={() => {
              compare.add({
                id: product.id,
                slug: product.slug,
                name: product.name,
                image: product.thumbnail,
                price: product.price,
                rating: product.rating,
              });
              navigate("/compare");
            }}
            type="button"
          >
            Compare
          </button>
          <button
            aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
            aria-pressed={wished}
            className={wished ? "text-[#e97171]" : "hover:text-[#b88e2f]"}
            onClick={() =>
              wishlist.toggle({
                id: product.id,
                slug: product.slug,
                name: product.name,
                image: product.thumbnail,
                price: product.price,
              })
            }
            type="button"
          >
            {wished ? "♥ Liked" : "♡ Like"}
          </button>
        </div>
      </div>
    </article>
  );
}
