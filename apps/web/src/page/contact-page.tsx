import { useMutation } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@react-workshop/ui/button";
import { Field, FieldError, Input, Label, Textarea } from "@react-workshop/ui/input";
import { Container } from "@/components/container";
import { PageBanner } from "@/components/page-banner";
import {
  submitContact,
  type ContactFormValues,
} from "@/features/contact/api/submit-contact";

export function ContactPage() {
  const form = useForm<ContactFormValues>({
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const contactMutation = useMutation({
    mutationFn: submitContact,
    onSuccess: () => form.reset(),
  });

  return (
    <>
      <PageBanner title="Contact" />
      <Container className="py-16">
        <div className="mx-auto mb-16 max-w-xl text-center">
          <h2 className="text-3xl font-semibold text-[#333333]">
            Get In Touch With Us
          </h2>
          <p className="mt-3 text-sm text-[#9f9f9f]">
            For More Information About Our Product &amp; Services. Please Feel Free
            To Drop Us An Email. Our Staff Always Be There To Help You Out. Do Not
            Hesitate!
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-16 lg:grid-cols-[1fr_1.4fr]">
          {/* Contact info */}
          <div className="grid content-start gap-10">
            <InfoItem
              icon={<PinIcon />}
              lines={["236 5th SE Avenue, New York NY10000, United States"]}
              title="Address"
            />
            <InfoItem
              icon={<PhoneIcon />}
              lines={["Mobile: +(84) 546-6789", "Hotline: +(84) 456-6789"]}
              title="Phone"
            />
            <InfoItem
              icon={<ClockIcon />}
              lines={[
                "Monday-Friday: 9:00 - 22:00",
                "Saturday-Sunday: 9:00 - 21:00",
              ]}
              title="Working Time"
            />
          </div>

          {/* Contact form */}
          <form
            className="grid gap-8"
            onSubmit={form.handleSubmit((values) => contactMutation.mutate(values))}
          >
            <Field>
              <Label htmlFor="name">Your name</Label>
              <Input
                id="name"
                isInvalid={Boolean(form.formState.errors.name)}
                placeholder="Abc"
                {...form.register("name", {
                  required: "Name is required",
                  minLength: { value: 2, message: "At least 2 characters" },
                })}
              />
              <FieldError>{form.formState.errors.name?.message}</FieldError>
            </Field>

            <Field>
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                isInvalid={Boolean(form.formState.errors.email)}
                placeholder="Abc@def.com"
                type="email"
                {...form.register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Enter a valid email address",
                  },
                })}
              />
              <FieldError>{form.formState.errors.email?.message}</FieldError>
            </Field>

            <Field>
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                placeholder="This is an optional"
                {...form.register("subject")}
              />
            </Field>

            <Field>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                isInvalid={Boolean(form.formState.errors.message)}
                placeholder="Hi! i'd like to ask about"
                {...form.register("message", { required: "Message is required" })}
              />
              <FieldError>{form.formState.errors.message?.message}</FieldError>
            </Field>

            <Button
              className="justify-self-start px-14"
              isLoading={contactMutation.isPending}
              size="lg"
              type="submit"
            >
              Submit
            </Button>

            {contactMutation.isSuccess ? (
              <p className="rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
                Thanks for reaching out — we will get back to you soon.
              </p>
            ) : null}
            {contactMutation.isError ? (
              <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
                Could not send your message. Please try again.
              </p>
            ) : null}
          </form>
        </div>
      </Container>
    </>
  );
}

function InfoItem({
  icon,
  title,
  lines,
}: {
  icon: ReactNode;
  title: string;
  lines: string[];
}) {
  return (
    <div className="flex gap-5">
      <span className="mt-1 text-[#333333]">{icon}</span>
      <div>
        <p className="text-xl font-medium text-[#333333]">{title}</p>
        <div className="mt-2 max-w-[220px] text-sm text-[#333333]">
          {lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

function PinIcon() {
  return (
    <svg className="size-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg className="size-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24 11 11 0 0 0 3.5.56 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11 11 0 0 0 .56 3.5 1 1 0 0 1-.25 1l-2.2 2.3Z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="size-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 10a1 1 0 0 1-.5.87l-3.5 2-1-1.74L11 11.4V6.5a1 1 0 0 1 2 0V12Z" />
    </svg>
  );
}
