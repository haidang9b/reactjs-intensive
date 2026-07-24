import type {
  InputHTMLAttributes,
  LabelHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { cn } from "../utils";

const fieldBase = cn(
  "w-full rounded-[10px] border bg-white text-base text-[#333333] transition-colors",
  "placeholder:text-[#9f9f9f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0",
);

function fieldTone(isInvalid: boolean) {
  return isInvalid
    ? "border-red-400 focus-visible:border-red-400 focus-visible:ring-red-400/40"
    : "border-[#9f9f9f] focus-visible:border-[#b88e2f] focus-visible:ring-[#b88e2f]/40";
}

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  isInvalid?: boolean;
};

export function Input({ className, isInvalid = false, ...props }: InputProps) {
  return (
    <input
      aria-invalid={isInvalid || undefined}
      className={cn(fieldBase, "h-12 px-4", fieldTone(isInvalid), className)}
      {...props}
    />
  );
}

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  isInvalid?: boolean;
};

export function Select({ className, isInvalid = false, ...props }: SelectProps) {
  return (
    <select
      aria-invalid={isInvalid || undefined}
      className={cn(fieldBase, "h-12 px-4", fieldTone(isInvalid), className)}
      {...props}
    />
  );
}

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  isInvalid?: boolean;
};

export function Textarea({
  className,
  isInvalid = false,
  ...props
}: TextareaProps) {
  return (
    <textarea
      aria-invalid={isInvalid || undefined}
      className={cn(fieldBase, "min-h-32 px-4 py-3", fieldTone(isInvalid), className)}
      {...props}
    />
  );
}

export function Label({ className, ...props }: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn(
        "text-base font-medium leading-none text-[#333333]",
        className,
      )}
      {...props}
    />
  );
}

export function FieldError({ children }: { children?: ReactNode }) {
  if (!children) {
    return null;
  }

  return <p className="text-sm text-red-600">{children}</p>;
}

export function Field({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("grid gap-2", className)}>{children}</div>;
}
