import { describe, expect, it } from "vitest";
import type { Product } from "@/types/product";
import { filterProducts, sortProducts } from "./filter-sort";

const make = (over: Partial<Product>): Product => ({
  id: 1,
  slug: "item",
  name: "Item",
  category: "sofa",
  price: 100,
  originalPrice: 100,
  thumbnail: "",
  badge: "",
  rating: 4,
  shortDescription: "",
  tags: [],
  ...over,
});

const products: Product[] = [
  make({ id: 1, name: "Asgaard Sofa", category: "sofa", price: 300, tags: ["cozy"] }),
  make({ id: 2, name: "Grifo Lamp", category: "lamp", price: 100 }),
  make({ id: 3, name: "Muggo Mug", category: "mug", price: 200 }),
];

describe("filterProducts", () => {
  it("filters by category", () => {
    const result = filterProducts(products, { search: "", category: "lamp" });
    expect(result).toHaveLength(1);
    expect(result[0]?.name).toBe("Grifo Lamp");
  });

  it("filters by keyword across name and tags", () => {
    expect(filterProducts(products, { search: "sofa", category: "all" })).toHaveLength(1);
    expect(filterProducts(products, { search: "cozy", category: "all" })).toHaveLength(1);
    expect(filterProducts(products, { search: "zzz", category: "all" })).toHaveLength(0);
  });
});

describe("sortProducts", () => {
  it("sorts by price ascending and descending", () => {
    expect(sortProducts(products, "price-asc").map((p) => p.price)).toEqual([
      100, 200, 300,
    ]);
    expect(sortProducts(products, "price-desc").map((p) => p.price)).toEqual([
      300, 200, 100,
    ]);
  });

  it("sorts by name and leaves the input array unmutated", () => {
    const names = sortProducts(products, "name-asc").map((p) => p.name);
    expect(names).toEqual(["Asgaard Sofa", "Grifo Lamp", "Muggo Mug"]);
    expect(products[0]?.name).toBe("Asgaard Sofa");
  });
});
