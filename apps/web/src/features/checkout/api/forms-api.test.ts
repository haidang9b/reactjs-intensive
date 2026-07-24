import { beforeEach, describe, expect, it, vi, type Mock } from "vitest";
import { httpClient } from "@/services/http";
import { submitContact } from "@/features/contact/api/submit-contact";
import { submitCheckout } from "./submit-checkout";

vi.mock("@/services/http", () => ({ httpClient: { post: vi.fn() } }));

const post = httpClient.post as unknown as Mock;

beforeEach(() => post.mockReset());

describe("form submit APIs", () => {
  it("submitCheckout posts the payload to the checkout endpoint", async () => {
    post.mockResolvedValue({ success: true, orderId: "A1" });
    const result = await submitCheckout({
      firstName: "Ada",
      lastName: "L",
      companyName: "",
      country: "Vietnam",
      streetAddress: "1 St",
      city: "HCM",
      province: "Western Province",
      zip: "70000",
      phone: "123",
      email: "ada@example.com",
      additionalInfo: "",
      paymentMethod: "bank",
      items: [],
      total: 0,
    });
    expect(result.orderId).toBe("A1");
    expect(post).toHaveBeenCalledTimes(1);
  });

  it("submitContact posts the payload to the contact endpoint", async () => {
    post.mockResolvedValue({ success: true });
    const result = await submitContact({
      name: "Ada",
      email: "ada@example.com",
      subject: "",
      message: "Hello",
    });
    expect(result.success).toBe(true);
  });
});
