import type { Metadata } from "next";

import { FaqList } from "@/components/faq-list";
import { SectionHeading } from "@/components/section-heading";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "FAQ / Support",
  description: "Support answers for Anikitty products, materials, purchasing, and wholesale requests.",
  alternates: {
    canonical: "/faq",
  },
};

export const revalidate = 300;

export default async function FaqPage() {
  const content = await getContent();

  return (
    <section className="section page-offset">
      <div className="container stack-lg narrow-stack">
        <SectionHeading
          align="center"
          body="A focused support page for common product, purchasing, and brand questions without adding blog or ecommerce complexity."
          eyebrow="FAQ / Support"
          title="Answers customers usually need before they buy"
        />
        <FaqList items={content.faqItems} />
      </div>
    </section>
  );
}
