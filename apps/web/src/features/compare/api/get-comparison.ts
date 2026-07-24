import { httpClient } from "@/services/http";
import { ENDPOINTS } from "@/services/endpoints";
import type { Comparison } from "@/types/comparison";
import { asset } from "@/utils/asset";

export async function getComparison(): Promise<Comparison> {
  const response = await httpClient.get<Comparison>(ENDPOINTS.compare);
  return {
    ...response,
    items: response.items.map((item) => ({ ...item, image: asset(item.image) })),
  };
}
