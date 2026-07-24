import { httpClient } from "@/services/http";
import { ENDPOINTS, type ItemsResponse } from "@/services/endpoints";
import type { Product } from "@/types/product";
import { asset } from "@/utils/asset";

export async function getProducts(): Promise<Product[]> {
  const response = await httpClient.get<ItemsResponse<Product>>(ENDPOINTS.products);
  return response.items.map((product) => ({
    ...product,
    thumbnail: asset(product.thumbnail),
  }));
}
