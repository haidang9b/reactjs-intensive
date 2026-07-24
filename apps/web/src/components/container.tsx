import type { HTMLAttributes } from "react";

export function Container({
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`mx-auto w-full max-w-[1240px] px-4 md:px-8 ${className}`.trim()}
      {...props}
    />
  );
}
