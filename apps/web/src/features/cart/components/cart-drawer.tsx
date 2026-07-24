import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/features/cart/hooks/use-cart";
import { formatCurrency } from "@/utils/format";

export function CartDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { items, totals, removeItem } = useCart();

  useEffect(() => {
    if (!open) {
      return;
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      aria-hidden={!open}
      className={`fixed inset-0 z-[60] ${open ? "" : "pointer-events-none"}`}
    >
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      <aside
        aria-label="Shopping cart"
        className={`absolute right-0 top-0 flex h-full w-full max-w-[417px] flex-col bg-white shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        onMouseLeave={onClose}
        role="dialog"
      >
        <div className="flex items-center justify-between border-b border-[#e8e8e8] px-8 py-6">
          <h2 className="text-2xl font-semibold text-[#333333]">Shopping Cart</h2>
          <button
            aria-label="Close cart"
            className="text-[#9f9f9f] hover:text-[#333333]"
            onClick={onClose}
            type="button"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-6">
          {items.length === 0 ? (
            <p className="mt-8 text-center text-sm text-[#9f9f9f]">
              Your cart is empty.
            </p>
          ) : (
            <ul className="grid gap-6">
              {items.map((item) => (
                <li className="flex items-center gap-4" key={item.productId}>
                  <img
                    alt={item.name}
                    className="size-[72px] rounded-[10px] bg-[#f9f1e7] object-cover"
                    src={item.image}
                  />
                  <div className="flex-1">
                    <p className="text-base text-[#333333]">{item.name}</p>
                    <p className="mt-1 text-sm text-[#333333]">
                      {item.quantity}
                      <span className="mx-2 text-[#9f9f9f]">×</span>
                      <span className="font-medium text-[#b88e2f]">
                        {formatCurrency(item.price)}
                      </span>
                    </p>
                  </div>
                  <button
                    aria-label={`Remove ${item.name}`}
                    className="text-[#9f9f9f] transition-colors hover:text-[#333333]"
                    onClick={() => removeItem(item.productId)}
                    type="button"
                  >
                    <RemoveIcon />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <span className="text-base text-[#333333]">Subtotal</span>
            <span className="text-base font-semibold text-[#b88e2f]">
              {formatCurrency(totals.subtotal)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 border-t border-[#e8e8e8] px-8 py-6">
          <DrawerLink onClick={onClose} to="/cart">
            Cart
          </DrawerLink>
          <DrawerLink onClick={onClose} to="/checkout">
            Checkout
          </DrawerLink>
          <DrawerLink onClick={onClose} to="/compare">
            Comparison
          </DrawerLink>
        </div>
      </aside>
    </div>
  );
}

function DrawerLink({
  to,
  onClick,
  children,
}: {
  to: string;
  onClick: () => void;
  children: string;
}) {
  return (
    <Link
      className="rounded-full border border-[#333333] px-5 py-1.5 text-sm text-[#333333] transition-colors hover:bg-[#333333] hover:text-white"
      onClick={onClick}
      to={to}
    >
      {children}
    </Link>
  );
}

function CloseIcon() {
  return (
    <svg className="size-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
    </svg>
  );
}

function RemoveIcon() {
  return (
    <svg className="size-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm3.5 12.1-1.4 1.4L12 13.4l-2.1 2.1-1.4-1.4L10.6 12 8.5 9.9l1.4-1.4L12 10.6l2.1-2.1 1.4 1.4L13.4 12l2.1 2.1Z" />
    </svg>
  );
}
