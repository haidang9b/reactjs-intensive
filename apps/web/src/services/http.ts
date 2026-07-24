import { createHttpClient } from "@react-workshop/http-client";

// Endpoints are absolute URLs, so no baseURL is needed here.
export const httpClient = createHttpClient({
  timeout: 15_000,
});
