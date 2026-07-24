import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { Product } from "@/types/product";
import { renderWithProviders } from "@/test/render";
import { ProductGrid } from "./product-grid";

const make = (id: number): Product => ({
  id,
  slug: `item-${id}`,
  name: `Item ${id}`,
  category: "sofa",
  price: 100,
  originalPrice: 100,
  thumbnail: "/images/product/product-01.png",
  badge: "",
  rating: 4,
  shortDescription: "desc",
  tags: [],
});

describe("ProductGrid", () => {
  it("renders a card per product", () => {
    renderWithProviders(<ProductGrid products={[make(1), make(2)]} />);
    expect(screen.getByRole("heading", { name: "Item 1" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Item 2" })).toBeInTheDocument();
  });

  it("supports single-column (list) layout", () => {
    renderWithProviders(<ProductGrid columns={1} products={[make(3)]} />);
    expect(screen.getByRole("heading", { name: "Item 3" })).toBeInTheDocument();
  });
});
