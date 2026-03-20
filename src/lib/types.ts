export type SocialLinks = Record<string, string>;

export type ProductImage = {
  id: string;
  image_url: string;
  alt_text: string;
  sort_order: number;
  is_placeholder?: boolean;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image_url: string;
  eyebrow: string;
  hero_title: string;
  hero_body: string;
  feature_bullets: string[];
};

export type Product = {
  id: string;
  sku: string;
  slug: string;
  name: string;
  category_id: string;
  short_description: string;
  full_description: string;
  displayed_price: string;
  external_link: string;
  featured: boolean;
  materials: string;
  dimensions: string;
  care_instructions: string;
  highlights: string[];
  tags: string[];
  notes: string[];
  product_images: ProductImage[];
  created_at?: string;
  updated_at?: string;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  sort_order: number;
};

export type AboutSection = {
  id: string;
  section_title: string;
  section_body: string;
  image_url: string;
  sort_order: number;
};

export type HomeCopyBlock = {
  title: string;
  body: string;
  kicker?: string;
};

export type SiteSettings = {
  id: string;
  brand_name: string;
  logo_url: string;
  hero_title: string;
  hero_subtitle: string;
  hero_image_url: string;
  contact_email: string;
  contact_phone: string;
  social_links: SocialLinks;
  featured_product_slugs: string[];
  home_copy_blocks: HomeCopyBlock[];
  contact_intro: string;
  contact_note: string;
  final_cta_title: string;
  final_cta_body: string;
  hero_cta_label: string;
  hero_secondary_label: string;
};

export type GalleryItem = {
  title: string;
  caption: string;
  image_url: string;
};

export type BrandDigest = {
  identitySummary: string;
  categorySummary: string[];
  philosophySummary: string[];
  materialClaims: string[];
  serviceModes: Array<{
    title: string;
    body: string;
  }>;
  stats: Array<{
    label: string;
    value: string;
  }>;
};

export type ContentBundle = {
  brandDigest: BrandDigest;
  siteSettings: SiteSettings;
  categories: Category[];
  products: Product[];
  faqItems: FaqItem[];
  aboutSections: AboutSection[];
  galleryItems: GalleryItem[];
};
