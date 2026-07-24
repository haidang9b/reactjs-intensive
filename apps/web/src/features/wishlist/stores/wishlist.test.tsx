import { act, renderHook } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it } from "vitest";
import { useWishlist } from "@/features/wishlist/hooks/use-wishlist";
import { WishlistProvider } from "./wishlist-provider";

const wrapper = ({ children }: { children: ReactNode }) => (
  <WishlistProvider>{children}</WishlistProvider>
);

const item = {
  id: 1,
  slug: "asgaard-sofa",
  name: "Asgaard Sofa",
  image: "/images/product/product-01.png",
  price: 250000,
};

describe("wishlist store", () => {
  beforeEach(() => window.localStorage.clear());

  it("toggles items on and off", () => {
    const { result } = renderHook(() => useWishlist(), { wrapper });

    act(() => result.current.toggle(item));
    expect(result.current.has(1)).toBe(true);
    expect(result.current.items).toHaveLength(1);

    act(() => result.current.toggle(item));
    expect(result.current.has(1)).toBe(false);
    expect(result.current.items).toHaveLength(0);
  });

  it("removes and clears", () => {
    const { result } = renderHook(() => useWishlist(), { wrapper });

    act(() => result.current.toggle(item));
    act(() => result.current.toggle({ ...item, id: 2, slug: "b" }));
    act(() => result.current.remove(1));
    expect(result.current.items.map((i) => i.id)).toEqual([2]);

    act(() => result.current.clear());
    expect(result.current.items).toHaveLength(0);
  });

  it("persists to localStorage", () => {
    const { result } = renderHook(() => useWishlist(), { wrapper });
    act(() => result.current.toggle(item));

    const stored = JSON.parse(
      window.localStorage.getItem("furniro-wishlist") ?? "[]",
    );
    expect(stored).toHaveLength(1);
  });
});
