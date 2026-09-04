"use client";

import Link from "next/link";
import { useCart } from "@/components/cart-provider";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, subtotal, shipping, tax, total } = useCart();

  if (items.length === 0) {
    return (
      <main className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <h1 className="text-2xl font-semibold text-slate-900">Your cart is empty</h1>
          <p className="mt-3 text-slate-600">Add a few favorites to get started.</p>
          <Link href="/" className="mt-6 inline-flex rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white">
            Continue shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto grid min-h-screen max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.5fr_0.7fr] lg:px-8">
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Cart</p>
            <h1 className="text-3xl font-semibold text-slate-900">Your selected items</h1>
          </div>
          <Link href="/" className="text-sm font-medium text-slate-600 hover:text-slate-900">
            Continue shopping
          </Link>
        </div>
        {items.map((item) => (
          <div key={item.product.id} className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <img src={item.product.image} alt={item.product.name} className="h-20 w-20 rounded-xl object-cover" />
              <div>
                <h2 className="font-semibold text-slate-900">{item.product.name}</h2>
                <p className="text-sm text-slate-500">{item.product.category}</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">${item.product.price}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center rounded-full border border-slate-200">
                <button type="button" onClick={() => updateQuantity(item.product.id, -1)} className="px-3 py-2 text-lg">
                  −
                </button>
                <span className="min-w-8 text-center font-medium">{item.quantity}</span>
                <button type="button" onClick={() => updateQuantity(item.product.id, 1)} className="px-3 py-2 text-lg">
                  +
                </button>
              </div>
              <button type="button" onClick={() => removeFromCart(item.product.id)} className="text-sm font-medium text-rose-600">
                Remove
              </button>
            </div>
          </div>
        ))}
      </section>

      <aside className="rounded-3xl border border-slate-200 bg-slate-900 p-6 text-white shadow-sm">
        <h2 className="text-xl font-semibold">Order summary</h2>
        <div className="mt-6 space-y-3 text-sm text-slate-300">
          <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
          <div className="flex justify-between"><span>Shipping</span><span>${shipping.toFixed(2)}</span></div>
          <div className="flex justify-between"><span>Tax</span><span>${tax.toFixed(2)}</span></div>
          <div className="mt-4 flex justify-between border-t border-slate-700 pt-4 text-base font-semibold text-white">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
        <Link href="/checkout" className="mt-8 inline-flex w-full justify-center rounded-full bg-white px-4 py-3 text-sm font-semibold text-slate-900">
          Checkout
        </Link>
      </aside>
    </main>
  );
}
