import { useMutation } from "@tanstack/react-query";
import type { ComponentProps } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "@react-workshop/ui/button";
import { Field, FieldError, Input, Label } from "@react-workshop/ui/input";
import { Container } from "@/components/container";
import { PageBanner } from "@/components/page-banner";
import { EmptyState } from "@/components/page-state";
import { useCart } from "@/features/cart/hooks/use-cart";
import {
  submitCheckout,
  type CheckoutFormValues,
} from "@/features/checkout/api/submit-checkout";
import { formatCurrency } from "@/utils/format";

const countries = ["Sri Lanka", "Vietnam", "Indonesia", "United States", "United Kingdom"];
const provinces = [
  "Western Province",
  "Central Province",
  "Southern Province",
  "Northern Province",
];

const selectClass =
  "h-12 w-full rounded-[10px] border border-[#9f9f9f] bg-white px-4 text-base text-[#333333] focus-visible:border-[#b88e2f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b88e2f]/40";

export function CheckoutPage() {
  const navigate = useNavigate();
  const { items, totals, clearCart } = useCart();
  const form = useForm<CheckoutFormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      companyName: "",
      country: countries[0],
      streetAddress: "",
      city: "",
      province: provinces[0],
      zip: "",
      phone: "",
      email: "",
      additionalInfo: "",
      paymentMethod: "bank",
    },
  });
  const paymentMethod = form.watch("paymentMethod");

  const checkoutMutation = useMutation({
    mutationFn: (values: CheckoutFormValues) =>
      submitCheckout({ ...values, items, total: totals.total }),
    onSuccess: () => clearCart(),
  });

  if (checkoutMutation.isSuccess) {
    return (
      <>
        <PageBanner title="Checkout" />
        <Container className="py-16">
          <EmptyState
            action={<Button onClick={() => navigate("/shop")}>Continue shopping</Button>}
            description={
              checkoutMutation.data.orderId
                ? `Your order ${checkoutMutation.data.orderId} has been placed.`
                : "Your order has been placed successfully."
            }
            title="Thank you for your order!"
          />
        </Container>
      </>
    );
  }

  if (items.length === 0) {
    return (
      <>
        <PageBanner title="Checkout" />
        <Container className="py-16">
          <EmptyState
            action={<Button onClick={() => navigate("/shop")}>Go to shop</Button>}
            description="Add some products before checking out."
            title="Your cart is empty"
          />
        </Container>
      </>
    );
  }

  const { errors } = form.formState;

  return (
    <>
      <PageBanner title="Checkout" />
      <Container className="py-16">
        <form
          className="grid gap-12 lg:grid-cols-2 lg:gap-20"
          onSubmit={form.handleSubmit((values) => checkoutMutation.mutate(values))}
        >
          {/* Billing details */}
          <div className="grid content-start gap-6">
            <h2 className="text-3xl font-semibold text-[#333333]">Billing details</h2>

            <div className="grid gap-6 sm:grid-cols-2">
              <Field>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  isInvalid={Boolean(errors.firstName)}
                  {...form.register("firstName", { required: "Required" })}
                />
                <FieldError>{errors.firstName?.message}</FieldError>
              </Field>
              <Field>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  isInvalid={Boolean(errors.lastName)}
                  {...form.register("lastName", { required: "Required" })}
                />
                <FieldError>{errors.lastName?.message}</FieldError>
              </Field>
            </div>

            <Field>
              <Label htmlFor="companyName">Company Name (Optional)</Label>
              <Input id="companyName" {...form.register("companyName")} />
            </Field>

            <Field>
              <Label htmlFor="country">Country / Region</Label>
              <select className={selectClass} id="country" {...form.register("country")}>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </Field>

            <Field>
              <Label htmlFor="streetAddress">Street address</Label>
              <Input
                id="streetAddress"
                isInvalid={Boolean(errors.streetAddress)}
                {...form.register("streetAddress", { required: "Required" })}
              />
              <FieldError>{errors.streetAddress?.message}</FieldError>
            </Field>

            <Field>
              <Label htmlFor="city">Town / City</Label>
              <Input
                id="city"
                isInvalid={Boolean(errors.city)}
                {...form.register("city", { required: "Required" })}
              />
              <FieldError>{errors.city?.message}</FieldError>
            </Field>

            <Field>
              <Label htmlFor="province">Province</Label>
              <select className={selectClass} id="province" {...form.register("province")}>
                {provinces.map((province) => (
                  <option key={province} value={province}>
                    {province}
                  </option>
                ))}
              </select>
            </Field>

            <Field>
              <Label htmlFor="zip">ZIP code</Label>
              <Input
                id="zip"
                isInvalid={Boolean(errors.zip)}
                {...form.register("zip", { required: "Required" })}
              />
              <FieldError>{errors.zip?.message}</FieldError>
            </Field>

            <Field>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                isInvalid={Boolean(errors.phone)}
                {...form.register("phone", { required: "Required" })}
              />
              <FieldError>{errors.phone?.message}</FieldError>
            </Field>

            <Field>
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                isInvalid={Boolean(errors.email)}
                type="email"
                {...form.register("email", {
                  required: "Required",
                  pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" },
                })}
              />
              <FieldError>{errors.email?.message}</FieldError>
            </Field>

            <Input
              placeholder="Additional information"
              {...form.register("additionalInfo")}
            />
          </div>

          {/* Order summary */}
          <div className="grid content-start gap-6">
            <div className="flex items-center justify-between text-2xl font-medium text-[#333333]">
              <span>Product</span>
              <span>Subtotal</span>
            </div>

            <div className="grid gap-4 text-sm">
              {items.map((item) => (
                <div className="flex justify-between" key={item.productId}>
                  <span className="text-[#9f9f9f]">
                    {item.name}
                    <span className="mx-2 text-[#333333]">×</span>
                    {item.quantity}
                  </span>
                  <span className="text-[#333333]">
                    {formatCurrency(item.price * item.quantity)}
                  </span>
                </div>
              ))}
              <div className="flex justify-between">
                <span className="text-[#333333]">Subtotal</span>
                <span className="text-[#333333]">{formatCurrency(totals.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#333333]">Total</span>
                <span className="text-2xl font-bold text-[#b88e2f]">
                  {formatCurrency(totals.total)}
                </span>
              </div>
            </div>

            <hr className="border-[#d9d9d9]" />

            <fieldset className="grid gap-4">
              <PaymentOption
                active={paymentMethod === "bank"}
                label="Direct Bank Transfer"
                value="bank"
                {...form.register("paymentMethod")}
              />
              {paymentMethod === "bank" ? (
                <p className="text-sm leading-6 text-[#9f9f9f]">
                  Make your payment directly into our bank account. Please use your
                  Order ID as the payment reference. Your order will not be shipped
                  until the funds have cleared in our account.
                </p>
              ) : null}
              <PaymentOption
                active={paymentMethod === "cash"}
                label="Cash On Delivery"
                value="cash"
                {...form.register("paymentMethod")}
              />
            </fieldset>

            <p className="text-sm leading-6 text-[#333333]">
              Your personal data will be used to support your experience throughout
              this website, to manage access to your account, and for other purposes
              described in our <span className="font-semibold">privacy policy.</span>
            </p>

            {checkoutMutation.isError ? (
              <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
                Checkout failed. Please try again.
              </p>
            ) : null}

            <Button
              className="justify-self-center px-16"
              isLoading={checkoutMutation.isPending}
              size="lg"
              type="submit"
              variant="outline"
            >
              Place order
            </Button>
          </div>
        </form>
      </Container>
    </>
  );
}

const PaymentOption = ({
  active,
  label,
  value,
  ...props
}: {
  active: boolean;
  label: string;
  value: string;
} & ComponentProps<"input">) => (
  <label className="flex items-center gap-3">
    <input
      className="size-4 accent-[#333333]"
      type="radio"
      value={value}
      {...props}
    />
    <span
      className={`text-base ${active ? "font-medium text-[#333333]" : "text-[#9f9f9f]"}`}
    >
      {label}
    </span>
  </label>
);
