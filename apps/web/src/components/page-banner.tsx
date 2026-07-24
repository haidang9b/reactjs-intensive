import { Link } from "react-router-dom";
import { Container } from "./container";

export type Crumb = { label: string; to?: string };

export function PageBanner({
  title,
  crumbs = [{ label: "Home", to: "/" }],
  image = "/images/home/home-08.png",
}: {
  title: string;
  crumbs?: Crumb[];
  image?: string;
}) {
  return (
    <section className="relative flex h-[280px] items-center justify-center overflow-hidden">
      <img
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-center"
        src={image}
      />
      <div className="absolute inset-0 bg-white/70" />

      <Container className="relative flex flex-col items-center gap-2 text-center">
        <img alt="" aria-hidden="true" className="mb-1 size-12" src="/images/logo.svg" />
        <h1 className="text-4xl font-semibold text-[#333333]">{title}</h1>
        <nav className="flex items-center gap-2 text-base">
          {crumbs.map((crumb, index) => (
            <span className="flex items-center gap-2" key={crumb.label}>
              {crumb.to ? (
                <Link className="font-medium text-[#333333]" to={crumb.to}>
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-[#333333]">{crumb.label}</span>
              )}
              {index < crumbs.length - 1 ? (
                <span className="font-semibold text-[#333333]">/</span>
              ) : null}
            </span>
          ))}
          <span className="font-semibold text-[#333333]">/</span>
          <span className="text-[#9f9f9f]">{title}</span>
        </nav>
      </Container>
    </section>
  );
}
