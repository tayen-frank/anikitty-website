"use client";

import { useState } from "react";

import { ProductCard } from "@/components/shop/product-card";
import type { Category, Product } from "@/lib/types";

type ShopGridProps = {
  categories: Category[];
  products: Product[];
};

export function ShopGrid({ categories, products }: ShopGridProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");

  const visibleProducts = products
    .filter((product) => selectedCategory === "all" || product.category_id === selectedCategory)
    .sort((left, right) => {
      if (sortBy === "name") {
        return left.name.localeCompare(right.name);
      }

      if (sortBy === "category") {
        return left.category_id.localeCompare(right.category_id);
      }

      if (left.featured === right.featured) {
        return left.name.localeCompare(right.name);
      }

      return left.featured ? -1 : 1;
    });

  return (
    <div className="shop-layout">
      <div className="shop-controls">
        <label>
          Category
          <select className="input" onChange={(event) => setSelectedCategory(event.target.value)} value={selectedCategory}>
            <option value="all">All categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Sort
          <select className="input" onChange={(event) => setSortBy(event.target.value)} value={sortBy}>
            <option value="featured">Featured first</option>
            <option value="name">Name</option>
            <option value="category">Category</option>
          </select>
        </label>
      </div>

      {visibleProducts.length > 0 ? (
        <div className="product-grid">
          {visibleProducts.map((product) => (
            <ProductCard
              category={categories.find((category) => category.id === product.category_id)}
              key={product.id}
              product={product}
            />
          ))}
        </div>
      ) : (
        <div className="shop-empty">
          <h3>No products match this filter.</h3>
          <p>Try another category or reset the view to explore the full line.</p>
        </div>
      )}
    </div>
  );
}
