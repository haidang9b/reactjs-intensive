import { act, renderHook } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it } from "vitest";
import { useCompare } from "@/features/compare/hooks/use-compare";
import { MAX_COMPARE } from "./compare-context";
import { CompareProvider } from "./compare-provider";

const wrapper = ({ children }: { children: ReactNode }) => (
  <CompareProvider>{children}</CompareProvider>
);

const item = (id: number) => ({
  id,
  slug: `item-${id}`,
  name: `Item ${id}`,
  image: "",
  price: 100 * id,
  rating: 4,
});

describe("compare store", () => {
  beforeEach(() => window.localStorage.clear());

  it("adds items and ignores duplicates", () => {
    const { result } = renderHook(() => useCompare(), { wrapper });

    act(() => result.current.add(item(1)));
    act(() => result.current.add(item(1)));
    expect(result.current.items).toHaveLength(1);

    act(() => result.current.add(item(2)));
    expect(result.current.items).toHaveLength(2);
  });

  it("caps the list at MAX_COMPARE", () => {
    const { result } = renderHook(() => useCompare(), { wrapper });

    act(() => {
      for (let id = 1; id <= MAX_COMPARE + 2; id += 1) {
        result.current.add(item(id));
      }
    });

    expect(result.current.items).toHaveLength(MAX_COMPARE);
  });

  it("removes and clears items", () => {
    const { result } = renderHook(() => useCompare(), { wrapper });

    act(() => result.current.add(item(1)));
    act(() => result.current.add(item(2)));
    act(() => result.current.remove(1));
    expect(result.current.items.map((i) => i.id)).toEqual([2]);

    act(() => result.current.clear());
    expect(result.current.items).toHaveLength(0);
  });
});
