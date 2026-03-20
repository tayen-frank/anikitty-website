import type { Metadata } from "next";

import { SectionHeading } from "@/components/section-heading";
import { ShopGrid } from "@/components/shop/shop-grid";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Browse Anikitty cat furniture, scratchers, floating pieces, and climbing furniture. External purchase only.",
  alternates: {
    canonical: "/shop",
  },
};

export const revalidate = 300;

export default async function ShopPage() {
  const content = await getContent();

  return (
    <section className="section page-offset">
      <div className="container stack-lg">
        <SectionHeading
          align="center"
          body="Filter by product family, compare dimensions, and send shoppers to external buying links instead of an on-site cart."
          eyebrow="Shop"
          title="Discover the current collection"
        />
        <ShopGrid categories={content.categories} products={content.products} />
      </div>
    </section>
  );
}
