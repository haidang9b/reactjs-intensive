import { screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "@/test/render";
import { ShopPage } from "./shop-page";

vi.mock("@/features/products/api/get-products", () => ({
  getProducts: vi.fn().mockResolvedValue([
    {
      id: 1,
      slug: "asgaard-sofa",
      name: "Asgaard Sofa",
      category: "sofa",
      price: 250000,
      originalPrice: 300000,
      thumbnail: "/images/product/product-01.png",
      badge: "Sale",
      rating: 4.8,
      shortDescription: "Comfy sofa",
      tags: ["sofa"],
    },
  ]),
}));
vi.mock("@/features/products/api/get-categories", () => ({
  getCategories: vi
    .fn()
    .mockResolvedValue([{ id: 1, slug: "sofa", name: "Sofa", productCount: 1 }]),
}));

describe("ShopPage", () => {
  it("renders the toolbar, results count and product grid", async () => {
    renderWithProviders(<ShopPage />);
    expect(screen.getByRole("heading", { name: "Shop" })).toBeInTheDocument();
    expect(
      await screen.findByRole("heading", { name: "Asgaard Sofa" }),
    ).toBeInTheDocument();
    expect(screen.getByText(/of 1 results/i)).toBeInTheDocument();
  });
});
