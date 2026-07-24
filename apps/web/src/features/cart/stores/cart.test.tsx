import { act, renderHook } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it } from "vitest";
import { useCart } from "@/features/cart/hooks/use-cart";
import { CartProvider } from "./cart-provider";

const wrapper = ({ children }: { children: ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

const sofa = {
  productId: 1,
  slug: "asgaard-sofa",
  name: "Asgaard Sofa",
  image: "/images/product/product-01.png",
  price: 25000000,
};

describe("cart store", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("adds an item and computes totals", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => result.current.addItem(sofa, 2));

    expect(result.current.items).toHaveLength(1);
    expect(result.current.totals.count).toBe(2);
    expect(result.current.totals.subtotal).toBe(50000000);
    expect(result.current.totals.total).toBe(50000000);
  });

  it("merges quantity when the same product is added again", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => result.current.addItem(sofa, 1));
    act(() => result.current.addItem(sofa, 3));

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0]?.quantity).toBe(4);
  });

  it("updates quantity and removes the line when set to zero", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => result.current.addItem(sofa, 1));
    act(() => result.current.updateQuantity(sofa.productId, 5));
    expect(result.current.items[0]?.quantity).toBe(5);

    act(() => result.current.updateQuantity(sofa.productId, 0));
    expect(result.current.items).toHaveLength(0);
  });

  it("removes an item and clears the cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => result.current.addItem(sofa, 1));
    act(() => result.current.addItem({ ...sofa, productId: 2 }, 1));
    act(() => result.current.removeItem(1));
    expect(result.current.items).toHaveLength(1);

    act(() => result.current.clearCart());
    expect(result.current.items).toHaveLength(0);
  });

  it("persists the cart to localStorage", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => result.current.addItem(sofa, 2));

    const stored = JSON.parse(
      window.localStorage.getItem("furniro-cart") ?? "[]",
    );
    expect(stored).toHaveLength(1);
    expect(stored[0].quantity).toBe(2);
  });
});
