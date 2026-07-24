import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderWithProviders } from "@/test/render";
import { AboutPage } from "./about-page";

describe("AboutPage", () => {
  it("renders the intro, story and stats", () => {
    renderWithProviders(<AboutPage />);
    expect(
      screen.getByRole("heading", { name: /designed for modern living/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /our story/i })).toBeInTheDocument();
    expect(screen.getByText(/happy customers/i)).toBeInTheDocument();
  });
});
