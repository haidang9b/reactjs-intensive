import { httpClient } from "@/services/http";
import { ENDPOINTS } from "@/services/endpoints";
import type { CartItem } from "@/types/cart";

export type CheckoutFormValues = {
  firstName: string;
  lastName: string;
  companyName: string;
  country: string;
  streetAddress: string;
  city: string;
  province: string;
  zip: string;
  phone: string;
  email: string;
  additionalInfo: string;
  paymentMethod: "bank" | "cash";
};

export type CheckoutPayload = CheckoutFormValues & {
  items: CartItem[];
  total: number;
};

export type CheckoutResponse = {
  success?: boolean;
  orderId?: string;
  message?: string;
};

export async function submitCheckout(
  payload: CheckoutPayload,
): Promise<CheckoutResponse> {
  return httpClient.post<CheckoutResponse, CheckoutPayload>(
    ENDPOINTS.checkout,
    payload,
  );
}
