import { HttpError } from "@react-workshop/http-client";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { EmptyState, ErrorState, LoadingState } from "./page-state";

describe("page-state", () => {
  it("LoadingState shows the label", () => {
    render(<LoadingState label="Loading products..." />);
    expect(screen.getByText("Loading products...")).toBeInTheDocument();
  });

  it("ErrorState shows the HTTP status and calls onRetry", async () => {
    const user = userEvent.setup();
    const onRetry = vi.fn();
    render(
      <ErrorState error={new HttpError("nope", { status: 500 })} onRetry={onRetry} />,
    );
    expect(screen.getByText(/status 500/i)).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /retry/i }));
    expect(onRetry).toHaveBeenCalled();
  });

  it("ErrorState shows a generic message for unknown errors", () => {
    render(<ErrorState error={new Error("boom")} />);
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  it("EmptyState renders title, description and action", () => {
    render(
      <EmptyState
        action={<button type="button">Go</button>}
        description="Nothing to see"
        title="Empty"
      />,
    );
    expect(screen.getByText("Empty")).toBeInTheDocument();
    expect(screen.getByText("Nothing to see")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Go" })).toBeInTheDocument();
  });
});
