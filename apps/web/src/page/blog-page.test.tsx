import { screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "@/test/render";
import { BlogPage } from "./blog-page";

vi.mock("@/features/blog/api/get-posts", () => ({
  getPosts: vi.fn().mockResolvedValue([
    {
      id: 1,
      slug: "millennial-design",
      title: "Going all-in with millennial design",
      excerpt: "Lorem ipsum",
      coverImage: "/images/blog/blog-01.jpg",
      category: "Wood",
      author: "Admin",
      publishedAt: "2026-07-01",
    },
  ]),
}));

describe("BlogPage", () => {
  it("renders posts and the sidebar categories", async () => {
    renderWithProviders(<BlogPage />);
    expect(
      await screen.findByRole("heading", {
        name: /going all-in with millennial design/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("Categories")).toBeInTheDocument();
    expect(screen.getByText("Recent Posts")).toBeInTheDocument();
  });
});
