export type Product = {
  id: number;
  slug: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  thumbnail: string;
  badge: string;
  rating: number;
  shortDescription: string;
  tags: string[];
};

export type Category = {
  id: number;
  slug: string;
  name: string;
  productCount: number;
};

export type Breadcrumb = {
  label: string;
  href: string;
};

export type ProductOption = {
  label?: string;
  name?: string;
  value: string;
  selected: boolean;
};

export type RelatedProduct = {
  id: number;
  slug: string;
  name: string;
  priceText: string;
  originalPriceText: string;
  thumbnail: string;
  badge: string;
};

export type ProductTab = {
  key: string;
  label: string;
  active: boolean;
  content: string[];
};

export type ProductDetail = {
  id: number;
  slug: string;
  name: string;
  breadcrumb: Breadcrumb[];
  category: string;
  price: number;
  priceText: string;
  originalPrice: number;
  rating: number;
  ratingCount: number;
  reviewLabel: string;
  shortDescription: string;
  gallery: {
    active: string;
    thumbnails: string[];
  };
  sizes: ProductOption[];
  colors: ProductOption[];
  quantity: {
    default: number;
    min: number;
    max: number;
  };
  actions: {
    primary: { label: string };
    secondary: { label: string; icon: string }[];
  };
  meta: {
    sku: string;
    category: string;
    tags: string[];
  };
  share: { platform: string; label: string }[];
  tabs: ProductTab[];
  detailImages: string[];
  relatedProducts: RelatedProduct[];
};
