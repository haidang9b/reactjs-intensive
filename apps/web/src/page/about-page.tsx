import { useNavigate } from "react-router-dom";
import { Button } from "@react-workshop/ui/button";
import { Container } from "@/components/container";
import { PageBanner } from "@/components/page-banner";
import { asset } from "@/utils/asset";

const stats = [
  { value: "12k+", label: "Happy customers" },
  { value: "500+", label: "Unique products" },
  { value: "25+", label: "Years of craft" },
  { value: "40+", label: "Global partners" },
];

export function AboutPage() {
  const navigate = useNavigate();

  return (
    <>
      <PageBanner title="About" />

      <Container className="py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold text-[#333333]">
            Designed for Modern Living
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#9f9f9f]">
            Furniro brings together timeless craftsmanship and contemporary design.
            We believe great furniture should be comfortable, durable, and beautiful
            — pieces that make a house feel like home.
          </p>
        </div>

        {/* Story */}
        <div className="mt-16 grid items-center gap-10 lg:grid-cols-2">
          <div className="overflow-hidden rounded-[10px] bg-[#f9f1e7]">
            <img
              alt="Furniro living room"
              className="h-full w-full object-cover"
              src={asset("/images/home/home-07.jpg")}
            />
          </div>
          <div className="grid content-start gap-5">
            <h3 className="text-3xl font-semibold text-[#333333]">Our Story</h3>
            <p className="text-sm leading-7 text-[#9f9f9f]">
              What started as a small workshop has grown into a studio obsessed with
              detail. Every piece is designed to balance form and function — using
              premium materials, honest construction, and finishes built to last.
            </p>
            <p className="text-sm leading-7 text-[#9f9f9f]">
              From the first sketch to the final stitch, our team crafts furniture
              that fits real life. We keep our range focused so every product earns
              its place in your home.
            </p>
            <Button
              className="mt-2 justify-self-start"
              onClick={() => navigate("/shop")}
              size="lg"
            >
              Explore the collection
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 grid gap-8 rounded-[10px] bg-[#faf4ec] px-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div className="text-center" key={stat.label}>
              <p className="text-4xl font-bold text-[#b88e2f]">{stat.value}</p>
              <p className="mt-2 text-sm text-[#9f9f9f]">{stat.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}
