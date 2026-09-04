"use client";

import { useMemo, useState } from "react";
import { categories, products } from "@/lib/data";
import { ProductCard } from "@/components/product-card";

export default function Home() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(250);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeCategory === "All" || product.category === activeCategory;
      const matchesPrice = product.price <= maxPrice;
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [activeCategory, maxPrice, search]);

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] bg-slate-900 px-6 py-12 text-white shadow-sm sm:px-10 lg:px-16">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">ShopEase</p>
        <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
          Discover thoughtfully designed essentials for everyday living.
        </h1>
        <p className="mt-4 max-w-xl text-lg text-slate-300">
          Browse curated picks, filter by category and price, and build your cart in seconds.
        </p>
      </section>

      <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex-1">
            <label className="mb-2 block text-sm font-medium text-slate-700">Search</label>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products"
              className="w-full rounded-xl border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
            />
          </div>
          <div className="min-w-[180px]">
            <label className="mb-2 block text-sm font-medium text-slate-700">Category</label>
            <select
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="min-w-[220px]">
            <label className="mb-2 block text-sm font-medium text-slate-700">Max price: ${maxPrice}</label>
            <input
              type="range"
              min="40"
              max="250"
              step="10"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-slate-900"
            />
          </div>
        </div>
      </section>

      <section className="mt-10">
        {filteredProducts.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center text-slate-600">
            No products match your filters right now.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
