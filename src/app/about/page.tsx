import type { Metadata } from "next";

import { MediaImage } from "@/components/media-image";
import { SectionHeading } from "@/components/section-heading";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Anikitty, the Taiwan-based cat furniture brand backed by Ta Yen Paper Box Container Co., Ltd.",
  alternates: {
    canonical: "/about",
  },
};

export const revalidate = 300;

export default async function AboutPage() {
  const content = await getContent();

  return (
    <section className="section page-offset">
      <div className="container stack-xl">
        <SectionHeading
          body={content.brandDigest.identitySummary}
          eyebrow="About the brand"
          title="A material-led cat furniture story from Taiwan"
        />

        {content.aboutSections.map((section, index) => (
          <div className={`split-layout ${index % 2 === 1 ? "split-layout-reverse" : ""}`} key={section.id}>
            <div>
              <p className="eyebrow">Section {String(index + 1).padStart(2, "0")}</p>
              <h2>{section.section_title}</h2>
              <p>{section.section_body}</p>
            </div>
            <div className="editorial-frame">
              <MediaImage alt={section.section_title} fill sizes="(max-width: 960px) 100vw, 42vw" src={section.image_url} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
