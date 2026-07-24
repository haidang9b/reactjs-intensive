import { screen } from "@testing-library/react";
import { Route, Routes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "@/test/render";
import { ProductDetailPage } from "./product-detail-page";

vi.mock("@/features/products/api/get-product-detail", () => ({
  getProductDetailBySlug: vi.fn().mockResolvedValue({
    id: 1,
    slug: "asgaard-sofa",
    name: "Asgaard Sofa",
    breadcrumb: [],
    category: "sofa",
    price: 250000,
    priceText: "Rp 250.000",
    originalPrice: 300000,
    rating: 4.8,
    ratingCount: 5,
    reviewLabel: "5 Customer Review",
    shortDescription: "Comfy sofa",
    gallery: {
      active: "/images/product/product-01.png",
      thumbnails: ["/images/product/product-02.png"],
    },
    sizes: [{ label: "L", value: "l", selected: true }],
    colors: [{ name: "Gold", value: "#b88e2f", selected: true }],
    quantity: { default: 1, min: 1, max: 9 },
    actions: {
      primary: { label: "Add To Cart" },
      secondary: [{ label: "Compare", icon: "" }],
    },
    meta: { sku: "SS001", category: "Sofas", tags: ["sofa"] },
    share: [{ platform: "facebook", label: "Facebook" }],
    tabs: [
      { key: "description", label: "Description", active: true, content: ["Nice."] },
    ],
    detailImages: ["/images/product/product-03.jpg"],
    relatedProducts: [],
  }),
}));

describe("ProductDetailPage", () => {
  it("renders the product detail for the routed slug", async () => {
    renderWithProviders(
      <Routes>
        <Route element={<ProductDetailPage />} path="/products/:slug" />
      </Routes>,
      { route: "/products/asgaard-sofa" },
    );
    expect(
      await screen.findByRole("heading", { name: "Asgaard Sofa" }),
    ).toBeInTheDocument();
    expect(screen.getByText(/SS001/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add to cart/i })).toBeInTheDocument();
  });
});
