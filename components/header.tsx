"use client";

import Link from "next/link";
import { useCart } from "@/components/cart-provider";

export function Header() {
  const { cartCount } = useCart();

  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-xl font-semibold tracking-tight text-slate-900">
          ShopEase
        </Link>
        <nav className="flex items-center gap-4 text-sm font-medium text-slate-600">
          <Link href="/" className="transition hover:text-slate-900">
            Shop
          </Link>
          <Link href="/cart" className="flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-700">
            Cart
            <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs">{cartCount}</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
