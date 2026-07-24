import type { ReactNode } from "react";
import { Container } from "./container";

const features: { icon: ReactNode; title: string; subtitle: string }[] = [
  {
    icon: <TrophyIcon />,
    title: "High Quality",
    subtitle: "crafted from top materials",
  },
  {
    icon: <GuaranteeIcon />,
    title: "Warranty Protection",
    subtitle: "Over 2 years",
  },
  {
    icon: <ShippingIcon />,
    title: "Free Shipping",
    subtitle: "Order over 150 $",
  },
  {
    icon: <SupportIcon />,
    title: "24 / 7 Support",
    subtitle: "Dedicated support",
  },
];

export function FeatureStrip() {
  return (
    <section className="bg-[#faf4ec]">
      <Container className="grid gap-8 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <div className="flex items-center gap-4" key={feature.title}>
            <span className="text-[#333333]">{feature.icon}</span>
            <div>
              <p className="text-xl font-semibold text-[#333333]">
                {feature.title}
              </p>
              <p className="text-sm text-[#898989]">{feature.subtitle}</p>
            </div>
          </div>
        ))}
      </Container>
    </section>
  );
}

function TrophyIcon() {
  return (
    <svg className="size-10" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
      <path d="M7 4h10v4a5 5 0 0 1-10 0V4Z" strokeLinejoin="round" />
      <path d="M7 5H4v2a3 3 0 0 0 3 3M17 5h3v2a3 3 0 0 1-3 3M9 20h6M12 13v4" strokeLinecap="round" />
    </svg>
  );
}

function GuaranteeIcon() {
  return (
    <svg className="size-10" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
      <path d="M12 3l7 3v5c0 4-3 7-7 8-4-1-7-4-7-8V6l7-3Z" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ShippingIcon() {
  return (
    <svg className="size-10" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
      <path d="M2 6h11v9H2zM13 9h4l3 3v3h-7z" strokeLinejoin="round" />
      <circle cx="6" cy="18" r="1.6" />
      <circle cx="17" cy="18" r="1.6" />
    </svg>
  );
}

function SupportIcon() {
  return (
    <svg className="size-10" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
      <path d="M4 13v-1a8 8 0 0 1 16 0v1" strokeLinecap="round" />
      <path d="M3 14a2 2 0 0 1 2-2h1v5H5a2 2 0 0 1-2-2zM21 14a2 2 0 0 0-2-2h-1v5h1a2 2 0 0 0 2-2z" strokeLinejoin="round" />
      <path d="M20 16v1a4 4 0 0 1-4 4h-2" strokeLinecap="round" />
    </svg>
  );
}
