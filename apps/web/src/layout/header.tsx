import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Container } from "@/components/container";
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

function MenuIcon() {
  return (
    <svg aria-hidden="true" className="size-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" className="size-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
    </svg>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="absolute -right-2 -top-2 flex size-5 items-center justify-center rounded-full bg-[#b88e2f] text-xs font-semibold text-white">
      {children}
    </span>
  );
}

function AccountIcon() {
  return (
    <svg aria-hidden="true" className="size-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" strokeLinecap="round" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg aria-hidden="true" className="size-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" strokeLinecap="round" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg aria-hidden="true" className="size-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-6"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      viewBox="0 0 24 24"
    >
      <path
        d="M2.5 3h2l2.2 12.2a1.5 1.5 0 0 0 1.5 1.3h8.6a1.5 1.5 0 0 0 1.5-1.2L21 7H6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9.5" cy="20" r="1.4" />
      <circle cx="17.5" cy="20" r="1.4" />
    </svg>
  );
}
