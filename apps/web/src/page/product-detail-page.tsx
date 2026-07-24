import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@react-workshop/ui/button";
import { Container } from "@/components/container";
import { EmptyState, ErrorState, LoadingState } from "@/components/page-state";
import { QuantityStepper } from "@/components/quantity-stepper";
import { Rating } from "@/components/rating";
import { useCart } from "@/features/cart/hooks/use-cart";
import { useCompare } from "@/features/compare/hooks/use-compare";
import { useWishlist } from "@/features/wishlist/hooks/use-wishlist";
import { useProductDetail } from "@/features/products/hooks/use-product-detail";
import type { ProductDetail } from "@/types/product";
import { formatCurrency } from "@/utils/format";

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const detailQuery = useProductDetail(slug);

  if (detailQuery.isLoading) {
    return (
      <Container className="py-16">
        <LoadingState />
      </Container>
    );
  }

  if (detailQuery.isError) {
    return (
      <Container className="py-16">
        <ErrorState
          error={detailQuery.error}
          onRetry={() => detailQuery.refetch()}
        />
      </Container>
    );
  }

  if (!detailQuery.data) {
    return (
      <Container className="py-16">
        <EmptyState
          action={
            <Link className="text-[#b88e2f] underline" to="/shop">
              Back to shop
            </Link>
          }
          title="Product not found"
        />
      </Container>
    );
  }

  return <ProductDetailView product={detailQuery.data} />;
}

function ProductDetailView({ product }: { product: ProductDetail }) {
  const { addItem } = useCart();
  const compare = useCompare();
  const wishlist = useWishlist();
  const navigate = useNavigate();
  const wished = wishlist.has(product.id);

  function toggleWishlist() {
    wishlist.toggle({
      id: product.id,
      slug: product.slug,
      name: product.name,
      image: product.gallery.active,
      price: product.price,
    });
  }

  function addToCompare() {
    compare.add({
      id: product.id,
      slug: product.slug,
      name: product.name,
      image: product.gallery.active,
      price: product.price,
      rating: product.rating,
    });
    navigate("/compare");
  }
  const [quantity, setQuantity] = useState(product.quantity.default || 1);
  const [activeImage, setActiveImage] = useState(product.gallery.active);
  const [size, setSize] = useState(
    product.sizes.find((option) => option.selected)?.value ??
      product.sizes[0]?.value ??
      null,
  );
  const [color, setColor] = useState(
    product.colors.find((option) => option.selected)?.value ??
      product.colors[0]?.value ??
      null,
  );
  const [activeTab, setActiveTab] = useState(
    product.tabs.find((tab) => tab.active)?.key ?? product.tabs[0]?.key ?? null,
  );

  const currentTab =
    product.tabs.find((tab) => tab.key === activeTab) ?? product.tabs[0];

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-[#f9f1e7]">
        <Container className="flex items-center gap-3 py-6 text-sm">
          <Link className="text-[#9f9f9f]" to="/">
            Home
          </Link>
          <Chevron />
          <Link className="text-[#9f9f9f]" to="/shop">
            Shop
          </Link>
          <Chevron />
          <span className="h-6 w-px bg-[#9f9f9f]" />
          <span className="text-[#333333]">{product.name}</span>
        </Container>
      </div>

      <Container className="grid gap-12 py-12 lg:grid-cols-2">
        {/* Gallery */}
        <div className="flex flex-col-reverse gap-6 sm:flex-row">
          <div className="flex gap-6 sm:flex-col">
            {product.gallery.thumbnails.map((thumb) => (
              <button
                className={`size-20 overflow-hidden rounded-[10px] bg-[#f9f1e7] ${
                  activeImage === thumb ? "ring-2 ring-[#b88e2f]" : ""
                }`}
                key={thumb}
                onClick={() => setActiveImage(thumb)}
                type="button"
              >
                <img alt={product.name} className="size-full object-cover" src={thumb} />
              </button>
            ))}
          </div>
          <div className="flex-1 overflow-hidden rounded-[10px] bg-[#f9f1e7]">
            <img
              alt={product.name}
              className="h-full w-full object-cover"
              src={activeImage}
            />
          </div>
        </div>

        {/* Info */}
        <div className="grid content-start gap-4">
          <h1 className="text-4xl font-normal text-[#333333]">{product.name}</h1>
          <p className="text-2xl text-[#9f9f9f]">
            {product.priceText || formatCurrency(product.price)}
          </p>
          <div className="flex items-center gap-4">
            <Rating value={product.rating} />
            <span className="h-6 w-px bg-[#9f9f9f]" />
            <span className="text-sm text-[#9f9f9f]">
              {product.reviewLabel || `${product.ratingCount} Customer Review`}
            </span>
          </div>
          <p className="max-w-lg text-sm leading-6 text-[#333333]">
            {product.shortDescription}
          </p>

          {product.sizes.length > 0 ? (
            <div className="mt-2 grid gap-3">
              <span className="text-sm text-[#9f9f9f]">Size</span>
              <div className="flex gap-4">
                {product.sizes.map((option) => (
                  <button
                    className={`size-9 rounded-md text-sm font-medium transition-colors ${
                      size === option.value
                        ? "bg-[#b88e2f] text-white"
                        : "bg-[#f9f1e7] text-[#333333] hover:bg-[#efe7d5]"
                    }`}
                    key={option.value}
                    onClick={() => setSize(option.value)}
                    type="button"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {product.colors.length > 0 ? (
            <div className="grid gap-3">
              <span className="text-sm text-[#9f9f9f]">Color</span>
              <div className="flex gap-4">
                {product.colors.map((option) => (
                  <button
                    aria-label={option.name ?? option.value}
                    className={`size-8 rounded-full transition-transform ${
                      color === option.value
                        ? "ring-2 ring-[#333333] ring-offset-2"
                        : ""
                    }`}
                    key={option.value}
                    onClick={() => setColor(option.value)}
                    style={{ backgroundColor: option.value }}
                    type="button"
                  />
                ))}
              </div>
            </div>
          ) : null}

          <div className="mt-4 flex flex-wrap items-center gap-4">
            <QuantityStepper
              max={product.quantity.max}
              min={product.quantity.min}
              onChange={setQuantity}
              size="lg"
              value={quantity}
            />
            <Button
              onClick={() =>
                addItem(
                  {
                    productId: product.id,
                    slug: product.slug,
                    name: product.name,
                    image: product.gallery.active,
                    price: product.price,
                  },
                  quantity,
                )
              }
              size="lg"
              variant="outline"
            >
              {product.actions.primary.label || "Add To Cart"}
            </Button>
            <Button onClick={addToCompare} size="lg" variant="outline">
              + {product.actions.secondary[0]?.label ?? "Compare"}
            </Button>
          </div>

          <dl className="mt-8 grid gap-2 border-t border-[#d9d9d9] pt-8 text-sm text-[#9f9f9f]">
            <MetaRow label="SKU" value={product.meta.sku} />
            <MetaRow label="Category" value={product.meta.category} />
            <MetaRow label="Tags" value={product.meta.tags.join(", ")} />
            {product.share.length > 0 ? (
              <div className="mt-2 flex items-center gap-4">
                <dt className="w-24">Share</dt>
                <dd className="flex items-center gap-4 text-[#333333]">
                  {product.share.map((item) => (
                    <ShareIcon key={item.platform} platform={item.platform} />
                  ))}
                </dd>
                <button
                  aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
                  aria-pressed={wished}
                  className={`ml-auto text-2xl leading-none transition-colors ${
                    wished ? "text-[#e97171]" : "text-[#d9d9d9] hover:text-[#e97171]"
                  }`}
                  onClick={toggleWishlist}
                  type="button"
                >
                  ♥
                </button>
              </div>
            ) : null}
          </dl>
        </div>
      </Container>

      {/* Tabs */}
      {product.tabs.length > 0 ? (
        <div className="border-t border-[#d9d9d9]">
          <Container className="py-12">
            <div className="mb-8 flex flex-wrap justify-center gap-8 md:gap-14">
              {product.tabs.map((tab) => {
                const label =
                  tab.key === "reviews"
                    ? `${tab.label} [${product.ratingCount}]`
                    : tab.label;
                const isActive = tab.key === currentTab?.key;
                return (
                  <button
                    className={`text-xl transition-colors ${
                      isActive
                        ? "font-medium text-[#333333]"
                        : "text-[#9f9f9f] hover:text-[#333333]"
                    }`}
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    type="button"
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            <div className="mx-auto grid max-w-5xl gap-6 text-sm leading-7 text-[#9f9f9f]">
              {(currentTab?.content ?? []).map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {product.detailImages.length > 0 ? (
              <div className="mt-10 grid gap-8 md:grid-cols-2">
                {product.detailImages.slice(0, 2).map((image) => (
                  <div
                    className="overflow-hidden rounded-[10px] bg-[#f9f1e7]"
                    key={image}
                  >
                    <img
                      alt={product.name}
                      className="h-full w-full object-cover"
                      src={image}
                    />
                  </div>
                ))}
              </div>
            ) : null}
          </Container>
        </div>
      ) : null}

      {/* Related products */}
      {product.relatedProducts.length > 0 ? (
        <div className="border-t border-[#d9d9d9]">
          <Container className="py-14">
            <h2 className="mb-10 text-center text-4xl font-medium text-[#333333]">
              Related Products
            </h2>
            <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
              {product.relatedProducts.map((related) => (
                <Link
                  className="group flex flex-col bg-[#f4f5f7]"
                  key={related.id}
                  to={`/products/${related.slug}`}
                >
                  <div className="relative overflow-hidden">
                    {related.badge ? (
                      <span
                        className={`absolute right-4 top-4 z-10 flex size-11 items-center justify-center rounded-full text-xs font-medium text-white ${
                          related.badge === "New" ? "bg-[#2ec1ac]" : "bg-[#e97171]"
                        }`}
                      >
                        {related.badge}
                      </span>
                    ) : null}
                    <img
                      alt={related.name}
                      className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      src={related.thumbnail}
                    />
                  </div>
                  <div className="grid gap-1 p-4">
                    <h3 className="text-lg font-semibold text-[#3a3a3a]">
                      {related.name}
                    </h3>
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-[#333333]">
                        {related.priceText}
                      </span>
                      {related.originalPriceText ? (
                        <span className="text-sm text-[#b0b0b0] line-through">
                          {related.originalPriceText}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Button onClick={() => navigate("/shop")} size="lg" variant="secondary">
                Show More
              </Button>
            </div>
          </Container>
        </div>
      ) : null}
    </>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-4">
      <dt className="w-24">{label}</dt>
      <dd>: {value}</dd>
    </div>
  );
}

function Chevron() {
  return (
    <svg className="size-4 text-[#9f9f9f]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ShareIcon({ platform }: { platform: string }) {
  const normalized = platform.toLowerCase();
  const paths: Record<string, string> = {
    facebook:
      "M13 22v-8h3l.5-3H13V9.2c0-.9.3-1.5 1.6-1.5H17V5.1C16.4 5 15.4 5 14.3 5 12 5 10.4 6.4 10.4 9v2H8v3h2.4v8H13Z",
    twitter:
      "M22 5.9c-.7.3-1.5.6-2.3.7.8-.5 1.5-1.3 1.8-2.3-.8.5-1.7.8-2.6 1a4 4 0 0 0-6.9 3.7A11.3 11.3 0 0 1 3.8 4.7a4 4 0 0 0 1.2 5.4c-.6 0-1.2-.2-1.8-.5a4 4 0 0 0 3.2 4c-.5.1-1.1.2-1.7 0a4 4 0 0 0 3.7 2.8A8 8 0 0 1 2 18.1a11.3 11.3 0 0 0 17.4-9.5v-.5c.8-.6 1.5-1.3 2-2.2Z",
    linkedin:
      "M6.9 8H4v12h2.9V8ZM5.4 3.7A1.7 1.7 0 1 0 5.4 7a1.7 1.7 0 0 0 0-3.4ZM20 20h-2.9v-5.9c0-1.4 0-3.2-2-3.2s-2.3 1.5-2.3 3.1V20H9.9V8h2.8v1.6h.1c.4-.7 1.4-1.6 2.9-1.6 3.1 0 3.7 2 3.7 4.7V20Z",
  };
  const path = paths[normalized];
  if (!path) {
    return null;
  }
  return (
    <span aria-label={platform} className="text-[#333333]">
      <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
        <path d={path} />
      </svg>
    </span>
  );
}
