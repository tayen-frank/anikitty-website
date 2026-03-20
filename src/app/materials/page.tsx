import type { Metadata } from "next";

import { MediaImage } from "@/components/media-image";
import { SectionHeading } from "@/components/section-heading";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Materials",
  description:
    "Explore Anikitty's catalog-based material story, including GBoard, recyclable paper construction, and service capabilities.",
  alternates: {
    canonical: "/materials",
  },
};

export const revalidate = 300;

export default async function MaterialsPage() {
  const content = await getContent();

  return (
    <section className="section page-offset">
      <div className="container stack-xl">
        <SectionHeading
          body="This page translates the material and manufacturing points surfaced in the catalog into a cleaner editorial format for the website."
          eyebrow="Materials & sustainability"
          title="A recycled-paper story built for real cat use"
        />

        <div className="split-layout align-start">
          <div>
            <div className="bullet-grid">
              {content.brandDigest.materialClaims.map((claim) => (
                <article className="bullet-card" key={claim}>
                  <p>{claim}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="editorial-frame">
            <MediaImage alt="Anikitty materials page from catalog" fill sizes="(max-width: 960px) 100vw, 42vw" src="/images/catalog/page-02.png" />
          </div>
        </div>

        <div className="service-grid service-grid-wide">
          {content.brandDigest.serviceModes.map((service) => (
            <article className="service-card" key={service.title}>
              <p className="eyebrow">Service</p>
              <h3>{service.title}</h3>
              <p>{service.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
