"use client";

import { useCallback, useEffect, useState } from "react";

import { seedContent } from "@/data/site";
import { createBrowserSupabaseClient, getStorageBucket, hasSupabaseEnv } from "@/lib/supabase";
import type { AboutSection, Category, FaqItem, Product, ProductImage, SiteSettings } from "@/lib/types";

import { AdminLoginForm } from "./admin-login-form";

function splitLines(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function joinLines(items: string[]) {
  return items.join("\n");
}

const createProduct = (): Product => ({
  id: crypto.randomUUID(),
  sku: "TODO-SKU",
  slug: "todo-slug",
  name: "New product",
  category_id: seedContent.categories[0]?.id || "",
  short_description: "TODO: Add short description",
  full_description: "TODO: Add full description",
  displayed_price: "TODO: Add retail price",
  external_link: "mailto:sales@tayen.com.tw",
  featured: false,
  materials: "TODO: Add materials",
  dimensions: "TODO: Add dimensions",
  care_instructions: "TODO: Add care instructions",
  highlights: ["TODO: Add highlight"],
  tags: ["TODO"],
  notes: ["TODO: Add note"],
  product_images: [],
});

export function DashboardApp() {
  const [supabase] = useState(() => createBrowserSupabaseClient());
  const [sessionChecked, setSessionChecked] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);

  const [settings, setSettings] = useState<SiteSettings>(seedContent.siteSettings);
  const [categories, setCategories] = useState<Category[]>(seedContent.categories);
  const [products, setProducts] = useState<Product[]>(seedContent.products);
  const [faqItems, setFaqItems] = useState<FaqItem[]>(seedContent.faqItems);
  const [aboutSections, setAboutSections] = useState<AboutSection[]>(seedContent.aboutSections);

  const loadDashboard = useCallback(async () => {
    if (!supabase) return;

    setLoading(true);
    setError(null);

    const [settingsRes, categoriesRes, productsRes, imagesRes, faqRes, aboutRes] = await Promise.all([
      supabase.from("site_settings").select("*").limit(1).maybeSingle(),
      supabase.from("categories").select("*").order("name"),
      supabase.from("products").select("*").order("name"),
      supabase.from("product_images").select("*").order("sort_order"),
      supabase.from("faq_items").select("*").order("sort_order"),
      supabase.from("about_content").select("*").order("sort_order"),
    ]);

    setLoading(false);

    const firstError =
      settingsRes.error || categoriesRes.error || productsRes.error || imagesRes.error || faqRes.error || aboutRes.error;

    if (firstError) {
      setError(firstError.message);
      return;
    }

    const imageMap = new Map<string, ProductImage[]>();
    for (const row of imagesRes.data || []) {
      const key = row.product_id as string;
      const existing = imageMap.get(key) || [];
      existing.push({
        id: row.id as string,
        image_url: row.image_url as string,
        alt_text: (row.alt_text as string) || "Anikitty product image",
        sort_order: Number(row.sort_order || 0),
      });
      imageMap.set(key, existing);
    }

    if (settingsRes.data) {
      setSettings({
        ...seedContent.siteSettings,
        ...(settingsRes.data as Partial<SiteSettings>),
        social_links: settingsRes.data.social_links || seedContent.siteSettings.social_links,
        featured_product_slugs:
          settingsRes.data.featured_product_slugs || seedContent.siteSettings.featured_product_slugs,
        home_copy_blocks:
          settingsRes.data.home_copy_blocks || seedContent.siteSettings.home_copy_blocks,
      });
    }

    setCategories((categoriesRes.data as Category[]) || []);
    setProducts(
      ((productsRes.data as Product[]) || []).map((product) => ({
        ...product,
        highlights: product.highlights || [],
        tags: product.tags || [],
        notes: product.notes || [],
        product_images: imageMap.get(product.id) || [],
      })),
    );
    setFaqItems((faqRes.data as FaqItem[]) || []);
    setAboutSections((aboutRes.data as AboutSection[]) || []);
    setStatus("Dashboard synced with Supabase.");
  }, [supabase]);
  useEffect(() => {
    if (!supabase) {
      setSessionChecked(true);
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      setIsAuthed(Boolean(data.session));
      setSessionChecked(true);
      if (data.session) {
        void loadDashboard();
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthed(Boolean(session));
      setSessionChecked(true);
      if (session) {
        void loadDashboard();
      }
    });

    return () => listener.subscription.unsubscribe();
  }, [loadDashboard, supabase]);

  async function uploadAsset(file: File, folder: string) {
    if (!supabase) throw new Error("Supabase is not configured.");
    const bucket = getStorageBucket();
    const path = `${folder}/${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
    const { error: uploadError } = await supabase.storage.from(bucket).upload(path, file, { upsert: true });
    if (uploadError) throw uploadError;
    return supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl;
  }

  async function saveSettings() {
    if (!supabase) return;
    setStatus("Saving settings...");
    const { error: saveError } = await supabase.from("site_settings").upsert(settings);
    if (saveError) {
      setError(saveError.message);
      setStatus(null);
      return;
    }
    setStatus("Settings saved.");
  }

  async function saveSimple(table: "categories" | "faq_items" | "about_content", payload: Category | FaqItem | AboutSection, label: string) {
    if (!supabase) return;
    const { error: saveError } = await supabase.from(table).upsert(payload as never);
    if (saveError) {
      setError(saveError.message);
      return;
    }
    setStatus(`Saved ${label}.`);
  }

  async function deleteSimple(table: "categories" | "faq_items" | "about_content", id: string, setter: () => void) {
    if (!supabase) return;
    const { error: deleteError } = await supabase.from(table).delete().eq("id", id);
    if (deleteError) {
      setError(deleteError.message);
      return;
    }
    setter();
  }

  async function saveProduct(product: Product) {
    if (!supabase) return;
    const { product_images, ...row } = product;
    const { error: productError } = await supabase.from("products").upsert(row);
    if (productError) {
      setError(productError.message);
      return;
    }
    await supabase.from("product_images").delete().eq("product_id", product.id);
    if (product_images.length > 0) {
      const { error: imageError } = await supabase.from("product_images").insert(
        product_images.map((image, index) => ({
          id: image.id || crypto.randomUUID(),
          product_id: product.id,
          image_url: image.image_url,
          alt_text: image.alt_text,
          sort_order: index,
        })),
      );
      if (imageError) {
        setError(imageError.message);
        return;
      }
    }
    setStatus(`Saved ${product.name}.`);
  }

  async function deleteProduct(id: string) {
    if (!supabase || !window.confirm("Delete this product and its image rows?")) return;
    await supabase.from("product_images").delete().eq("product_id", id);
    const { error: deleteError } = await supabase.from("products").delete().eq("id", id);
    if (deleteError) {
      setError(deleteError.message);
      return;
    }
    setProducts((current) => current.filter((item) => item.id !== id));
  }

  async function signOut() {
    if (!supabase) return;
    await supabase.auth.signOut();
    setIsAuthed(false);
  }

  function patchProduct(id: string, patch: Partial<Product>) {
    setProducts((current) => current.map((product) => (product.id === id ? { ...product, ...patch } : product)));
  }

  function patchProductImage(productId: string, imageIndex: number, key: keyof ProductImage, value: string) {
    setProducts((current) =>
      current.map((product) =>
        product.id === productId
          ? {
              ...product,
              product_images: product.product_images.map((image, index) =>
                index === imageIndex ? { ...image, [key]: value } : image,
              ),
            }
          : product,
      ),
    );
  }

  async function handleUpload(key: string, folder: string, onComplete: (url: string) => void, file?: File) {
    if (!file) return;
    try {
      setUploadingKey(key);
      const url = await uploadAsset(file, folder);
      onComplete(url);
      setStatus("Upload complete.");
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Upload failed.");
    } finally {
      setUploadingKey(null);
    }
  }

  if (!hasSupabaseEnv || !supabase) {
    return (
      <div className="admin-auth-card">
        <p className="eyebrow">Admin setup</p>
        <h1>Supabase connection needed</h1>
        <p>
          The storefront already works with local seed content. Add the Supabase environment variables from
          `.env.example` and run `supabase/schema.sql` to enable the live admin.
        </p>
      </div>
    );
  }

  if (!sessionChecked || loading) {
    return <div className="admin-auth-card"><p>Loading admin...</p></div>;
  }

  if (!isAuthed) {
    return <AdminLoginForm />;
  }

  return (
    <div className="admin-layout">
      <div className="admin-toolbar">
        <div>
          <p className="eyebrow">Dashboard</p>
          <h1>Content management</h1>
        </div>
        <div className="button-row">
          <button className="button button-secondary" onClick={() => void loadDashboard()} type="button">Refresh</button>
          <button className="button" onClick={() => void signOut()} type="button">Sign out</button>
        </div>
      </div>

      {status ? <div className="admin-status">{status}</div> : null}
      {error ? <div className="admin-error">{error}</div> : null}

      <section className="admin-card">
        <h2>Site settings</h2>
        <div className="admin-grid-two">
          <label>Brand name<input className="input" value={settings.brand_name} onChange={(e) => setSettings({ ...settings, brand_name: e.target.value })} /></label>
          <label>Contact email<input className="input" value={settings.contact_email} onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })} /></label>
          <label>Contact phone<input className="input" value={settings.contact_phone} onChange={(e) => setSettings({ ...settings, contact_phone: e.target.value })} /></label>
          <label>Website<input className="input" value={settings.social_links.website || ""} onChange={(e) => setSettings({ ...settings, social_links: { ...settings.social_links, website: e.target.value } })} /></label>
        </div>
        <label>Hero title<textarea className="textarea" value={settings.hero_title} onChange={(e) => setSettings({ ...settings, hero_title: e.target.value })} /></label>
        <label>Hero subtitle<textarea className="textarea" value={settings.hero_subtitle} onChange={(e) => setSettings({ ...settings, hero_subtitle: e.target.value })} /></label>
        <div className="admin-grid-two">
          <label>Logo URL<input className="input" value={settings.logo_url} onChange={(e) => setSettings({ ...settings, logo_url: e.target.value })} /></label>
          <label>Hero image URL<input className="input" value={settings.hero_image_url} onChange={(e) => setSettings({ ...settings, hero_image_url: e.target.value })} /></label>
        </div>
        <div className="button-row">
          <label className="button button-secondary file-button">{uploadingKey === "logo" ? "Uploading..." : "Upload logo"}<input hidden accept="image/*" disabled={uploadingKey === "logo"} onChange={(e) => void handleUpload("logo", "site", (url) => setSettings({ ...settings, logo_url: url }), e.target.files?.[0])} type="file" /></label>
          <label className="button button-secondary file-button">{uploadingKey === "hero" ? "Uploading..." : "Upload hero image"}<input hidden accept="image/*" disabled={uploadingKey === "hero"} onChange={(e) => void handleUpload("hero", "site", (url) => setSettings({ ...settings, hero_image_url: url }), e.target.files?.[0])} type="file" /></label>
        </div>
        <label>Featured product slugs (comma separated)<textarea className="textarea" value={settings.featured_product_slugs.join(", ")} onChange={(e) => setSettings({ ...settings, featured_product_slugs: e.target.value.split(",").map((item) => item.trim()).filter(Boolean) })} /></label>
        <label>Contact intro<textarea className="textarea" value={settings.contact_intro} onChange={(e) => setSettings({ ...settings, contact_intro: e.target.value })} /></label>
        <label>Contact note<textarea className="textarea" value={settings.contact_note} onChange={(e) => setSettings({ ...settings, contact_note: e.target.value })} /></label>
        <button className="button" onClick={() => void saveSettings()} type="button">Save settings</button>
      </section>

      <section className="admin-card">
        <div className="admin-section-head">
          <h2>Categories</h2>
          <button className="button button-secondary" onClick={() => setCategories((current) => [...current, { id: crypto.randomUUID(), name: "New category", slug: "new-category", description: "TODO: Add description", image_url: "/images/catalog/page-01.png", eyebrow: "New", hero_title: "TODO: Add title", hero_body: "TODO: Add body", feature_bullets: ["TODO: Add bullet"] }])} type="button">Add category</button>
        </div>
        <div className="admin-stack">
          {categories.map((category) => (
            <div className="sub-card" key={category.id}>
              <div className="admin-grid-two">
                <label>Name<input className="input" value={category.name} onChange={(e) => setCategories((current) => current.map((item) => item.id === category.id ? { ...item, name: e.target.value } : item))} /></label>
                <label>Slug<input className="input" value={category.slug} onChange={(e) => setCategories((current) => current.map((item) => item.id === category.id ? { ...item, slug: e.target.value } : item))} /></label>
              </div>
              <label>Description<textarea className="textarea" value={category.description} onChange={(e) => setCategories((current) => current.map((item) => item.id === category.id ? { ...item, description: e.target.value } : item))} /></label>
              <label>Feature bullets<textarea className="textarea" value={joinLines(category.feature_bullets)} onChange={(e) => setCategories((current) => current.map((item) => item.id === category.id ? { ...item, feature_bullets: splitLines(e.target.value) } : item))} /></label>
              <div className="button-row">
                <button className="button" onClick={() => void saveSimple("categories", category, category.name)} type="button">Save</button>
                <button className="button button-secondary" onClick={() => void deleteSimple("categories", category.id, () => setCategories((current) => current.filter((item) => item.id !== category.id)))} type="button">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="admin-card">
        <div className="admin-section-head">
          <h2>Products</h2>
          <button className="button button-secondary" onClick={() => setProducts((current) => [createProduct(), ...current])} type="button">Add product</button>
        </div>
        <div className="admin-stack">
          {products.map((product) => (
            <div className="sub-card" key={product.id}>
              <div className="admin-grid-three">
                <label>Name<input className="input" value={product.name} onChange={(e) => patchProduct(product.id, { name: e.target.value })} /></label>
                <label>SKU<input className="input" value={product.sku} onChange={(e) => patchProduct(product.id, { sku: e.target.value })} /></label>
                <label>Slug<input className="input" value={product.slug} onChange={(e) => patchProduct(product.id, { slug: e.target.value })} /></label>
              </div>
              <div className="admin-grid-three">
                <label>Category<select className="input" value={product.category_id} onChange={(e) => patchProduct(product.id, { category_id: e.target.value })}>{categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select></label>
                <label>Price<input className="input" value={product.displayed_price} onChange={(e) => patchProduct(product.id, { displayed_price: e.target.value })} /></label>
                <label>External link<input className="input" value={product.external_link} onChange={(e) => patchProduct(product.id, { external_link: e.target.value })} /></label>
              </div>
              <label>Short description<textarea className="textarea" value={product.short_description} onChange={(e) => patchProduct(product.id, { short_description: e.target.value })} /></label>
              <label>Full description<textarea className="textarea" value={product.full_description} onChange={(e) => patchProduct(product.id, { full_description: e.target.value })} /></label>
              <div className="admin-grid-two">
                <label>Materials<textarea className="textarea" value={product.materials} onChange={(e) => patchProduct(product.id, { materials: e.target.value })} /></label>
                <label>Dimensions<textarea className="textarea" value={product.dimensions} onChange={(e) => patchProduct(product.id, { dimensions: e.target.value })} /></label>
              </div>
              <label>Care instructions<textarea className="textarea" value={product.care_instructions} onChange={(e) => patchProduct(product.id, { care_instructions: e.target.value })} /></label>
              <label>Highlights<textarea className="textarea" value={joinLines(product.highlights)} onChange={(e) => patchProduct(product.id, { highlights: splitLines(e.target.value) })} /></label>
              <label>Notes<textarea className="textarea" value={joinLines(product.notes)} onChange={(e) => patchProduct(product.id, { notes: splitLines(e.target.value) })} /></label>
              <label className="checkbox-row"><input checked={product.featured} onChange={(e) => patchProduct(product.id, { featured: e.target.checked })} type="checkbox" /> Featured</label>
              <div className="admin-stack">
                <div className="admin-section-head">
                  <h3>Product images</h3>
                  <button className="button button-secondary" onClick={() => patchProduct(product.id, { product_images: [...product.product_images, { id: crypto.randomUUID(), image_url: "", alt_text: `${product.name} image`, sort_order: product.product_images.length }] })} type="button">Add image row</button>
                </div>
                {product.product_images.map((image, imageIndex) => (
                  <div className="admin-grid-three sub-card-flat" key={image.id}>
                    <label>Image URL<input className="input" value={image.image_url} onChange={(e) => patchProductImage(product.id, imageIndex, "image_url", e.target.value)} /></label>
                    <label>Alt text<input className="input" value={image.alt_text} onChange={(e) => patchProductImage(product.id, imageIndex, "alt_text", e.target.value)} /></label>
                    <button className="button button-secondary" onClick={() => patchProduct(product.id, { product_images: product.product_images.filter((_, idx) => idx !== imageIndex) })} type="button">Remove</button>
                  </div>
                ))}
                <label className="button button-secondary file-button">{uploadingKey === `product-${product.id}` ? "Uploading..." : "Upload product image"}<input hidden accept="image/*" disabled={uploadingKey === `product-${product.id}`} onChange={(e) => void handleUpload(`product-${product.id}`, "products", (url) => patchProduct(product.id, { product_images: [...product.product_images, { id: crypto.randomUUID(), image_url: url, alt_text: `${product.name} image`, sort_order: product.product_images.length }] }), e.target.files?.[0])} type="file" /></label>
              </div>
              <div className="button-row">
                <button className="button" onClick={() => void saveProduct(product)} type="button">Save product</button>
                <button className="button button-secondary" onClick={() => void deleteProduct(product.id)} type="button">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="admin-card">
        <div className="admin-section-head">
          <h2>FAQ items</h2>
          <button className="button button-secondary" onClick={() => setFaqItems((current) => [...current, { id: crypto.randomUUID(), question: "TODO: Add question", answer: "TODO: Add answer", sort_order: 999 }])} type="button">Add FAQ</button>
        </div>
        <div className="admin-stack">
          {faqItems.map((item) => (
            <div className="sub-card" key={item.id}>
              <label>Question<input className="input" value={item.question} onChange={(e) => setFaqItems((current) => current.map((faq) => faq.id === item.id ? { ...faq, question: e.target.value } : faq))} /></label>
              <label>Answer<textarea className="textarea" value={item.answer} onChange={(e) => setFaqItems((current) => current.map((faq) => faq.id === item.id ? { ...faq, answer: e.target.value } : faq))} /></label>
              <div className="button-row">
                <button className="button" onClick={() => void saveSimple("faq_items", item, item.question)} type="button">Save FAQ</button>
                <button className="button button-secondary" onClick={() => void deleteSimple("faq_items", item.id, () => setFaqItems((current) => current.filter((faq) => faq.id !== item.id)))} type="button">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="admin-card">
        <div className="admin-section-head">
          <h2>About sections</h2>
          <button className="button button-secondary" onClick={() => setAboutSections((current) => [...current, { id: crypto.randomUUID(), section_title: "TODO: Add title", section_body: "TODO: Add body", image_url: "/images/catalog/page-02.png", sort_order: 999 }])} type="button">Add section</button>
        </div>
        <div className="admin-stack">
          {aboutSections.map((section) => (
            <div className="sub-card" key={section.id}>
              <label>Section title<input className="input" value={section.section_title} onChange={(e) => setAboutSections((current) => current.map((item) => item.id === section.id ? { ...item, section_title: e.target.value } : item))} /></label>
              <label>Section body<textarea className="textarea" value={section.section_body} onChange={(e) => setAboutSections((current) => current.map((item) => item.id === section.id ? { ...item, section_body: e.target.value } : item))} /></label>
              <div className="button-row">
                <button className="button" onClick={() => void saveSimple("about_content", section, section.section_title)} type="button">Save section</button>
                <button className="button button-secondary" onClick={() => void deleteSimple("about_content", section.id, () => setAboutSections((current) => current.filter((item) => item.id !== section.id)))} type="button">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
