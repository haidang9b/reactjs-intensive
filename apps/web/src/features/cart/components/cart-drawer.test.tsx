import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CartProvider } from "@/features/cart/stores/cart-provider";
import { CartDrawer } from "./cart-drawer";

function renderDrawer(node: ReactNode) {
  return render(
    <MemoryRouter>
      <CartProvider>{node}</CartProvider>
    </MemoryRouter>,
  );
}

describe("CartDrawer", () => {
  beforeEach(() => {
    window.localStorage.setItem(
      "furniro-cart",
      JSON.stringify([
        {
          productId: 1,
          slug: "asgaard-sofa",
          name: "Asgaard Sofa",
          image: "/images/product/product-01.png",
          price: 250000,
          quantity: 1,
        },
      ]),
    );
  });

  it("renders cart items and subtotal when open", () => {
    renderDrawer(<CartDrawer onClose={vi.fn()} open />);

    expect(
      screen.getByRole("heading", { name: /shopping cart/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("Asgaard Sofa")).toBeInTheDocument();
    expect(screen.getByText(/subtotal/i)).toBeInTheDocument();
  });

  it("calls onClose when the close button is clicked", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    renderDrawer(<CartDrawer onClose={onClose} open />);

    await user.click(screen.getByRole("button", { name: /close cart/i }));
    expect(onClose).toHaveBeenCalled();
  });

  it("removes an item from the drawer", async () => {
    const user = userEvent.setup();
    renderDrawer(<CartDrawer onClose={vi.fn()} open />);

    await user.click(screen.getByRole("button", { name: /remove asgaard sofa/i }));
    expect(screen.queryByText("Asgaard Sofa")).not.toBeInTheDocument();
  });
});
