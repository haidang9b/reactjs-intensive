// Circular corner badge for products (New = teal, Sale/discount = red).
export function ProductBadge({
  label,
  discount,
  className = "",
}: {
  label: string;
  discount?: number;
  className?: string;
}) {
  if (!label) {
    return null;
  }
  const isNew = label.toLowerCase() === "new";
  const text = label.toLowerCase() === "sale" && discount ? `-${discount}%` : label;

  return (
    <span
      className={`flex items-center justify-center rounded-full font-medium text-white ${
        isNew ? "bg-[#2ec1ac]" : "bg-[#e97171]"
      } ${className}`}
    >
      {text}
    </span>
  );
}
