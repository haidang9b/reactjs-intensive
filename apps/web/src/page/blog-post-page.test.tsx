import { screen } from "@testing-library/react";
import { Route, Routes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "@/test/render";
import { BlogPostPage } from "./blog-post-page";

vi.mock("@/features/blog/api/get-post-detail", () => ({
  getPostDetailBySlug: vi.fn().mockResolvedValue({
    id: 1,
    slug: "millennial-design",
    title: "Going all-in with millennial design",
    coverImage: "/images/blog/blog-01.jpg",
    category: "Wood",
    author: "Admin",
    publishedAt: "2026-07-01",
    content: [{ type: "paragraph", text: "Hello world." }],
    relatedPostIds: [],
  }),
}));

describe("BlogPostPage", () => {
  it("renders the routed post with its content", async () => {
    renderWithProviders(
      <Routes>
        <Route element={<BlogPostPage />} path="/blog/:slug" />
      </Routes>,
      { route: "/blog/millennial-design" },
    );
    expect(await screen.findByText("Hello world.")).toBeInTheDocument();
    expect(
      screen.getAllByRole("heading", {
        name: /going all-in with millennial design/i,
      }).length,
    ).toBeGreaterThan(0);
  });
});
