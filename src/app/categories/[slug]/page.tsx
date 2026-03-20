import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { MediaImage } from "@/components/media-image";
import { SectionHeading } from "@/components/section-heading";
import { ProductCard } from "@/components/shop/product-card";
import { getCategoryBySlug, getContent } from "@/lib/content";

type CategoryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const content = await getContent();
  return content.categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  return {
    title: category?.name || "Category",
    description: category?.description,
    alternates: {
      canonical: `/categories/${slug}`,
    },
  };
}

export const revalidate = 300;

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const content = await getContent();
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const categoryProducts = content.products.filter((product) => product.category_id === category.id);

  return (
    <section className="section page-offset">
      <div className="container stack-xl">
        <div className="editorial-hero">
          <div>
            <p className="eyebrow">{category.eyebrow}</p>
            <h1>{category.hero_title}</h1>
            <p className="hero-body">{category.hero_body}</p>
            <ul className="detail-list spacious-list">
              {category.feature_bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
            <div className="button-row">
              <Link className="button" href="/shop">
                View all products
              </Link>
              <Link className="button button-secondary" href="/contact">
                Ask about this category
              </Link>
            </div>
          </div>
          <div className="editorial-frame editorial-tall">
            <MediaImage alt={category.name} fill priority sizes="(max-width: 960px) 100vw, 48vw" src={category.image_url} />
          </div>
        </div>

        <SectionHeading
          body={category.description}
          eyebrow="Products"
          title={`${categoryProducts.length} products in this family`}
        />
        <div className="product-grid">
          {categoryProducts.map((product) => (
            <ProductCard category={category} key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}