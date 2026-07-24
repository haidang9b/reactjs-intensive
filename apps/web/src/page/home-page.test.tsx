import { screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "@/test/render";
import { HomePage } from "./home-page";

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

describe("HomePage", () => {
  it("renders the hero, sections and fetched products", async () => {
    renderWithProviders(<HomePage />);
    expect(
      screen.getByRole("heading", { name: /discover our new collection/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("Browse The Range")).toBeInTheDocument();
    expect(
      await screen.findByRole("heading", { name: "Asgaard Sofa" }),
    ).toBeInTheDocument();
  });
});
