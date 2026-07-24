import { httpClient } from "@/services/http";
import { ENDPOINTS } from "@/services/endpoints";
import type { Comparison } from "@/types/comparison";

export async function getComparison(): Promise<Comparison> {
  return httpClient.get<Comparison>(ENDPOINTS.compare);
}
