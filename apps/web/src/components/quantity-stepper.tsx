export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  size = "md",
}: {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  size?: "md" | "lg";
}) {
  const clamp = (next: number) => Math.min(max, Math.max(min, next));
  const cell = size === "lg" ? "size-14" : "size-10";
  const valueWidth = size === "lg" ? "w-14" : "w-10";

  return (
    <div className="inline-flex items-center rounded-[10px] border border-[#9f9f9f]">
      <button
        aria-label="Decrease quantity"
        className={`flex ${cell} items-center justify-center text-lg text-[#333333] disabled:opacity-40`}
        disabled={value <= min}
        onClick={() => onChange(clamp(value - 1))}
        type="button"
      >
        −
      </button>
      <span className={`${valueWidth} text-center text-sm font-medium text-[#333333]`}>
        {value}
      </span>
      <button
        aria-label="Increase quantity"
        className={`flex ${cell} items-center justify-center text-lg text-[#333333] disabled:opacity-40`}
        disabled={value >= max}
        onClick={() => onChange(clamp(value + 1))}
        type="button"
      >
        +
      </button>
    </div>
  );
}
