import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { FaqList } from "@/components/faq-list";
import { MediaImage } from "@/components/media-image";
import { ProductCard } from "@/components/shop/product-card";
import { getContent, getProductBySlug } from "@/lib/content";
import { absoluteUrl, isTodoValue, purchaseLabel } from "@/lib/utils";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const content = await getContent();
  return content.products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product not found",
    };
  }

  const leadImage = product.product_images[0]?.image_url || "/images/catalog/page-01.png";

  return {
    title: product.name,
    description: product.short_description,
    alternates: {
      canonical: `/shop/${product.slug}`,
    },
    openGraph: {
      title: `${product.name} | Anikitty`,
      description: product.short_description,
      url: absoluteUrl(`/shop/${product.slug}`),
      images: [
        {
          url: absoluteUrl(leadImage),
          alt: product.name,
        },
      ],
    },
  };
}

export const revalidate = 300;

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const content = await getContent();
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const category = content.categories.find((item) => item.id === product.category_id);
  const relatedProducts = content.products
    .filter((item) => item.category_id === product.category_id && item.id !== product.id)
    .slice(0, 3);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.short_description,
    sku: product.sku,
    brand: {
      "@type": "Brand",
      name: content.siteSettings.brand_name,
    },
    image: product.product_images.map((image) => absoluteUrl(image.image_url)),
    url: absoluteUrl(`/shop/${product.slug}`),
  };

  return (
    <section className="section page-offset">
      <div className="container stack-xl">
        <script
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(productJsonLd),
          }}
          type="application/ld+json"
        />

        <div className="product-hero-grid">
          <div className="product-gallery-grid">
            {product.product_images.slice(0, 3).map((image, index) => (
              <div className={index === 0 ? "product-gallery-primary" : "product-gallery-secondary"} key={image.id}>
                <MediaImage
                  alt={image.alt_text}
                  fill
                  priority={index === 0}
                  sizes={index === 0 ? "(max-width: 960px) 100vw, 56vw" : "(max-width: 960px) 50vw, 28vw"}
                  src={image.image_url}
                />
              </div>
            ))}
          </div>

          <div className="product-detail-panel">
            {category ? <p className="eyebrow">{category.name}</p> : null}
            <h1>{product.name}</h1>
            <p className="product-lead">{product.full_description}</p>
            <div className="meta-chip-row">
              <span className="tag">{product.sku}</span>
              {isTodoValue(product.displayed_price) ? <span className="tag">Pricing TODO</span> : null}
              {product.product_images.some((image) => image.is_placeholder) ? <span className="tag">Image TODO</span> : null}
            </div>
            <div className="price-panel">
              <strong>{product.displayed_price}</strong>
              <p>Final purchase happens on an external platform. This site does not include a cart or checkout.</p>
            </div>
            <div className="button-row">
              <a className="button" href={product.external_link} rel="noreferrer" target="_blank">
                {purchaseLabel(product.external_link)}
              </a>
              <Link className="button button-secondary" href="/contact">
                Contact the team
              </Link>
            </div>
          </div>
        </div>

        <div className="spec-grid">
          <article className="detail-card">
            <h2>Highlights</h2>
            <ul className="detail-list">
              {product.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="detail-card">
            <h2>Materials</h2>
            <p>{product.materials}</p>
          </article>
          <article className="detail-card">
            <h2>Dimensions</h2>
            <p>{product.dimensions}</p>
          </article>
          <article className="detail-card">
            <h2>Care instructions</h2>
            <p>{product.care_instructions}</p>
          </article>
        </div>

        <div className="split-layout align-start">
          <div>
            <h2>Catalog notes</h2>
            <div className="bullet-grid compact-grid">
              {product.notes.map((note) => (
                <article className="bullet-card" key={note}>
                  <p>{note}</p>
                </article>
              ))}
            </div>
          </div>
          <div>
            <h2>FAQ</h2>
            <FaqList items={content.faqItems.slice(0, 3)} />
          </div>
        </div>

        {relatedProducts.length > 0 ? (
          <div>
            <h2>Related products</h2>
            <div className="product-grid compact-product-grid">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard category={category} key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}