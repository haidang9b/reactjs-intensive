import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/features/products/api/get-products";

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
}
