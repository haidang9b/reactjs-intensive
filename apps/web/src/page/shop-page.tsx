import { useMemo, useState, type ReactNode } from "react";
import { Input } from "@react-workshop/ui/input";
import { Container } from "@/components/container";
import { PageBanner } from "@/components/page-banner";
import { EmptyState, ErrorState, LoadingState } from "@/components/page-state";
import { Pagination } from "@/components/pagination";
import { ProductGrid } from "@/features/products/components/product-grid";
import { useProducts } from "@/features/products/hooks/use-products";
import { useCategories } from "@/features/products/hooks/use-categories";
import {
  filterProducts,
  sortOptions,
  sortProducts,
  type SortKey,
} from "@/features/products/utils/filter-sort";
import { useDebounce } from "@/hooks/use-debounce";

type View = "grid" | "list";

export function ShopPage() {
  const productsQuery = useProducts();
  const categoriesQuery = useCategories();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState<SortKey>("default");
  const [pageSize, setPageSize] = useState(16);
  const [page, setPage] = useState(1);
  const [view, setView] = useState<View>("grid");
  const [showFilters, setShowFilters] = useState(false);
  const debouncedSearch = useDebounce(search, 300);

  const sorted = useMemo(() => {
    const products = productsQuery.data ?? [];
    return sortProducts(
      filterProducts(products, { search: debouncedSearch, category }),
      sort,
    );
  }, [productsQuery.data, debouncedSearch, category, sort]);

  const total = sorted.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * pageSize;
  const pageItems = sorted.slice(start, start + pageSize);
  const showingStart = total === 0 ? 0 : start + 1;
  const showingEnd = Math.min(start + pageSize, total);

  function resetTo(update: () => void) {
    update();
    setPage(1);
  }

  return (
    <>
      <PageBanner title="Shop" />

      {/* Toolbar */}
      <div className="bg-[#f9f1e7]">
        <Container className="flex flex-col gap-4 py-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-5">
            <button
              className="flex items-center gap-2 text-base font-medium text-[#333333]"
              onClick={() => setShowFilters((value) => !value)}
              type="button"
            >
              <FilterIcon />
              Filter
            </button>
            <div className="flex items-center gap-3">
              <ViewButton
                active={view === "grid"}
                label="Grid view"
                onClick={() => setView("grid")}
              >
                <GridIcon />
              </ViewButton>
              <ViewButton
                active={view === "list"}
                label="List view"
                onClick={() => setView("list")}
              >
                <ListIcon />
              </ViewButton>
            </div>
            <span className="hidden h-8 w-px bg-[#9f9f9f] md:block" />
            <p className="text-sm text-[#333333]">
              Showing {showingStart}&ndash;{showingEnd} of {total} results
            </p>
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm text-[#333333]">
              Show
              <select
                className="h-10 w-16 bg-white px-2 text-center text-sm text-[#9f9f9f]"
                onChange={(event) =>
                  resetTo(() => setPageSize(Number(event.target.value)))
                }
                value={pageSize}
              >
                {[8, 16, 32].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex items-center gap-2 text-sm text-[#333333]">
              Sort by
              <select
                className="h-10 w-40 bg-white px-3 text-sm text-[#9f9f9f]"
                onChange={(event) =>
                  resetTo(() => setSort(event.target.value as SortKey))
                }
                value={sort}
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </Container>

        {showFilters ? (
          <Container className="flex flex-col gap-4 pb-6 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2">
              <CategoryChip
                active={category === "all"}
                label="All"
                onClick={() => resetTo(() => setCategory("all"))}
              />
              {(categoriesQuery.data ?? []).map((item) => (
                <CategoryChip
                  active={category === item.slug}
                  key={item.id}
                  label={item.name}
                  onClick={() => resetTo(() => setCategory(item.slug))}
                />
              ))}
            </div>
            <div className="w-full md:w-72">
              <Input
                aria-label="Search products"
                onChange={(event) =>
                  resetTo(() => setSearch(event.target.value))
                }
                placeholder="Search products..."
                type="search"
                value={search}
              />
            </div>
          </Container>
        ) : null}
      </div>

      <Container className="py-14">
        {productsQuery.isLoading ? <LoadingState /> : null}
        {productsQuery.isError ? (
          <ErrorState
            error={productsQuery.error}
            onRetry={() => productsQuery.refetch()}
          />
        ) : null}
        {productsQuery.isSuccess && total === 0 ? (
          <EmptyState
            description="Try a different search term or category."
            title="No products found"
          />
        ) : null}

        {pageItems.length > 0 ? (
          <ProductGrid columns={view === "list" ? 1 : 4} products={pageItems} />
        ) : null}

        <Pagination
          current={currentPage}
          onChange={setPage}
          totalPages={totalPages}
        />
      </Container>
    </>
  );
}

function ViewButton({
  active,
  label,
  onClick,
  children,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      aria-label={label}
      aria-pressed={active}
      className={active ? "text-[#b88e2f]" : "text-[#333333]"}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

function CategoryChip({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
        active
          ? "bg-[#b88e2f] text-white"
          : "bg-white text-[#333333] hover:bg-[#efe7d5]"
      }`}
      onClick={onClick}
      type="button"
    >
      {label}
    </button>
  );
}

function FilterIcon() {
  return (
    <svg className="size-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path d="M3 5h18M6 12h12M10 19h4" strokeLinecap="round" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
      <rect height="8" rx="1" width="8" x="3" y="3" />
      <rect height="8" rx="1" width="8" x="13" y="3" />
      <rect height="8" rx="1" width="8" x="3" y="13" />
      <rect height="8" rx="1" width="8" x="13" y="13" />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg className="size-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
    </svg>
  );
}
