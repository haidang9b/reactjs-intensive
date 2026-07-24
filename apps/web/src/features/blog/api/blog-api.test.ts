import { beforeEach, describe, expect, it, vi, type Mock } from "vitest";
import { httpClient } from "@/services/http";
import { getPostDetailBySlug, getPostDetails } from "./get-post-detail";
import { getPosts } from "./get-posts";

vi.mock("@/services/http", () => ({ httpClient: { get: vi.fn() } }));

const get = httpClient.get as unknown as Mock;

const post = {
  id: 1,
  slug: "millennial-design",
  title: "Going all-in with millennial design",
  excerpt: "Lorem ipsum",
  coverImage: "/images/blog/blog-01.jpg",
  category: "Wood",
  author: "Admin",
  publishedAt: "2026-07-01",
};

beforeEach(() => get.mockReset());

describe("blog api", () => {
  it("getPosts maps posts and keeps cover image path", async () => {
    get.mockResolvedValue({ items: [post] });
    const result = await getPosts();
    expect(result[0]?.coverImage).toBe("/images/blog/blog-01.jpg");
  });

  it("getPostDetails maps and getPostDetailBySlug finds by slug", async () => {
    get.mockResolvedValue({
      items: [{ ...post, content: [{ type: "paragraph", text: "Hi" }], relatedPostIds: [] }],
    });
    const details = await getPostDetails();
    expect(details[0]?.content).toHaveLength(1);
    expect(await getPostDetailBySlug("millennial-design")).toBeDefined();
    expect(await getPostDetailBySlug("nope")).toBeUndefined();
  });
});
