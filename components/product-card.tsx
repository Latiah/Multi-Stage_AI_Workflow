"use client";

import Link from "next/link";
import { useCart } from "@/components/cart-provider";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <Link href={`/products/${product.slug}`} className="block">
        <img src={product.image} alt={product.name} className="h-48 w-full object-cover" />
      </Link>
      <div className="space-y-4 p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
            {product.badge}
          </span>
          <span className="text-sm text-slate-500">★ {product.rating}</span>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{product.name}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">{product.description}</p>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{product.category}</p>
            <p className="text-xl font-semibold text-slate-900">${product.price}</p>
          </div>
          <button
            type="button"
            onClick={() => addToCart(product)}
            className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
          >
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
}
