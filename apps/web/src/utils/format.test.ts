import { describe, expect, it } from "vitest";
import { formatCurrency, formatDate } from "./format";

describe("formatCurrency", () => {
  it("formats a number as Rupiah without fractional digits", () => {
    const result = formatCurrency(25000000);
    expect(result).toContain("25.000.000");
    expect(result.startsWith("Rp")).toBe(true);
    expect(result).not.toContain(",00");
  });

  it("formats zero", () => {
    expect(formatCurrency(0)).toContain("0");
  });
});

describe("formatDate", () => {
  it("formats an ISO date as DD Mon YYYY", () => {
    expect(formatDate("2026-07-01")).toBe("01 Jul 2026");
  });

  it("returns the input unchanged when it is not a valid date", () => {
    expect(formatDate("not-a-date")).toBe("not-a-date");
  });
});
