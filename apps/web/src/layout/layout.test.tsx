import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderWithProviders } from "@/test/render";
import { Footer } from "./footer";
import { Header } from "./header";

describe("Header", () => {
  it("renders the brand, nav and cart control", () => {
    renderWithProviders(<Header />);
    expect(screen.getByText("Furniro")).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Shop" }).length).toBeGreaterThan(0);
    expect(screen.getByRole("button", { name: "Cart" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Wishlist" })).toHaveAttribute(
      "href",
      "/wishlist",
    );
  });
});

describe("Footer", () => {
  it("renders links and the newsletter", () => {
    renderWithProviders(<Footer />);
    expect(screen.getByText("Newsletter")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /subscribe/i })).toBeInTheDocument();
    expect(screen.getByText(/all rights reserved/i)).toBeInTheDocument();
  });
});
