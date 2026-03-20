import Link from "next/link";

import { MediaImage } from "@/components/media-image";
import type { Category, Product } from "@/lib/types";
import { isTodoValue, purchaseLabel } from "@/lib/utils";

type ProductCardProps = {
  product: Product;
  category?: Category;
};

export function ProductCard({ product, category }: ProductCardProps) {
  const leadImage = product.product_images[0];

  return (
    <article className="product-card">
      <Link className="product-media-frame" href={`/shop/${product.slug}`}>
        {leadImage ? (
          <MediaImage alt={leadImage.alt_text} className="product-media" fill sizes="(max-width: 960px) 100vw, 33vw" src={leadImage.image_url} />
        ) : null}
        <span className="product-sku">{product.sku}</span>
      </Link>

      <div className="product-body">
        {category ? <p className="eyebrow">{category.name}</p> : null}
        <h3>
          <Link href={`/shop/${product.slug}`}>{product.name}</Link>
        </h3>
        <p>{product.short_description}</p>
        <div className="product-meta-row">
          <strong>{product.displayed_price}</strong>
          {isTodoValue(product.displayed_price) ? <span className="tag">TODO</span> : null}
        </div>
        <div className="button-row">
          <Link className="button button-secondary" href={`/shop/${product.slug}`}>
            View details
          </Link>
          <a className="button" href={product.external_link} rel="noreferrer" target="_blank">
            {purchaseLabel(product.external_link)}
          </a>
        </div>
      </div>
    </article>
  );
}
