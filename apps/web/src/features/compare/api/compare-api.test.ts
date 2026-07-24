import { beforeEach, describe, expect, it, vi, type Mock } from "vitest";
import { httpClient } from "@/services/http";
import { getComparison } from "./get-comparison";

vi.mock("@/services/http", () => ({ httpClient: { get: vi.fn() } }));

const get = httpClient.get as unknown as Mock;

beforeEach(() => get.mockReset());

describe("getComparison", () => {
  it("maps item images and returns comparison rows", async () => {
    get.mockResolvedValue({
      productIds: [1, 2],
      items: [{ id: 1, slug: "a", name: "A", image: "/images/product/product-01.png", price: 100 }],
      comparisonRows: [{ label: "Material", values: ["Wood", "Metal"] }],
    });
    const result = await getComparison();
    expect(result.items[0]?.image).toBe("/images/product/product-01.png");
    expect(result.comparisonRows[0]?.label).toBe("Material");
  });
});
