import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";
import type { Product } from "@/types/product";
import { CartProvider } from "@/features/cart/stores/cart-provider";
import { CompareProvider } from "@/features/compare/stores/compare-provider";
import { WishlistProvider } from "@/features/wishlist/stores/wishlist-provider";
import { ProductCard } from "./product-card";

const product: Product = {
  id: 1,
  slug: "asgaard-sofa",
  name: "Asgaard Sofa",
  category: "sofa",
  price: 25000000,
  originalPrice: 30000000,
  thumbnail: "/images/product/product-01.png",
  badge: "Sale",
  rating: 4.8,
  shortDescription: "Modern upholstered sofa.",
  tags: ["sofa"],
};

function renderCard(node: ReactNode) {
  return render(
    <MemoryRouter>
      <CartProvider>
        <CompareProvider>
          <WishlistProvider>{node}</WishlistProvider>
        </CompareProvider>
      </CartProvider>
    </MemoryRouter>,
  );
}

describe("ProductCard", () => {
  beforeEach(() => window.localStorage.clear());

  it("shows the product name and discounted price badge", () => {
    renderCard(<ProductCard product={product} />);

    expect(
      screen.getByRole("heading", { name: "Asgaard Sofa" }),
    ).toBeInTheDocument();
    // 30,000,000 -> 25,000,000 is a 17% discount
    expect(screen.getByText("-17%")).toBeInTheDocument();
  });

  it("links to the product detail page", () => {
    renderCard(<ProductCard product={product} />);
    const links = screen.getAllByRole("link");
    expect(links.some((link) => link.getAttribute("href") === "/products/asgaard-sofa")).toBe(
      true,
    );
  });

  it("adds the product to the cart and persists it", async () => {
    const user = userEvent.setup();
    renderCard(<ProductCard product={product} />);

    await user.click(screen.getByRole("button", { name: /add to cart/i }));

    const stored = JSON.parse(window.localStorage.getItem("furniro-cart") ?? "[]");
    expect(stored).toHaveLength(1);
    expect(stored[0].productId).toBe(1);
  });
});
