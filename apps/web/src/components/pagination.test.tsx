import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Pagination } from "./pagination";

describe("Pagination", () => {
  it("renders nothing when there is a single page", () => {
    const { container } = render(
      <Pagination current={1} onChange={vi.fn()} totalPages={1} />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("renders page buttons and calls onChange", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Pagination current={1} onChange={onChange} totalPages={3} />);

    expect(screen.getByRole("button", { name: "2" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "2" }));
    expect(onChange).toHaveBeenCalledWith(2);

    await user.click(screen.getByRole("button", { name: /next/i }));
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it("disables Next on the last page", () => {
    render(<Pagination current={3} onChange={vi.fn()} totalPages={3} />);
    expect(screen.getByRole("button", { name: /next/i })).toBeDisabled();
  });
});
