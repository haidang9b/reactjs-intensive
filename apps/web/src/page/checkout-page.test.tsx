import { screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { renderWithProviders } from "@/test/render";
import { CheckoutPage } from "./checkout-page";

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
        quantity: 1,
      },
    ]),
  );

describe("CheckoutPage", () => {
  beforeEach(() => window.localStorage.clear());

  it("shows the empty state with no items", () => {
    renderWithProviders(<CheckoutPage />);
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });

  it("renders the billing form and order summary with items", () => {
    seed();
    renderWithProviders(<CheckoutPage />);
    expect(screen.getByRole("heading", { name: /billing details/i })).toBeInTheDocument();
    expect(screen.getByLabelText("First Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Country / Region")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /place order/i })).toBeInTheDocument();
  });
});
