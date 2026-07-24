export function Pagination({
  current,
  totalPages,
  onChange,
}: {
  current: number;
  totalPages: number;
  onChange: (page: number) => void;
}) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="mt-14 flex items-center justify-center gap-3">
      {pages.map((page) => (
        <button
          aria-current={page === current ? "page" : undefined}
          className={`flex size-12 items-center justify-center rounded-lg text-base font-medium transition-colors ${
            page === current
              ? "bg-[#b88e2f] text-white"
              : "bg-[#f9f1e7] text-[#333333] hover:bg-[#efe7d5]"
          }`}
          key={page}
          onClick={() => onChange(page)}
          type="button"
        >
          {page}
        </button>
      ))}
      <button
        className="flex h-12 items-center justify-center rounded-lg bg-[#f9f1e7] px-6 text-base font-medium text-[#333333] transition-colors hover:bg-[#efe7d5] disabled:opacity-40"
        disabled={current >= totalPages}
        onClick={() => onChange(Math.min(totalPages, current + 1))}
        type="button"
      >
        Next
      </button>
    </div>
  );
}
