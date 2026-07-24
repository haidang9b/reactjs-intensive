import type { ReactNode } from "react";
import { Link } from "react-router-dom";

// Compact product card (image + name + price) shared by related products and
// the wishlist. Slots: `badge`/`topRight` overlay the image, `footer` sits under.
export function ProductSummaryCard({
  to,
  image,
  name,
  price,
  badge,
  topRight,
  footer,
}: {
  to: string;
  image: string;
  name: string;
  price: ReactNode;
  badge?: ReactNode;
  topRight?: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <article className="group flex flex-col bg-[#f4f5f7]">
      <div className="relative overflow-hidden">
        {badge}
        {topRight}
        <Link to={to}>
          <img
            alt={name}
            className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            src={image}
          />
        </Link>
      </div>
      <div className="grid gap-2 p-4">
        <h3 className="text-lg font-semibold text-[#3a3a3a]">
          <Link to={to}>{name}</Link>
        </h3>
        {price}
        {footer}
      </div>
    </article>
  );
}
