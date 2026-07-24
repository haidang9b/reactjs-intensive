import { beforeEach, describe, expect, it, vi, type Mock } from "vitest";
import { httpClient } from "@/services/http";
import { getCategories } from "./get-categories";
import { getProductDetailBySlug, getProductDetails } from "./get-product-detail";
import { getProducts } from "./get-products";

vi.mock("@/services/http", () => ({
  httpClient: { get: vi.fn() },
}));

const get = httpClient.get as unknown as Mock;

const product = {
  id: 1,
  slug: "asgaard-sofa",
  name: "Asgaard Sofa",
  category: "sofa",
  price: 25000000,
  originalPrice: 30000000,
  thumbnail: "/images/product/product-01.png",
  badge: "Sale",
  rating: 4.8,
  shortDescription: "Sofa",
  tags: ["sofa"],
};

const detail = {
  id: 1,
  slug: "asgaard-sofa",
  name: "Asgaard Sofa",
  breadcrumb: [],
  category: "sofa",
  price: 25000000,
  priceText: "Rp 25.000.000",
  originalPrice: 30000000,
  rating: 4.8,
  ratingCount: 5,
  reviewLabel: "5 Customer Review",
  shortDescription: "Sofa",
  gallery: { active: "/images/product/product-01.png", thumbnails: ["/images/product/product-02.png"] },
  sizes: [],
  colors: [],
  quantity: { default: 1, min: 1, max: 9 },
  actions: { primary: { label: "Add To Cart" }, secondary: [{ label: "Compare", icon: "" }] },
  meta: { sku: "SS001", category: "Sofas", tags: ["sofa"] },
  share: [],
  tabs: [],
  detailImages: ["/images/product/product-03.jpg"],
  relatedProducts: [
    { id: 2, slug: "leviosa", name: "Leviosa", priceText: "Rp 2.500.000", originalPriceText: "", thumbnail: "/images/product/product-04.png", badge: "New" },
  ],
};

beforeEach(() => get.mockReset());

describe("products api", () => {
  it("getProducts maps the items and keeps the thumbnail path", async () => {
    get.mockResolvedValue({ items: [product] });
    const result = await getProducts();
    expect(result).toHaveLength(1);
    expect(result[0]?.thumbnail).toBe("/images/product/product-01.png");
  });

  it("getCategories returns the items", async () => {
    get.mockResolvedValue({ items: [{ id: 1, slug: "sofa", name: "Sofa", productCount: 6 }] });
    const result = await getCategories();
    expect(result[0]?.name).toBe("Sofa");
  });

  it("getProductDetails maps gallery, detail images and related products", async () => {
    get.mockResolvedValue({ items: [detail] });
    const result = await getProductDetails();
    expect(result[0]?.gallery.active).toBe("/images/product/product-01.png");
    expect(result[0]?.detailImages).toHaveLength(1);
    expect(result[0]?.relatedProducts[0]?.thumbnail).toBe("/images/product/product-04.png");
  });

  it("getProductDetailBySlug finds a product by slug", async () => {
    get.mockResolvedValue({ items: [detail] });
    expect(await getProductDetailBySlug("asgaard-sofa")).toBeDefined();
    expect(await getProductDetailBySlug("missing")).toBeUndefined();
  });
});
