import { httpClient } from "@/services/http";
import { ENDPOINTS } from "@/services/endpoints";

export type ContactFormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type ContactResponse = {
  success?: boolean;
  message?: string;
};

export async function submitContact(
  payload: ContactFormValues,
): Promise<ContactResponse> {
  return httpClient.post<ContactResponse, ContactFormValues>(
    ENDPOINTS.contact,
    payload,
  );
}
