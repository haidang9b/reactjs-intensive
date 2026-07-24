import { useQuery } from "@tanstack/react-query";
import { getComparison } from "@/features/compare/api/get-comparison";

export function useComparison() {
  return useQuery({
    queryKey: ["comparison"],
    queryFn: getComparison,
  });
}
