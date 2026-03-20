import type { MetadataRoute } from "next";

import { getContent } from "@/lib/content";
import { absoluteUrl } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const content = await getContent();
  const staticRoutes = ["", "/shop", "/about", "/materials", "/faq", "/contact", "/gallery"];

  const pages: MetadataRoute.Sitemap = [
    ...staticRoutes.map((route) => {
      const changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] =
        route === "" ? "weekly" : "monthly";

      return {
        url: absoluteUrl(route),
        lastModified: new Date(),
        changeFrequency,
        priority: route === "" ? 1 : 0.8,
      };
    }),
    ...content.categories.map((category) => ({
      url: absoluteUrl(`/categories/${category.slug}`),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...content.products.map((product) => ({
      url: absoluteUrl(`/shop/${product.slug}`),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];

  return pages;
}
