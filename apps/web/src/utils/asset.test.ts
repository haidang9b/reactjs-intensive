import { describe, expect, it } from "vitest";
import { asset } from "./asset";

describe("asset", () => {
  it("returns absolute and data URLs unchanged", () => {
    expect(asset("https://example.com/a.png")).toBe("https://example.com/a.png");
    expect(asset("//cdn/a.png")).toBe("//cdn/a.png");
    expect(asset("data:image/png;base64,xxx")).toBe("data:image/png;base64,xxx");
  });

  it("returns empty input unchanged", () => {
    expect(asset("")).toBe("");
  });

  it("prefixes a rooted path with the base URL (identity when base is '/')", () => {
    // In tests import.meta.env.BASE_URL is "/", so the path is unchanged.
    expect(asset("/images/logo.svg")).toBe("/images/logo.svg");
    expect(asset("images/logo.svg")).toBe("/images/logo.svg");
  });
});
