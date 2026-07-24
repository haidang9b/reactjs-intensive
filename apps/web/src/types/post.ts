export type BlogPost = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  category: string;
  author: string;
  publishedAt: string;
};

export type BlogContentBlock = {
  type: string;
  text: string;
};

export type BlogPostDetail = {
  id: number;
  slug: string;
  title: string;
  coverImage: string;
  category: string;
  author: string;
  publishedAt: string;
  content: BlogContentBlock[];
  relatedPostIds: number[];
};
