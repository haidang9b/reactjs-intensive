import { httpClient } from "@/services/http";
import { ENDPOINTS, type ItemsResponse } from "@/services/endpoints";
import type { Category } from "@/types/product";

export async function getCategories(): Promise<Category[]> {
  const response = await httpClient.get<ItemsResponse<Category>>(ENDPOINTS.categories);
  return response.items;
}
