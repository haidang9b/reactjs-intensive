export type CartItem = {
  productId: number;
  slug: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
};

export type CartTotals = {
  count: number;
  subtotal: number;
  total: number;
};
