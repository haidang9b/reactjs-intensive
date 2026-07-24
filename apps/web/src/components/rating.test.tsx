import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Rating } from "./rating";

describe("Rating", () => {
  it("renders the review count when provided", () => {
    render(<Rating count={5} value={4.5} />);
    expect(screen.getByText(/5 reviews/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/rated 4.5 of 5/i)).toBeInTheDocument();
  });

  it("omits the count when not provided", () => {
    render(<Rating value={3} />);
    expect(screen.queryByText(/reviews/i)).not.toBeInTheDocument();
  });
});
