import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "@/layout/root-layout";

const HomePage = lazy(() =>
  import("@/page/home-page").then((m) => ({ default: m.HomePage })),
);
const ShopPage = lazy(() =>
  import("@/page/shop-page").then((m) => ({ default: m.ShopPage })),
);
const ProductDetailPage = lazy(() =>
  import("@/page/product-detail-page").then((m) => ({
    default: m.ProductDetailPage,
  })),
);
const BlogPage = lazy(() =>
  import("@/page/blog-page").then((m) => ({ default: m.BlogPage })),
);
const BlogPostPage = lazy(() =>
  import("@/page/blog-post-page").then((m) => ({ default: m.BlogPostPage })),
);
const CartPage = lazy(() =>
  import("@/page/cart-page").then((m) => ({ default: m.CartPage })),
);
const ComparePage = lazy(() =>
  import("@/page/compare-page").then((m) => ({ default: m.ComparePage })),
);
const WishlistPage = lazy(() =>
  import("@/page/wishlist-page").then((m) => ({ default: m.WishlistPage })),
);
const CheckoutPage = lazy(() =>
  import("@/page/checkout-page").then((m) => ({ default: m.CheckoutPage })),
);
const ContactPage = lazy(() =>
  import("@/page/contact-page").then((m) => ({ default: m.ContactPage })),
);
const AboutPage = lazy(() =>
  import("@/page/about-page").then((m) => ({ default: m.AboutPage })),
);
const NotFoundPage = lazy(() =>
  import("@/page/not-found-page").then((m) => ({ default: m.NotFoundPage })),
);

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <RootLayout />,
      children: [
      { index: true, element: <HomePage /> },
      { path: "shop", element: <ShopPage /> },
      { path: "products/:slug", element: <ProductDetailPage /> },
      { path: "blog", element: <BlogPage /> },
      { path: "blog/:slug", element: <BlogPostPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "compare", element: <ComparePage /> },
      { path: "wishlist", element: <WishlistPage /> },
      { path: "checkout", element: <CheckoutPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "about", element: <AboutPage /> },
      { path: "*", element: <NotFoundPage /> },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL.replace(/\/$/, "") || "/" },
);
