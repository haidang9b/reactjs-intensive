import { httpClient } from "@/services/http";
import { ENDPOINTS, type ItemsResponse } from "@/services/endpoints";
import type { Product } from "@/types/product";

export async function getProducts(): Promise<Product[]> {
  const response = await httpClient.get<ItemsResponse<Product>>(ENDPOINTS.products);
  return response.items;
}
