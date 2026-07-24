import { httpClient } from "@/services/http";
import { ENDPOINTS, type ItemsResponse } from "@/services/endpoints";
import type { BlogPost } from "@/types/post";
import { asset } from "@/utils/asset";

export async function getPosts(): Promise<BlogPost[]> {
  const response = await httpClient.get<ItemsResponse<BlogPost>>(ENDPOINTS.posts);
  return response.items.map((post) => ({
    ...post,
    coverImage: asset(post.coverImage),
  }));
}
