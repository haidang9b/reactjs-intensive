import { Link, useParams } from "react-router-dom";
import { Container } from "@/components/container";
import { PageBanner } from "@/components/page-banner";
import { EmptyState, ErrorState, LoadingState } from "@/components/page-state";
import { usePostDetail } from "@/features/blog/hooks/use-post-detail";
import { formatDate } from "@/utils/format";

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const postQuery = usePostDetail(slug);

  if (postQuery.isLoading) {
    return (
      <Container className="py-16">
        <LoadingState />
      </Container>
    );
  }

  if (postQuery.isError) {
    return (
      <Container className="py-16">
        <ErrorState error={postQuery.error} onRetry={() => postQuery.refetch()} />
      </Container>
    );
  }

  const post = postQuery.data;
  if (!post) {
    return (
      <Container className="py-16">
        <EmptyState
          action={
            <Link className="text-[#b88e2f] underline" to="/blog">
              Back to blog
            </Link>
          }
          title="Post not found"
        />
      </Container>
    );
  }

  return (
    <>
      <PageBanner crumbs={[{ label: "Home", to: "/" }, { label: "Blog", to: "/blog" }]} title={post.title} />

      <Container className="py-16">
        <article className="mx-auto grid max-w-3xl gap-6">
          <div className="overflow-hidden rounded-[10px]">
            <img
              alt={post.title}
              className="aspect-[16/9] w-full object-cover"
              src={post.coverImage}
            />
          </div>
          <div className="flex flex-wrap items-center gap-6 text-sm text-[#9f9f9f]">
            <span>{post.author}</span>
            <span>{formatDate(post.publishedAt)}</span>
            <span>{post.category}</span>
          </div>
          <h1 className="text-3xl font-semibold text-[#333333]">{post.title}</h1>
          <div className="grid gap-5 text-sm leading-7 text-[#9f9f9f]">
            {post.content.map((block, index) => (
              <p key={index}>{block.text}</p>
            ))}
          </div>
          <Link
            className="mt-4 w-fit border-b border-[#333333] pb-1 text-sm text-[#333333] hover:border-[#b88e2f] hover:text-[#b88e2f]"
            to="/blog"
          >
            Back to blog
          </Link>
        </article>
      </Container>
    </>
  );
}
