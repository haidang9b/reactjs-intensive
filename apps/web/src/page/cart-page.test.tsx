import { screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { renderWithProviders } from "@/test/render";
import { CartPage } from "./cart-page";

const seed = () =>
  window.localStorage.setItem(
    "furniro-cart",
    JSON.stringify([
      {
        productId: 1,
        slug: "asgaard-sofa",
        name: "Asgaard Sofa",
        image: "/images/product/product-01.png",
        price: 250000,
        quantity: 2,
      },
    ]),
  );

describe("CartPage", () => {
  beforeEach(() => window.localStorage.clear());

  it("shows the empty state when there are no items", () => {
    renderWithProviders(<CartPage />);
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });

  it("renders the cart table and totals when items exist", () => {
    seed();
    renderWithProviders(<CartPage />);
    expect(screen.getByText("Asgaard Sofa")).toBeInTheDocument();
    expect(screen.getByText("Cart Totals")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /check out/i })).toBeInTheDocument();
  });
});
