import type { Metadata } from "next";
import type { ReactNode } from "react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getContent } from "@/lib/content";
import { absoluteUrl } from "@/lib/utils";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl()),
  title: {
    default: "Anikitty | Premium cat furniture",
    template: "%s | Anikitty",
  },
  description:
    "Premium cat furniture and scratcher collections inspired by Anikitty's 2024 catalog, built for product discovery and external purchasing.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Anikitty | Premium cat furniture",
    description:
      "Furniture-minded cat products, scratchers, and climbing pieces designed for homes that value both aesthetics and everyday function.",
    url: absoluteUrl(),
    siteName: "Anikitty",
    images: [
      {
        url: absoluteUrl("/images/catalog/page-01.png"),
        width: 1080,
        height: 1527,
        alt: "Anikitty catalogue cover",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anikitty | Premium cat furniture",
    description:
      "A premium cat furniture website focused on brand presentation, product discovery, and external purchase links.",
    images: [absoluteUrl("/images/catalog/page-01.png")],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const { siteSettings } = await getContent();

  return (
    <html lang="en">
      <body>
        <SiteHeader settings={siteSettings} />
        <main>{children}</main>
        <SiteFooter settings={siteSettings} />
      </body>
    </html>
  );
}
