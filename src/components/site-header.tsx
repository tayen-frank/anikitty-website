import Link from "next/link";

import type { SiteSettings } from "@/lib/types";

const navigation = [
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/materials", label: "Materials" },
  { href: "/faq", label: "FAQ / Support" },
  { href: "/contact", label: "Contact" },
];

type SiteHeaderProps = {
  settings: SiteSettings;
};

export function SiteHeader({ settings }: SiteHeaderProps) {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand-lockup" href="/">
          <span className="brand-mark">A</span>
          <span>
            <strong>{settings.brand_name}</strong>
            <small>Premium cat furniture</small>
          </span>
        </Link>

        <nav className="header-nav" aria-label="Primary">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <Link className="button button-small" href="/shop">
          {settings.hero_cta_label}
        </Link>
      </div>
    </header>
  );
}
