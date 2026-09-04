"use client";

import { useCart } from "@/components/cart-provider";
import type { Product } from "@/lib/types";

export function ProductDetailClient({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <section className="grid gap-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:grid-cols-[1fr_0.8fr] lg:p-10">
      <img src={product.image} alt={product.name} className="h-[420px] w-full rounded-3xl object-cover" />
      <div className="flex flex-col justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">{product.category}</p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900">{product.name}</h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">{product.description}</p>
          <div className="mt-6 flex items-center gap-3 text-sm text-slate-500">
            <span className="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-700">★ {product.rating}</span>
            <span>{product.stock} in stock</span>
          </div>
        </div>
        <div className="mt-8 space-y-4">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Price</p>
              <p className="text-3xl font-semibold text-slate-900">${product.price}</p>
            </div>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">{product.badge}</span>
          </div>
          <button
            type="button"
            onClick={() => addToCart(product)}
            className="w-full rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Add to cart
          </button>
        </div>
      </div>
    </section>
  );
}
