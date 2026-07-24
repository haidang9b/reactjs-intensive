import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { renderWithProviders } from "@/test/render";
import { ContactPage } from "./contact-page";

describe("ContactPage", () => {
  it("renders the contact info and form", () => {
    renderWithProviders(<ContactPage />);
    expect(
      screen.getByRole("heading", { name: /get in touch with us/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("Address")).toBeInTheDocument();
    expect(screen.getByLabelText("Your name")).toBeInTheDocument();
  });

  it("validates required fields on submit", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ContactPage />);
    await user.click(screen.getByRole("button", { name: /submit/i }));
    expect(await screen.findByText(/name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/message is required/i)).toBeInTheDocument();
  });
});
