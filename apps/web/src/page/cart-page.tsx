import { Link, useNavigate } from "react-router-dom";
import { Button } from "@react-workshop/ui/button";
import { Container } from "@/components/container";
import { TrashIcon } from "@/components/icons";
import { PageBanner } from "@/components/page-banner";
import { EmptyState } from "@/components/page-state";
import { QuantityStepper } from "@/components/quantity-stepper";
import { useCart } from "@/features/cart/hooks/use-cart";
import { formatCurrency } from "@/utils/format";

export function CartPage() {
  const navigate = useNavigate();
  const { items, totals, updateQuantity, removeItem } = useCart();

  return (
    <>
      <PageBanner title="Cart" />

      <Container className="py-16">
        {items.length === 0 ? (
          <EmptyState
            action={
              <Button onClick={() => navigate("/shop")}>Continue shopping</Button>
            }
            description="Looks like you have not added anything yet."
            title="Your cart is empty"
          />
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_390px]">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] border-collapse text-left">
                <thead>
                  <tr className="bg-[#f9f1e7] text-base text-[#333333]">
                    <th className="px-4 py-4 font-medium">Product</th>
                    <th className="px-4 py-4 font-medium">Price</th>
                    <th className="px-4 py-4 font-medium">Quantity</th>
                    <th className="px-4 py-4 font-medium">Subtotal</th>
                    <th className="px-4 py-4" />
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.productId}>
                      <td className="py-6 pr-4">
                        <div className="flex items-center gap-5">
                          <img
                            alt={item.name}
                            className="size-[105px] rounded-[10px] bg-[#f9f1e7] object-cover"
                            src={item.image}
                          />
                          <Link
                            className="text-sm text-[#9f9f9f] hover:text-[#b88e2f]"
                            to={`/products/${item.slug}`}
                          >
                            {item.name}
                          </Link>
                        </div>
                      </td>
                      <td className="px-4 py-6 text-sm text-[#9f9f9f]">
                        {formatCurrency(item.price)}
                      </td>
                      <td className="px-4 py-6">
                        <QuantityStepper
                          onChange={(next) => updateQuantity(item.productId, next)}
                          value={item.quantity}
                        />
                      </td>
                      <td className="px-4 py-6 text-sm text-[#333333]">
                        {formatCurrency(item.price * item.quantity)}
                      </td>
                      <td className="px-4 py-6">
                        <button
                          aria-label={`Remove ${item.name}`}
                          className="text-[#b88e2f] hover:text-[#a17920]"
                          onClick={() => removeItem(item.productId)}
                          type="button"
                        >
                          <TrashIcon />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <aside className="h-fit bg-[#f9f1e7] px-10 py-8">
              <h2 className="mb-8 text-center text-3xl font-semibold text-[#333333]">
                Cart Totals
              </h2>
              <div className="grid gap-6 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium text-[#333333]">Subtotal</span>
                  <span className="text-[#9f9f9f]">
                    {formatCurrency(totals.subtotal)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-[#333333]">Total</span>
                  <span className="text-xl font-medium text-[#b88e2f]">
                    {formatCurrency(totals.total)}
                  </span>
                </div>
              </div>
              <Button
                className="mt-8 w-full"
                onClick={() => navigate("/checkout")}
                size="lg"
                variant="outline"
              >
                Check Out
              </Button>
            </aside>
          </div>
        )}
      </Container>
    </>
  );
}
