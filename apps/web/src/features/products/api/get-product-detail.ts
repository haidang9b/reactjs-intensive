import { httpClient } from "@/services/http";
import { ENDPOINTS, type ItemsResponse } from "@/services/endpoints";
import type { ProductDetail } from "@/types/product";
import { asset } from "@/utils/asset";

export async function getProductDetails(): Promise<ProductDetail[]> {
  const response = await httpClient.get<ItemsResponse<ProductDetail>>(
    ENDPOINTS.productDetails,
  );
  return response.items.map((detail) => ({
    ...detail,
    gallery: {
      active: asset(detail.gallery.active),
      thumbnails: detail.gallery.thumbnails.map(asset),
    },
    detailImages: detail.detailImages.map(asset),
    relatedProducts: detail.relatedProducts.map((related) => ({
      ...related,
      thumbnail: asset(related.thumbnail),
    })),
  }));
}

/** The mock endpoint returns every product detail; find the one by slug. */
export async function getProductDetailBySlug(
  slug: string,
): Promise<ProductDetail | undefined> {
  const details = await getProductDetails();
  return details.find((detail) => detail.slug === slug);
}
