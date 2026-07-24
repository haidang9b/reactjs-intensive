import { Link, useNavigate } from "react-router-dom";
import { Button } from "@react-workshop/ui/button";
import { Container } from "@/components/container";
import { EmptyState, ErrorState, LoadingState } from "@/components/page-state";
import { ProductGrid } from "@/features/products/components/product-grid";
import { useProducts } from "@/features/products/hooks/use-products";
import { asset } from "@/utils/asset";

const ranges = [
  { label: "Dining", image: "/images/home/home-12.png" },
  { label: "Living", image: "/images/home/home-03.png" },
  { label: "Bedroom", image: "/images/home/home-04.png" },
];

const gallery = [
  "/images/home/home-05.png",
  "/images/home/home-06.jpg",
  "/images/home/home-07.jpg",
  "/images/home/home-08.png",
  "/images/home/home-09.png",
  "/images/home/home-10.png",
  "/images/home/home-11.png",
  "/images/home/home-02.png",
];

export function HomePage() {
  const navigate = useNavigate();
  const productsQuery = useProducts();
  const featured = productsQuery.data?.slice(0, 8) ?? [];

  return (
    <>
      <HeroSection onShop={() => navigate("/shop")} />
      <BrowseTheRange />

      <Container className="py-16">
        <h2 className="mb-10 text-center text-3xl font-bold text-[#333333]">
          Our Products
        </h2>

        {productsQuery.isLoading ? <LoadingState /> : null}
        {productsQuery.isError ? (
          <ErrorState
            error={productsQuery.error}
            onRetry={() => productsQuery.refetch()}
          />
        ) : null}
        {productsQuery.isSuccess && featured.length === 0 ? (
          <EmptyState title="No products available" />
        ) : null}
        {featured.length > 0 ? <ProductGrid products={featured} /> : null}

        <div className="mt-12 text-center">
          <Button onClick={() => navigate("/shop")} size="lg" variant="secondary">
            Show More
          </Button>
        </div>
      </Container>

      <RoomsInspiration onExplore={() => navigate("/shop")} />
      <FuniroGallery />
    </>
  );
}

function HeroSection({ onShop }: { onShop: () => void }) {
  return (
    <section className="relative">
      <div className="h-[420px] w-full md:h-[600px]">
        <img
          alt="Featured living room"
          className="h-full w-full object-cover"
          src={asset("/images/home/home-01.png")}
        />
      </div>
      <Container className="relative md:absolute md:inset-x-0 md:top-1/2 md:-translate-y-1/2">
        <div className="-mt-16 ml-auto w-full bg-[#fff3e3] p-8 md:mt-0 md:w-[440px] md:p-10">
          <p className="text-base font-semibold tracking-[0.02em] text-[#333333]">
            New Arrival
          </p>
          <h1 className="mt-2 text-4xl font-bold leading-tight text-[#b88e2f] md:text-5xl">
            Discover Our New Collection
          </h1>
          <p className="mt-4 text-base leading-6 text-[#333333]">
            Furniture that blends comfort and timeless design for every room in
            your home.
          </p>
          <Button className="mt-8" onClick={onShop} size="lg">
            BUY NOW
          </Button>
        </div>
      </Container>
    </section>
  );
}

function BrowseTheRange() {
  return (
    <section className="py-16">
      <Container>
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-[#333333]">Browse The Range</h2>
          <p className="mt-2 text-[#666666]">
            Explore our curated collections for every space.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {ranges.map((range) => (
            <Link
              className="group grid gap-6 text-center"
              key={range.label}
              to="/shop"
            >
              <div className="overflow-hidden rounded-[10px]">
                <img
                  alt={range.label}
                  className="aspect-[3/4] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  src={asset(range.image)}
                />
              </div>
              <span className="text-xl font-semibold text-[#333333]">
                {range.label}
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

function RoomsInspiration({ onExplore }: { onExplore: () => void }) {
  return (
    <section className="bg-[#fcf8f3] py-16">
      <Container className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <h2 className="text-4xl font-bold leading-tight text-[#333333]">
            50+ Beautiful rooms inspiration
          </h2>
          <p className="mt-4 max-w-sm text-[#616161]">
            Our designers already made a lot of beautiful prototypes of rooms
            that will inspire you.
          </p>
          <Button className="mt-8" onClick={onExplore} size="lg">
            Explore More
          </Button>
        </div>
        <div className="flex items-stretch gap-6 overflow-hidden">
          <div className="relative min-w-[340px] flex-1">
            <img
              alt="Inner peace bedroom"
              className="h-[480px] w-full object-cover"
              src={asset("/images/home/home-08.png")}
            />
            <div className="absolute bottom-6 left-6 bg-white/85 px-8 py-6 backdrop-blur-sm">
              <p className="text-sm text-[#616161]">
                01 <span className="mx-2">—</span> Bed Room
              </p>
              <p className="text-2xl font-semibold text-[#333333]">Inner Peace</p>
            </div>
          </div>
          <img
            alt="Room inspiration"
            className="hidden h-[480px] w-[240px] object-cover sm:block"
            src={asset("/images/home/home-05.png")}
          />
        </div>
      </Container>
    </section>
  );
}

function FuniroGallery() {
  return (
    <section className="py-16">
      <div className="mb-8 text-center">
        <p className="text-base font-semibold text-[#616161]">
          Share your setup with
        </p>
        <h2 className="text-3xl font-bold text-[#333333]">#FuniroFurniture</h2>
      </div>
      <div className="grid grid-cols-2 gap-4 px-4 sm:grid-cols-4">
        {gallery.map((src, index) => (
          <div
            className={`overflow-hidden rounded-[10px] ${
              index % 3 === 0 ? "row-span-2" : ""
            }`}
            key={src}
          >
            <img
              alt="Furniro community setup"
              className="h-full w-full object-cover"
              loading="lazy"
              src={asset(src)}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
