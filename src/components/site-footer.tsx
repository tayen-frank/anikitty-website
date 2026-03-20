import Link from "next/link";

import type { SiteSettings } from "@/lib/types";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/materials", label: "Materials" },
  { href: "/faq", label: "FAQ / Support" },
  { href: "/contact", label: "Contact" },
  { href: "/gallery", label: "Gallery" },
  { href: "/admin/login", label: "Admin" },
];

type SiteFooterProps = {
  settings: SiteSettings;
};

export function SiteFooter({ settings }: SiteFooterProps) {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <p className="eyebrow">{settings.brand_name}</p>
          <h3>Design-conscious furniture for cats and the people who live with them.</h3>
          <p className="footer-copy">
            Based on the 2024 catalog of Anikitty and Ta Yen Paper Box Container Co., Ltd.
            Catalog-derived placeholders are clearly marked for later refinement.
          </p>
        </div>

        <div>
          <p className="footer-label">Navigate</p>
          <div className="footer-links">
            {links.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="footer-label">Contact</p>
          <div className="footer-links">
            <a href={`mailto:${settings.contact_email}`}>{settings.contact_email}</a>
            <a href={`tel:${settings.contact_phone}`}>{settings.contact_phone}</a>
            {Object.entries(settings.social_links).map(([key, value]) => (
              <a href={value} key={key} rel="noreferrer" target="_blank">
                {key}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="container footer-meta">
        <span>© {new Date().getFullYear()} {settings.brand_name}</span>
        <span>No cart. No checkout. External purchase links only.</span>
      </div>
    </footer>
  );
}
