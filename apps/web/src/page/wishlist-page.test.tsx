import { screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { renderWithProviders } from "@/test/render";
import { WishlistPage } from "./wishlist-page";

const seed = () =>
  window.localStorage.setItem(
    "furniro-wishlist",
    JSON.stringify([
      {
        id: 1,
        slug: "asgaard-sofa",
        name: "Asgaard Sofa",
        image: "/images/product/product-01.png",
        price: 250000,
      },
    ]),
  );

describe("WishlistPage", () => {
  beforeEach(() => window.localStorage.clear());

  it("shows the empty state when there are no items", () => {
    renderWithProviders(<WishlistPage />);
    expect(screen.getByText(/your wishlist is empty/i)).toBeInTheDocument();
  });

  it("renders saved items with an add-to-cart action", () => {
    seed();
    renderWithProviders(<WishlistPage />);
    expect(screen.getByRole("heading", { name: "Asgaard Sofa" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add to cart/i })).toBeInTheDocument();
  });
});
