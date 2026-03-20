import { cache } from "react";

import { seedContent } from "@/data/site";
import { createPublicSupabaseClient, hasSupabaseEnv } from "@/lib/supabase";
import type {
  AboutSection,
  Category,
  ContentBundle,
  FaqItem,
  HomeCopyBlock,
  Product,
  ProductImage,
  SiteSettings,
} from "@/lib/types";

const sortByName = <T extends { name: string }>(items: T[]) =>
  [...items].sort((left, right) => left.name.localeCompare(right.name));

const sortByOrder = <T extends { sort_order: number }>(items: T[]) =>
  [...items].sort((left, right) => left.sort_order - right.sort_order);

export const getContent = cache(async (): Promise<ContentBundle> => {
  if (!hasSupabaseEnv) {
    return seedContent;
  }

  const supabase = createPublicSupabaseClient();
  if (!supabase) {
    return seedContent;
  }

  try {
    const [settingsRes, categoriesRes, productsRes, imagesRes, faqRes, aboutRes] =
      await Promise.all([
        supabase.from("site_settings").select("*").limit(1).maybeSingle(),
        supabase.from("categories").select("*").order("name"),
        supabase.from("products").select("*").order("name"),
        supabase.from("product_images").select("*").order("sort_order"),
        supabase.from("faq_items").select("*").order("sort_order"),
        supabase.from("about_content").select("*").order("sort_order"),
      ]);

    if (
      settingsRes.error ||
      categoriesRes.error ||
      productsRes.error ||
      imagesRes.error ||
      faqRes.error ||
      aboutRes.error ||
      !settingsRes.data ||
      !categoriesRes.data ||
      !productsRes.data ||
      !imagesRes.data ||
      !faqRes.data ||
      !aboutRes.data
    ) {
      return seedContent;
    }

    const imagesByProductId = imagesRes.data.reduce<Record<string, ProductImage[]>>(
      (accumulator, row) => {
        const key = row.product_id as string;
        accumulator[key] ??= [];
        accumulator[key].push({
          id: row.id as string,
          image_url: row.image_url as string,
          alt_text: (row.alt_text as string) || "Anikitty product image",
          sort_order: Number(row.sort_order || 0),
          is_placeholder: false,
        });
        return accumulator;
      },
      {},
    );

    const siteSettings: SiteSettings = {
      ...seedContent.siteSettings,
      ...(settingsRes.data as Partial<SiteSettings>),
      social_links:
        (settingsRes.data.social_links as SiteSettings["social_links"]) ||
        seedContent.siteSettings.social_links,
      featured_product_slugs:
        (settingsRes.data.featured_product_slugs as string[]) ||
        seedContent.siteSettings.featured_product_slugs,
      home_copy_blocks:
        (settingsRes.data.home_copy_blocks as HomeCopyBlock[]) ||
        seedContent.siteSettings.home_copy_blocks,
    };

    const categories = sortByName(categoriesRes.data as Category[]);
    const products = sortByName(productsRes.data as Product[]).map((entry) => ({
      ...entry,
      highlights: entry.highlights || [],
      tags: entry.tags || [],
      notes: entry.notes || [],
      product_images:
        imagesByProductId[entry.id] && imagesByProductId[entry.id].length > 0
          ? imagesByProductId[entry.id]
          : seedContent.products.find((product) => product.id === entry.id)?.product_images || [],
    }));

    return {
      brandDigest: seedContent.brandDigest,
      siteSettings,
      categories,
      products,
      faqItems: sortByOrder(faqRes.data as FaqItem[]),
      aboutSections: sortByOrder(aboutRes.data as AboutSection[]),
      galleryItems: seedContent.galleryItems,
    };
  } catch {
    return seedContent;
  }
});

export async function getFeaturedProducts() {
  const content = await getContent();
  const bySlug = new Map(content.products.map((product) => [product.slug, product]));

  const selected = content.siteSettings.featured_product_slugs
    .map((slug) => bySlug.get(slug))
    .filter((product): product is Product => Boolean(product));

  if (selected.length > 0) {
    return selected;
  }

  return content.products.filter((product) => product.featured).slice(0, 6);
}

export async function getCategoryBySlug(slug: string) {
  const content = await getContent();
  return content.categories.find((category) => category.slug === slug) || null;
}

export async function getProductBySlug(slug: string) {
  const content = await getContent();
  return content.products.find((product) => product.slug === slug) || null;
}
