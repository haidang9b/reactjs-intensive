import { Suspense } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { FeatureStrip } from "@/components/feature-strip";
import { LoadingState } from "@/components/page-state";
import { Footer } from "./footer";
import { Header } from "./header";

export function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1">
        <Suspense fallback={<LoadingState />}>
          <Outlet />
        </Suspense>
      </main>
      <FeatureStrip />
      <Footer />
      <ScrollRestoration />
    </div>
  );
}
