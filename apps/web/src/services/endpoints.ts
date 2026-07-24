// Mock API endpoints (dummyjson custom-response). Each returns `{ items: [...] }`
// for GETs; the cart mutation endpoints return canned responses, so real cart
// state is managed client-side (see features/cart/stores).
export const ENDPOINTS = {
  products: "https://dummyjson.com/c/abbb-80dc-4582-8e14",
  productDetails: "https://dummyjson.com/c/feb3-066a-4263-88a8",
  categories: "https://dummyjson.com/c/796e-8dd2-4c34-8a9c",
  compare: "https://dummyjson.com/c/ac50-924b-4fce-9002",
  posts: "https://dummyjson.com/c/5f3e-0afd-424a-a144",
  postDetails: "https://dummyjson.com/c/0641-2273-4e42-8738",
  cart: "https://dummyjson.com/c/4758-8939-498e-a12c",
  cartAdd: "https://dummyjson.com/c/0bd3-1de3-4e85-92fb",
  cartUpdate: "https://dummyjson.com/c/05e7-d03f-434a-960f",
  cartRemove: "https://dummyjson.com/c/dc1d-e752-4dc6-b4f7",
  checkout: "https://dummyjson.com/c/2bf1-c646-4b04-b713",
  contact: "https://dummyjson.com/c/d46d-a885-4d10-afc3",
} as const;

// Shared response envelope for the list endpoints.
export type ItemsResponse<T> = {
  items: T[];
  total?: number;
};
