import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderWithProviders } from "@/test/render";
import { NotFoundPage } from "./not-found-page";

describe("NotFoundPage", () => {
  it("renders the 404 message", () => {
    renderWithProviders(<NotFoundPage />);
    expect(screen.getByText("404")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /page not found/i })).toBeInTheDocument();
  });
});
