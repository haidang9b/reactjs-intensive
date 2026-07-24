import { HttpError } from "@react-workshop/http-client";
import type { ReactNode } from "react";

export function LoadingState({ label = "Loading..." }: { label?: string }) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-3 py-16 text-[#898989]"
      role="status"
    >
      <span className="size-8 animate-spin rounded-full border-2 border-[#b88e2f] border-t-transparent" />
      <p className="text-sm">{label}</p>
    </div>
  );
}

export function ErrorState({
  error,
  onRetry,
}: {
  error: unknown;
  onRetry?: () => void;
}) {
  const message =
    error instanceof HttpError && error.status
      ? `Request failed with status ${error.status}.`
      : "Something went wrong. Please try again.";

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      <p className="rounded-md bg-red-50 px-4 py-2 text-sm text-red-700">
        {message}
      </p>
      {onRetry ? (
        <button
          className="text-sm font-semibold text-[#b88e2f] underline-offset-4 hover:underline"
          onClick={onRetry}
          type="button"
        >
          Retry
        </button>
      ) : null}
    </div>
  );
}

export function EmptyState({
  title = "Nothing here yet",
  description,
  action,
}: {
  title?: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      <p className="text-lg font-medium text-[#3a3a3a]">{title}</p>
      {description ? (
        <p className="max-w-md text-sm text-[#898989]">{description}</p>
      ) : null}
      {action}
    </div>
  );
}
