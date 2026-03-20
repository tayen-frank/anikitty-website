import type { Metadata } from "next";

import { MediaImage } from "@/components/media-image";
import { SectionHeading } from "@/components/section-heading";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Catalog-based visual gallery for the Anikitty product line and home aesthetic direction.",
  alternates: {
    canonical: "/gallery",
  },
};

export const revalidate = 300;

export default async function GalleryPage() {
  const content = await getContent();

  return (
    <section className="section page-offset">
      <div className="container stack-lg">
        <SectionHeading
          align="center"
          body="An optional gallery section for catalog visuals now, with a clean path to replace them with customer or brand photography later."
          eyebrow="Gallery"
          title="Visual references for the collection"
        />
        <div className="gallery-grid">
          {content.galleryItems.map((item) => (
            <article className="gallery-card" key={item.title}>
              <div className="gallery-image-frame">
                <MediaImage alt={item.title} fill sizes="(max-width: 960px) 100vw, 50vw" src={item.image_url} />
              </div>
              <div className="gallery-card-body">
                <h3>{item.title}</h3>
                <p>{item.caption}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
