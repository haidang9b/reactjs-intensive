import { screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "@/test/render";
import { ComparePage } from "./compare-page";

vi.mock("@/features/compare/api/get-comparison", () => ({
  getComparison: vi.fn().mockResolvedValue({
    productIds: [1],
    items: [
      {
        id: 1,
        slug: "asgaard-sofa",
        name: "Asgaard Sofa",
        image: "/images/product/product-01.png",
        price: 250000,
      },
    ],
    comparisonRows: [{ label: "Material", values: ["Wood"] }],
  }),
}));

describe("ComparePage", () => {
  it("renders the comparison table from the sample data", async () => {
    renderWithProviders(<ComparePage />);
    expect(screen.getByRole("heading", { name: "Comparison" })).toBeInTheDocument();
    expect(await screen.findByText("Material")).toBeInTheDocument();
    expect(screen.getAllByText("Asgaard Sofa").length).toBeGreaterThan(0);
  });
});
