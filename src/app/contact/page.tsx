import type { Metadata } from "next";

import { SectionHeading } from "@/components/section-heading";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Anikitty for product questions, wholesale inquiries, and OEM or ODM discussions.",
  alternates: {
    canonical: "/contact",
  },
};

export const revalidate = 300;

export default async function ContactPage() {
  const content = await getContent();

  return (
    <section className="section page-offset">
      <div className="container stack-xl">
        <SectionHeading
          body={content.siteSettings.contact_intro}
          eyebrow="Contact"
          title="Talk to the Anikitty team"
        />

        <div className="contact-grid">
          <article className="detail-card">
            <h2>Email</h2>
            <p>For product inquiries, wholesale requests, and launch coordination.</p>
            <a className="button button-secondary" href={`mailto:${content.siteSettings.contact_email}`}>
              {content.siteSettings.contact_email}
            </a>
          </article>
          <article className="detail-card">
            <h2>Phone</h2>
            <p>Use the company line for direct support and partnership conversations.</p>
            <a className="button button-secondary" href={`tel:${content.siteSettings.contact_phone}`}>
              {content.siteSettings.contact_phone}
            </a>
          </article>
          <article className="detail-card">
            <h2>Websites</h2>
            <p>Current brand and company references from the catalog.</p>
            <div className="footer-links compact-links">
              {Object.entries(content.siteSettings.social_links).map(([key, value]) => (
                <a href={value} key={key} rel="noreferrer" target="_blank">
                  {key}
                </a>
              ))}
            </div>
          </article>
        </div>

        <article className="notice-card">
          <h2>Launch placeholders</h2>
          <p>{content.siteSettings.contact_note}</p>
        </article>
      </div>
    </section>
  );
}
