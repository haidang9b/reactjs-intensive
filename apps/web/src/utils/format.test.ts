import { describe, expect, it } from "vitest";
import { formatCurrency } from "./format";

describe("formatCurrency", () => {
  it("formats a number as VND without fractional digits", () => {
    const result = formatCurrency(25000000);
    expect(result).toContain("25.000.000");
    expect(result).not.toContain(",00");
  });

  it("formats zero", () => {
    expect(formatCurrency(0)).toContain("0");
  });
});
