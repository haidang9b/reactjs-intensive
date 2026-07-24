import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { FooterNewsletter } from "./footer-newsletter";

describe("FooterNewsletter", () => {
  it("does not confirm when the email is invalid", async () => {
    const user = userEvent.setup();
    render(<FooterNewsletter />);

    await user.type(screen.getByRole("textbox", { name: /email/i }), "not-an-email");
    await user.click(screen.getByRole("button", { name: /subscribe/i }));

    expect(screen.queryByText(/thank you/i)).not.toBeInTheDocument();
  });

  it("confirms after a valid email is submitted", async () => {
    const user = userEvent.setup();
    render(<FooterNewsletter />);

    await user.type(
      screen.getByRole("textbox", { name: /email/i }),
      "ada@example.com",
    );
    await user.click(screen.getByRole("button", { name: /subscribe/i }));

    expect(await screen.findByText(/thank you/i)).toBeInTheDocument();
  });
});
