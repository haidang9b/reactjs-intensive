import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FeatureStrip } from "./feature-strip";

describe("FeatureStrip", () => {
  it("renders all four feature highlights", () => {
    render(<FeatureStrip />);
    expect(screen.getByText("High Quality")).toBeInTheDocument();
    expect(screen.getByText("Warranty Protection")).toBeInTheDocument();
    expect(screen.getByText("Free Shipping")).toBeInTheDocument();
    expect(screen.getByText("24 / 7 Support")).toBeInTheDocument();
  });
});
