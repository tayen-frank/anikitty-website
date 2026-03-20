# Anikitty Website

A premium cat furniture brand site built with Next.js App Router, TypeScript, and a Supabase-ready admin workflow. The storefront is intentionally **not** a cart or checkout experience. Customers discover products here and complete purchases through external links such as Amazon or direct inquiry links.

## What's included

- Public pages: Home, Shop, Category, Product detail, About, Materials, FAQ, Contact, Gallery
- No blog, no cart, no checkout flow
- SEO-ready routing with per-page metadata, Open Graph, `sitemap.xml`, and `robots.txt`
- Seed content derived from the 2024 Anikitty catalog in [`src/data/site.ts`](./src/data/site.ts)
- Lightweight admin login and dashboard backed by Supabase Auth, Database, and Storage
- Vercel-ready Next.js structure with custom-domain support through standard Vercel setup

## Brand grounding from the catalog

1. Brand identity
   Anikitty is presented as the cat-focused brand of Ta Yen Paper Box Container Co., Ltd. in Taiwan, with manufacturing roots dating to 1975 and an export history beginning in 2008.
2. Product categories
   The catalog groups the line into Cat Household Furniture, Cat House & Scratcher Post, Cat Scratcher, Floating Series, Cat Jumping Platform, and accessory or gift-style items.
3. Product philosophy
   The strongest recurring message is shared living: products should support cat behavior while still looking appropriate in a refined home.

## Local development

1. Install dependencies:
   `npm install`
2. Start the app:
   `npm run dev`
3. Open [http://localhost:3000](http://localhost:3000)

## Environment variables

Copy `.env.example` to `.env.local` and add values for live content management:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET`

If Supabase env vars are omitted, the storefront still works by falling back to the local catalog seed data.

## Supabase setup

1. Create a Supabase project.
2. Run the SQL in [`supabase/schema.sql`](./supabase/schema.sql).
3. In Supabase Auth, create the admin user accounts you want to sign into `/admin/login`.
4. Confirm the public storage bucket name matches `NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET`.
5. Open `/admin/login` and sign in.

### Admin capabilities

The dashboard is designed to let you:

- log in securely with Supabase email/password auth
- update brand and homepage settings
- upload and replace the site logo and hero image
- create, edit, and delete products
- assign products to categories
- update price display and external purchase links
- manage product image URLs and upload product images to Supabase Storage
- manage categories, FAQ items, and About sections

### Seed data note

The launch-ready sample content lives in [`src/data/site.ts`](./src/data/site.ts). Public pages use that data automatically until Supabase content is available.

## Vercel deployment

1. Push this project to GitHub.
2. Import the repository into Vercel.
3. Set the same environment variables from `.env.local` in the Vercel project.
4. Deploy.
5. Connect your custom domain from the Vercel project settings when ready.

## GitHub workflow notes

- The project is a normal Next.js repo and is safe to version in GitHub.
- Public catalog reference images live in `public/images/catalog`.
- Local extraction utilities such as `extract-catalog.mjs` are optional helpers and not required in production.

## Important placeholder guidance

Some catalog details are not explicit, especially retail prices, final marketplace URLs, and certain product-specific care notes. Those items are intentionally marked with `TODO` labels in the seed content and UI so they can be edited before launch.
