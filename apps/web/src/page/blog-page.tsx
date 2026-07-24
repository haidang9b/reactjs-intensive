import { useMemo, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Container } from "@/components/container";
import { PageBanner } from "@/components/page-banner";
import { EmptyState, ErrorState, LoadingState } from "@/components/page-state";
import { usePosts } from "@/features/blog/hooks/use-posts";
import { useDebounce } from "@/hooks/use-debounce";
import type { BlogPost } from "@/types/post";
import { formatDate } from "@/utils/format";

const PAGE_SIZE = 3;

export function BlogPage() {
  const postsQuery = usePosts();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search, 300);
  const posts = useMemo(() => postsQuery.data ?? [], [postsQuery.data]);

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    posts.forEach((post) =>
      counts.set(post.category, (counts.get(post.category) ?? 0) + 1),
    );
    return [...counts.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [posts]);

  const recent = useMemo(
    () =>
      [...posts]
        .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
        .slice(0, 5),
    [posts],
  );

  const filtered = useMemo(() => {
    const keyword = debouncedSearch.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesCategory = !category || post.category === category;
      const matchesKeyword =
        keyword.length === 0 ||
        post.title.toLowerCase().includes(keyword) ||
        post.excerpt.toLowerCase().includes(keyword);
      return matchesCategory && matchesKeyword;
    });
  }, [posts, debouncedSearch, category]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  return (
    <>
      <PageBanner title="Blog" />

      <Container className="grid gap-12 py-16 lg:grid-cols-[1fr_360px]">
        {/* Posts */}
        <div>
          {postsQuery.isLoading ? <LoadingState /> : null}
          {postsQuery.isError ? (
            <ErrorState
              error={postsQuery.error}
              onRetry={() => postsQuery.refetch()}
            />
          ) : null}
          {postsQuery.isSuccess && filtered.length === 0 ? (
            <EmptyState title="No posts found" />
          ) : null}

          <div className="grid gap-14">
            {pageItems.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          {totalPages > 1 ? (
            <div className="mt-14 flex items-center justify-center gap-3">
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (value) => (
                  <button
                    aria-current={value === currentPage ? "page" : undefined}
                    className={`flex size-12 items-center justify-center rounded-lg text-base font-medium transition-colors ${
                      value === currentPage
                        ? "bg-[#b88e2f] text-white"
                        : "bg-[#f9f1e7] text-[#333333] hover:bg-[#efe7d5]"
                    }`}
                    key={value}
                    onClick={() => setPage(value)}
                    type="button"
                  >
                    {value}
                  </button>
                ),
              )}
              <button
                className="flex h-12 items-center justify-center rounded-lg bg-[#f9f1e7] px-6 text-base font-medium text-[#333333] transition-colors hover:bg-[#efe7d5] disabled:opacity-40"
                disabled={currentPage >= totalPages}
                onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
                type="button"
              >
                Next
              </button>
            </div>
          ) : null}
        </div>

        {/* Sidebar */}
        <aside className="grid content-start gap-10">
          <div className="relative">
            <input
              aria-label="Search posts"
              className="h-12 w-full rounded-[10px] border border-[#9f9f9f] bg-white pl-4 pr-12 text-sm text-[#333333] placeholder:text-[#9f9f9f] focus-visible:border-[#b88e2f] focus-visible:outline-none"
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              placeholder="Search posts..."
              type="search"
              value={search}
            />
            <SearchIcon />
          </div>

          <div>
            <h3 className="mb-6 text-xl font-medium text-[#333333]">Categories</h3>
            <ul className="grid gap-6 text-sm">
              {categories.map((item) => (
                <li key={item.name}>
                  <button
                    className={`flex w-full items-center justify-between transition-colors ${
                      category === item.name
                        ? "text-[#b88e2f]"
                        : "text-[#9f9f9f] hover:text-[#333333]"
                    }`}
                    onClick={() => {
                      setCategory(category === item.name ? null : item.name);
                      setPage(1);
                    }}
                    type="button"
                  >
                    <span>{item.name}</span>
                    <span>{item.count}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-xl font-medium text-[#333333]">Recent Posts</h3>
            <ul className="grid gap-6">
              {recent.map((post) => (
                <li key={post.id}>
                  <Link
                    className="flex items-center gap-4"
                    to={`/blog/${post.slug}`}
                  >
                    <img
                      alt={post.title}
                      className="size-16 rounded-[10px] bg-[#f9f1e7] object-cover"
                      src={post.coverImage}
                    />
                    <div>
                      <p className="text-sm font-medium text-[#333333]">
                        {post.title}
                      </p>
                      <p className="mt-1 text-xs text-[#9f9f9f]">
                        {formatDate(post.publishedAt)}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </Container>
    </>
  );
}

function PostCard({ post }: { post: BlogPost }) {
  return (
    <article className="grid gap-6">
      <Link className="overflow-hidden rounded-[10px]" to={`/blog/${post.slug}`}>
        <img
          alt={post.title}
          className="aspect-[16/9] w-full object-cover"
          loading="lazy"
          src={post.coverImage}
        />
      </Link>
      <div className="flex flex-wrap items-center gap-6 text-sm text-[#9f9f9f]">
        <Meta icon={<AuthorIcon />} text={post.author} />
        <Meta icon={<CalendarIcon />} text={formatDate(post.publishedAt)} />
        <Meta icon={<TagIcon />} text={post.category} />
      </div>
      <h2 className="text-3xl font-medium text-[#333333]">
        <Link className="hover:text-[#b88e2f]" to={`/blog/${post.slug}`}>
          {post.title}
        </Link>
      </h2>
      <p className="text-sm leading-7 text-[#9f9f9f]">{post.excerpt}</p>
      <Link
        className="w-fit border-b border-[#333333] pb-1 text-sm text-[#333333] hover:border-[#b88e2f] hover:text-[#b88e2f]"
        to={`/blog/${post.slug}`}
      >
        Read more
      </Link>
    </article>
  );
}

function Meta({ icon, text }: { icon: ReactNode; text: string }) {
  return (
    <span className="flex items-center gap-2">
      {icon}
      {text}
    </span>
  );
}

function SearchIcon() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-[#333333]"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      viewBox="0 0 24 24"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" strokeLinecap="round" />
    </svg>
  );
}

function AuthorIcon() {
  return (
    <svg className="size-4" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" strokeLinecap="round" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg className="size-4" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
      <rect height="16" rx="2" width="18" x="3" y="5" />
      <path d="M3 9h18M8 3v4M16 3v4" strokeLinecap="round" />
    </svg>
  );
}

function TagIcon() {
  return (
    <svg className="size-4" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
      <path d="M3 12V4h8l9 9-8 8-9-9Z" strokeLinejoin="round" />
      <circle cx="7.5" cy="7.5" r="1.3" />
    </svg>
  );
}
