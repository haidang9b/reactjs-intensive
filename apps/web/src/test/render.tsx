import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, type RenderResult } from "@testing-library/react";
import type { ReactElement, ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";
import { CartProvider } from "@/features/cart/stores/cart-provider";
import { CompareProvider } from "@/features/compare/stores/compare-provider";
import { WishlistProvider } from "@/features/wishlist/stores/wishlist-provider";

/** Render a component wrapped in the router + query client + all app stores. */
export function renderWithProviders(
  ui: ReactElement,
  { route = "/" }: { route?: string } = {},
): RenderResult {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <MemoryRouter initialEntries={[route]}>
        <QueryClientProvider client={client}>
          <CartProvider>
            <CompareProvider>
              <WishlistProvider>{children}</WishlistProvider>
            </CompareProvider>
          </CartProvider>
        </QueryClientProvider>
      </MemoryRouter>
    );
  }

  return render(ui, { wrapper: Wrapper });
}
