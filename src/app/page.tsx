import Link from "next/link";

import { FaqList } from "@/components/faq-list";
import { MediaImage } from "@/components/media-image";
import { SectionHeading } from "@/components/section-heading";
import { ProductCard } from "@/components/shop/product-card";
import { getContent, getFeaturedProducts } from "@/lib/content";

export const revalidate = 300;

export default async function HomePage() {
  const content = await getContent();
  const featuredProducts = await getFeaturedProducts();

  return (
    <>
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Premium cat furniture brand</p>
            <h1>{content.siteSettings.hero_title}</h1>
            <p className="hero-body">{content.siteSettings.hero_subtitle}</p>
            <div className="button-row">
              <Link className="button" href="/shop">
                {content.siteSettings.hero_cta_label}
              </Link>
              <Link className="button button-secondary" href="/materials">
                {content.siteSettings.hero_secondary_label}
              </Link>
            </div>
            <div className="hero-metrics">
              {content.brandDigest.stats.map((item) => (
                <div className="metric-card" key={item.label}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-media-panel">
            <div className="hero-media-frame">
              <MediaImage
                alt="Anikitty catalogue cover featuring premium cat furniture"
                fill
                priority
                sizes="(max-width: 960px) 100vw, 46vw"
                src={content.siteSettings.hero_image_url}
              />
            </div>
            <div className="hero-note-card">
              <p className="eyebrow">Catalog-led foundation</p>
              <p>
                This site structure is based on the attached 2024 company catalog. Missing retail details are
                intentionally marked as TODO items for clean later editing.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container stack-lg">
          {content.siteSettings.home_copy_blocks.map((block) => (
            <div className="story-card" key={block.title}>
              {block.kicker ? <p className="eyebrow">{block.kicker}</p> : null}
              <div>
                <h2>{block.title}</h2>
                <p>{block.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <SectionHeading
            body="The catalog maps the collection into clear furniture and scratcher families, making it easy to browse by behavior, room need, and aesthetic preference."
            eyebrow="Categories"
            title="Browse the product families"
          />
          <div className="category-grid">
            {content.categories.map((category) => (
              <article className="category-card" key={category.id}>
                <Link className="category-card-link" href={`/categories/${category.slug}`}>
                  <div className="category-image-frame">
                    <MediaImage alt={category.name} fill sizes="(max-width: 960px) 100vw, 33vw" src={category.image_url} />
                  </div>
                  <div className="category-card-body">
                    <p className="eyebrow">{category.eyebrow}</p>
                    <h3>{category.name}</h3>
                    <p>{category.description}</p>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            body="A curated set of catalog-based seed products. Product pages are live, while final pricing and marketplace destinations remain editable."
            eyebrow="Featured products"
            title="Start with the signature pieces"
          />
          <div className="product-grid">
            {featuredProducts.slice(0, 6).map((product) => (
              <ProductCard
                category={content.categories.find((category) => category.id === product.category_id)}
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container split-layout">
          <div>
            <SectionHeading
              body="The strongest material messages in the catalog are recyclability, lower-toxicity construction, water resistance, and performance-minded paper engineering."
              eyebrow="Materials & craftsmanship"
              title="GBoard, corrugated paper, and a cleaner material story"
            />
            <div className="bullet-grid">
              {content.brandDigest.materialClaims.map((claim) => (
                <article className="bullet-card" key={claim}>
                  <p>{claim}</p>
                </article>
              ))}
            </div>
            <Link className="button button-light" href="/materials">
              Explore materials
            </Link>
          </div>
          <div className="editorial-frame">
            <MediaImage alt="Anikitty materials and company catalog page" fill sizes="(max-width: 960px) 100vw, 42vw" src="/images/catalog/page-02.png" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            body="Until customer-submitted photography is available, the gallery uses catalog scenes as a visual preview of the brand's interior language."
            eyebrow="Gallery"
            title="A calm, home-friendly visual direction"
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

      <section className="section section-soft">
        <div className="container split-layout align-start">
          <div>
            <SectionHeading
              body="The catalog gives the brand clear credibility beyond aesthetics: long manufacturing experience, export history, and flexible OEM, ODM, and OBM support."
              eyebrow="Trust & service"
              title="Built for both retail shoppers and brand partners"
            />
            <div className="service-grid">
              {content.brandDigest.serviceModes.map((service) => (
                <article className="service-card" key={service.title}>
                  <h3>{service.title}</h3>
                  <p>{service.body}</p>
                </article>
              ))}
            </div>
          </div>
          <div>
            <SectionHeading
              body="A lightweight support section keeps the storefront helpful without introducing a blog, cart, or checkout complexity."
              eyebrow="FAQ preview"
              title="Answers before customers leave the page"
            />
            <FaqList items={content.faqItems.slice(0, 3)} />
            <div className="button-row">
              <Link className="button button-secondary" href="/faq">
                Read all FAQ items
              </Link>
              <Link className="button button-ghost" href="/contact">
                Contact support
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container cta-banner">
          <div>
            <p className="eyebrow">Final CTA</p>
            <h2>{content.siteSettings.final_cta_title}</h2>
            <p>{content.siteSettings.final_cta_body}</p>
          </div>
          <div className="button-row">
            <Link className="button" href="/shop">
              Browse products
            </Link>
            <a className="button button-secondary" href={`mailto:${content.siteSettings.contact_email}`}>
              Ask about wholesale
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
