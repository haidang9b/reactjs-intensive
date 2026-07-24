import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { PageBanner } from "./page-banner";

describe("PageBanner", () => {
  it("renders the title and default Home breadcrumb", () => {
    render(
      <MemoryRouter>
        <PageBanner title="Shop" />
      </MemoryRouter>,
    );
    expect(screen.getByRole("heading", { name: "Shop" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
  });

  it("renders custom breadcrumbs", () => {
    render(
      <MemoryRouter>
        <PageBanner
          crumbs={[
            { label: "Home", to: "/" },
            { label: "Blog", to: "/blog" },
          ]}
          title="A Post"
        />
      </MemoryRouter>,
    );
    expect(screen.getByRole("link", { name: "Blog" })).toHaveAttribute("href", "/blog");
  });
});
