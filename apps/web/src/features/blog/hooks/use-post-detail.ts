import { useQuery } from "@tanstack/react-query";
import { getPostDetailBySlug } from "@/features/blog/api/get-post-detail";

export function usePostDetail(slug: string | undefined) {
  return useQuery({
    queryKey: ["post-detail", slug],
    queryFn: () => getPostDetailBySlug(slug as string),
    enabled: Boolean(slug),
  });
}
