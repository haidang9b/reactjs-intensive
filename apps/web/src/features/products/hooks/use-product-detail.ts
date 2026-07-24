import { useQuery } from "@tanstack/react-query";
import { getProductDetailBySlug } from "@/features/products/api/get-product-detail";

export function useProductDetail(slug: string | undefined) {
  return useQuery({
    queryKey: ["product-detail", slug],
    queryFn: () => getProductDetailBySlug(slug as string),
    enabled: Boolean(slug),
  });
}
