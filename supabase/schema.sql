create extension if not exists pgcrypto;

create table if not exists public.site_settings (
  id text primary key default 'default',
  brand_name text not null,
  logo_url text not null default '',
  hero_title text not null,
  hero_subtitle text not null,
  hero_image_url text not null,
  contact_email text not null,
  contact_phone text not null default '',
  social_links jsonb not null default '{}'::jsonb,
  featured_product_slugs text[] not null default '{}',
  home_copy_blocks jsonb not null default '[]'::jsonb,
  contact_intro text not null default '',
  contact_note text not null default '',
  final_cta_title text not null default '',
  final_cta_body text not null default '',
  hero_cta_label text not null default 'Explore the shop',
  hero_secondary_label text not null default 'View material story'
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text not null default '',
  image_url text not null default '',
  eyebrow text not null default '',
  hero_title text not null default '',
  hero_body text not null default '',
  feature_bullets text[] not null default '{}'
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  sku text not null default '',
  slug text not null unique,
  name text not null,
  category_id uuid references public.categories(id) on delete set null,
  short_description text not null default '',
  full_description text not null default '',
  displayed_price text not null default '',
  external_link text not null default '',
  featured boolean not null default false,
  materials text not null default '',
  dimensions text not null default '',
  care_instructions text not null default '',
  highlights text[] not null default '{}',
  tags text[] not null default '{}',
  notes text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  image_url text not null,
  alt_text text not null default '',
  sort_order integer not null default 0
);

create table if not exists public.faq_items (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  sort_order integer not null default 0
);

create table if not exists public.about_content (
  id uuid primary key default gen_random_uuid(),
  section_title text not null,
  section_body text not null,
  image_url text not null default '',
  sort_order integer not null default 0
);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;


drop trigger if exists products_set_updated_at on public.products;
create trigger products_set_updated_at
before update on public.products
for each row execute function public.set_updated_at();

alter table public.site_settings enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.product_images enable row level security;
alter table public.faq_items enable row level security;
alter table public.about_content enable row level security;

create policy if not exists "Public read site settings" on public.site_settings for select using (true);
create policy if not exists "Public read categories" on public.categories for select using (true);
create policy if not exists "Public read products" on public.products for select using (true);
create policy if not exists "Public read product images" on public.product_images for select using (true);
create policy if not exists "Public read faq" on public.faq_items for select using (true);
create policy if not exists "Public read about" on public.about_content for select using (true);

create policy if not exists "Authenticated manage site settings" on public.site_settings for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy if not exists "Authenticated manage categories" on public.categories for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy if not exists "Authenticated manage products" on public.products for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy if not exists "Authenticated manage product images" on public.product_images for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy if not exists "Authenticated manage faq" on public.faq_items for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy if not exists "Authenticated manage about" on public.about_content for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

insert into public.site_settings (id, brand_name, hero_title, hero_subtitle, hero_image_url, contact_email, contact_phone)
values ('default', 'Anikitty', 'Cat furniture designed to live beautifully at home.', 'TODO: Replace with your final hero subtitle.', '/images/catalog/page-01.png', 'sales@tayen.com.tw', '+886-4-8355656')
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('site-assets', 'site-assets', true)
on conflict (id) do nothing;

create policy if not exists "Public read site assets" on storage.objects for select using (bucket_id = 'site-assets');
create policy if not exists "Authenticated upload site assets" on storage.objects for insert with check (bucket_id = 'site-assets' and auth.role() = 'authenticated');
create policy if not exists "Authenticated update site assets" on storage.objects for update using (bucket_id = 'site-assets' and auth.role() = 'authenticated');
create policy if not exists "Authenticated delete site assets" on storage.objects for delete using (bucket_id = 'site-assets' and auth.role() = 'authenticated');
