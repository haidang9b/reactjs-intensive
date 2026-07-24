export function Rating({
  value,
  count,
}: {
  value: number;
  count?: number;
}) {
  const stars = [1, 2, 3, 4, 5];
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5" aria-label={`Rated ${value} of 5`}>
        {stars.map((star) => (
          <span
            className={star <= Math.round(value) ? "text-[#ffc700]" : "text-[#d8d8d8]"}
            key={star}
          >
            ★
          </span>
        ))}
      </div>
      {typeof count === "number" ? (
        <span className="text-sm text-[#898989]">{count} reviews</span>
      ) : null}
    </div>
  );
}
