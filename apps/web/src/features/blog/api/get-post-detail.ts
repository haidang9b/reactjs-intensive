import { httpClient } from "@/services/http";
import { ENDPOINTS, type ItemsResponse } from "@/services/endpoints";
import type { BlogPostDetail } from "@/types/post";

export async function getPostDetails(): Promise<BlogPostDetail[]> {
  const response = await httpClient.get<ItemsResponse<BlogPostDetail>>(
    ENDPOINTS.postDetails,
  );
  return response.items;
}

export async function getPostDetailBySlug(
  slug: string,
): Promise<BlogPostDetail | undefined> {
  const posts = await getPostDetails();
  return posts.find((post) => post.slug === slug);
}
