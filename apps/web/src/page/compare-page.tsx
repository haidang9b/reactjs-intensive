import { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@react-workshop/ui/button";
import { Container } from "@/components/container";
import { PageBanner } from "@/components/page-banner";
import { ErrorState, LoadingState } from "@/components/page-state";
import { Rating } from "@/components/rating";
import { useCart } from "@/features/cart/hooks/use-cart";
import { useCompare } from "@/features/compare/hooks/use-compare";
import { useComparison } from "@/features/compare/hooks/use-comparison";
import type { CompareItem } from "@/features/compare/stores/compare-context";
import { formatCurrency } from "@/utils/format";

export function ComparePage() {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const compare = useCompare();
  const comparisonQuery = useComparison();

  // Map slug -> index so we can look up a product's value in each row.
  const valueIndexBySlug = useMemo(() => {
    const map = new Map<string, number>();
    (comparisonQuery.data?.items ?? []).forEach((item, index) =>
      map.set(item.slug, index),
    );
    return map;
  }, [comparisonQuery.data]);

  // Columns come from the user's comparison; fall back to the sample set.
  const columns: CompareItem[] =
    compare.items.length > 0
      ? compare.items
      : (comparisonQuery.data?.items ?? []).map((item) => ({
          ...item,
          rating: 0,
        }));

  const rows = comparisonQuery.data?.comparisonRows ?? [];
  const usingStore = compare.items.length > 0;

  function valueFor(item: CompareItem, values: string[]): string {
    const index = valueIndexBySlug.get(item.slug);
    return index === undefined ? "—" : (values[index] ?? "—");
  }

  return (
    <>
      <PageBanner title="Comparison" />

      <Container className="py-14">
        {comparisonQuery.isLoading ? <LoadingState /> : null}
        {comparisonQuery.isError ? (
          <ErrorState
            error={comparisonQuery.error}
            onRetry={() => comparisonQuery.refetch()}
          />
        ) : null}

        {comparisonQuery.isSuccess ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <thead>
                <tr>
                  <th className="w-56 py-6 align-top">
                    <p className="text-2xl font-semibold text-[#333333]">
                      Go to Product page for more Products
                    </p>
                    <Link
                      className="mt-2 inline-block font-semibold text-[#9f9f9f] underline-offset-4 hover:underline"
                      to="/shop"
                    >
                      View More
                    </Link>
                  </th>
                  {columns.map((item) => (
                    <th className="px-6 py-6 align-top" key={item.id}>
                      <div className="grid gap-2">
                        <div className="overflow-hidden rounded-[10px] bg-[#f9f1e7]">
                          <img
                            alt={item.name}
                            className="h-40 w-full object-cover"
                            src={item.image}
                          />
                        </div>
                        <p className="text-lg font-semibold text-[#333333]">
                          {item.name}
                        </p>
                        <p className="text-sm text-[#333333]">
                          {formatCurrency(item.price)}
                        </p>
                        {item.rating > 0 ? <Rating value={item.rating} /> : null}
                        {usingStore ? (
                          <button
                            className="justify-self-start text-xs text-[#9f9f9f] hover:text-[#333333]"
                            onClick={() => compare.remove(item.id)}
                            type="button"
                          >
                            Remove
                          </button>
                        ) : null}
                      </div>
                    </th>
                  ))}
                  <th className="px-6 py-6 align-top">
                    <p className="mb-3 text-lg font-medium text-[#333333]">
                      Add A Product
                    </p>
                    <Button onClick={() => navigate("/shop")}>Choose a Product</Button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr className="border-t border-[#e8e8e8]" key={row.label}>
                    <td className="py-4 pr-6 text-base font-medium text-[#333333]">
                      {row.label}
                    </td>
                    {columns.map((item) => (
                      <td
                        className="px-6 py-4 text-sm text-[#333333]"
                        key={item.id}
                      >
                        {valueFor(item, row.values)}
                      </td>
                    ))}
                    <td />
                  </tr>
                ))}
                <tr className="border-t border-[#e8e8e8]">
                  <td className="py-6" />
                  {columns.map((item) => (
                    <td className="px-6 py-6" key={item.id}>
                      <Button
                        onClick={() =>
                          addItem({
                            productId: item.id,
                            slug: item.slug,
                            name: item.name,
                            image: item.image,
                            price: item.price,
                          })
                        }
                      >
                        Add To Cart
                      </Button>
                    </td>
                  ))}
                  <td />
                </tr>
              </tbody>
            </table>
          </div>
        ) : null}
      </Container>
    </>
  );
}
