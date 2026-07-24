const currencyFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

/** Format a numeric amount as Rupiah (Furniro design), e.g. 2500000 -> "Rp 2.500.000". */
export function formatCurrency(amount: number): string {
  // id-ID renders "Rp2.500.000"; add a space to match the Furniro design.
  return currencyFormatter.format(amount).replace(/^Rp\s?/, "Rp ");
}

/** Format an ISO date, e.g. "2026-07-01" -> "01 Jul 2026". */
export function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    return iso;
  }
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
