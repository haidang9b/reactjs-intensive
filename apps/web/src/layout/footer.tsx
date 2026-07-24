import { Link } from "react-router-dom";
import { Container } from "@/components/container";
import { FooterNewsletter } from "@/components/footer-newsletter";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-[#f0f0f0] bg-white pt-12">
      <Container className="grid gap-10 pb-10 md:grid-cols-[2fr_1fr_1fr_1.4fr]">
        <div className="grid content-start gap-6">
          <span className="flex items-center gap-2 text-2xl font-bold text-[#333333]">
            <img alt="" aria-hidden="true" className="size-7" src="/images/logo.svg" />
            Furniro
          </span>
          <p className="max-w-xs text-sm text-[#9f9f9f]">
            400 University Drive Suite 200 Coral Gables, FL 33134 USA
          </p>
        </div>

        <FooterColumn
          title="Links"
          links={[
            { label: "Home", to: "/" },
            { label: "Shop", to: "/shop" },
            { label: "Blog", to: "/blog" },
            { label: "About", to: "/about" },
            { label: "Contact", to: "/contact" },
          ]}
        />

        <FooterColumn
          title="Help"
          links={[
            { label: "Payment Options", to: "/contact" },
            { label: "Returns", to: "/contact" },
            { label: "Privacy Policies", to: "/contact" },
          ]}
        />

        <div className="grid content-start gap-6">
          <span className="text-sm font-medium text-[#9f9f9f]">Newsletter</span>
          <FooterNewsletter />
        </div>
      </Container>

      <div className="border-t border-[#f0f0f0]">
        <Container className="py-6">
          <p className="text-sm text-[#333333]">
            2023 Furniro. All rights reserved.
          </p>
        </Container>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; to: string }[];
}) {
  return (
    <div className="grid content-start gap-4">
      <span className="text-sm font-medium text-[#9f9f9f]">{title}</span>
      <ul className="grid gap-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              className="text-sm font-medium text-[#333333] hover:text-[#b88e2f]"
              to={link.to}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
