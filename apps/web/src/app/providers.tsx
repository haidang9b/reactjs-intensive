import { QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { CartProvider } from "@/features/cart/stores/cart-provider";
import { CompareProvider } from "@/features/compare/stores/compare-provider";
import { WishlistProvider } from "@/features/wishlist/stores/wishlist-provider";
import { queryClient } from "@/lib/query-client";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <CompareProvider>
          <WishlistProvider>{children}</WishlistProvider>
        </CompareProvider>
      </CartProvider>
    </QueryClientProvider>
  );
}
