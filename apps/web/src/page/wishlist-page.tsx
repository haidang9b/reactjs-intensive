import { useNavigate } from "react-router-dom";
import { Button } from "@react-workshop/ui/button";
import { Container } from "@/components/container";
import { PageBanner } from "@/components/page-banner";
import { EmptyState } from "@/components/page-state";
import { ProductSummaryCard } from "@/features/products/components/product-summary-card";
import { useCart } from "@/features/cart/hooks/use-cart";
import { useWishlist } from "@/features/wishlist/hooks/use-wishlist";
import { formatCurrency } from "@/utils/format";

export function WishlistPage() {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { items, remove } = useWishlist();

  return (
    <>
      <PageBanner title="Wishlist" />

      <Container className="py-16">
        {items.length === 0 ? (
          <EmptyState
            action={<Button onClick={() => navigate("/shop")}>Go to shop</Button>}
            description="Save your favourite pieces to find them here later."
            title="Your wishlist is empty"
          />
        ) : (
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {items.map((item) => (
              <ProductSummaryCard
                footer={
                  <Button
                    className="mt-2"
                    onClick={() =>
                      addItem({
                        productId: item.id,
                        slug: item.slug,
                        name: item.name,
                        image: item.image,
                        price: item.price,
                      })
                    }
                    variant="secondary"
                  >
                    Add To Cart
                  </Button>
                }
                image={item.image}
                key={item.id}
                name={item.name}
                price={
                  <span className="font-medium text-[#333333]">
                    {formatCurrency(item.price)}
                  </span>
                }
                to={`/products/${item.slug}`}
                topRight={
                  <button
                    aria-label={`Remove ${item.name} from wishlist`}
                    className="absolute right-3 top-3 z-10 flex size-9 items-center justify-center rounded-full bg-white text-[#e97171] shadow-sm"
                    onClick={() => remove(item.id)}
                    type="button"
                  >
                    ♥
                  </button>
                }
              />
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
