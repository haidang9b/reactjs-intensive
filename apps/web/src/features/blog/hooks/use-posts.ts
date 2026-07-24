import { useQuery } from "@tanstack/react-query";
import { getPosts } from "@/features/blog/api/get-posts";

export function usePosts() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });
}
