import { useState, type ReactNode } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Container } from "@/components/container";
import {
  AccountIcon,
  CartIcon,
  CloseIcon,
  HeartIcon,
  MenuIcon,
  SearchIcon,
} from "@/components/icons";
import { CartDrawer } from "@/features/cart/components/cart-drawer";
import { useCart } from "@/features/cart/hooks/use-cart";
import { useWishlist } from "@/features/wishlist/hooks/use-wishlist";
import { asset } from "@/utils/asset";

const navItems = [
  { to: "/", label: "Home", end: true },
  { to: "/shop", label: "Shop", end: false },
  { to: "/blog", label: "Blog", end: false },
  { to: "/about", label: "About", end: false },
  { to: "/contact", label: "Contact", end: false },
];

export function Header() {
  const navigate = useNavigate();
  const { totals } = useCart();
  const wishlist = useWishlist();
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[#f0f0f0] bg-white">
      <Container className="flex h-20 items-center justify-between">
        <Link className="flex items-center gap-2" to="/">
          <img
            alt=""
            aria-hidden="true"
            className="size-8"
            src={asset("/images/logo.svg")}
          />
          <span className="text-2xl font-bold text-[#333333]">Furniro</span>
        </Link>

        <nav className="hidden items-center gap-12 md:flex">
          {navItems.map((item) => (
            <NavLink
              className={({ isActive }) =>
                `text-base font-medium transition-colors hover:text-[#b88e2f] ${
                  isActive ? "text-[#b88e2f]" : "text-[#333333]"
                }`
              }
              end={item.end}
              key={item.to}
              to={item.to}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-5 sm:gap-7">
          <button
            aria-label="Account"
            className="hidden text-[#333333] transition-colors hover:text-[#b88e2f] sm:block"
            onClick={() => navigate("/contact")}
            type="button"
          >
            <AccountIcon />
          </button>
          <button
            aria-label="Search"
            className="hidden text-[#333333] transition-colors hover:text-[#b88e2f] sm:block"
            onClick={() => navigate("/shop")}
            type="button"
          >
            <SearchIcon />
          </button>
          <Link
            aria-label="Wishlist"
            className="relative text-[#333333] transition-colors hover:text-[#b88e2f]"
            to="/wishlist"
          >
            <HeartIcon />
            {wishlist.items.length > 0 ? (
              <Badge>{wishlist.items.length}</Badge>
            ) : null}
          </Link>
          <button
            aria-haspopup="dialog"
            aria-label="Cart"
            className="relative text-[#333333] transition-colors hover:text-[#b88e2f]"
            onClick={() => setCartOpen((value) => !value)}
            onMouseEnter={() => setCartOpen(true)}
            type="button"
          >
            <CartIcon />
            {totals.count > 0 ? <Badge>{totals.count}</Badge> : null}
          </button>
          <button
            aria-expanded={menuOpen}
            aria-label="Menu"
            className="text-[#333333] transition-colors hover:text-[#b88e2f] md:hidden"
            onClick={() => setMenuOpen((value) => !value)}
            type="button"
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </Container>

      {/* Mobile nav */}
      {menuOpen ? (
        <nav className="border-t border-[#f0f0f0] bg-white md:hidden">
          <Container className="grid gap-1 py-4">
            {navItems.map((item) => (
              <NavLink
                className={({ isActive }) =>
                  `rounded-md px-2 py-3 text-base font-medium transition-colors ${
                    isActive
                      ? "bg-[#f9f1e7] text-[#b88e2f]"
                      : "text-[#333333] hover:bg-[#faf4ec]"
                  }`
                }
                end={item.end}
                key={item.to}
                onClick={() => setMenuOpen(false)}
                to={item.to}
              >
                {item.label}
              </NavLink>
            ))}
          </Container>
        </nav>
      ) : null}

      <CartDrawer onClose={() => setCartOpen(false)} open={cartOpen} />
    </header>
  );
}

function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="absolute -right-2 -top-2 flex size-5 items-center justify-center rounded-full bg-[#b88e2f] text-xs font-semibold text-white">
      {children}
    </span>
  );
}
