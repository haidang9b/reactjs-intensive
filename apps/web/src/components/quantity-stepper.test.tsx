import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { QuantityStepper } from "./quantity-stepper";

describe("QuantityStepper", () => {
  it("increments and decrements within bounds", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<QuantityStepper onChange={onChange} value={2} />);

    await user.click(screen.getByRole("button", { name: /increase/i }));
    expect(onChange).toHaveBeenCalledWith(3);

    await user.click(screen.getByRole("button", { name: /decrease/i }));
    expect(onChange).toHaveBeenCalledWith(1);
  });

  it("disables decrement at the minimum", () => {
    render(<QuantityStepper min={1} onChange={vi.fn()} value={1} />);
    expect(screen.getByRole("button", { name: /decrease/i })).toBeDisabled();
  });

  it("disables increment at the maximum", () => {
    render(<QuantityStepper max={5} onChange={vi.fn()} value={5} />);
    expect(screen.getByRole("button", { name: /increase/i })).toBeDisabled();
  });
});
