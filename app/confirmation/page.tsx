"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Order } from "@/lib/types";

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Reading from localStorage is a one-time sync with an external system
    // on mount (there is no server-rendered equivalent to diff against), so
    // this setState call is intentional rather than a reactive loop.
    const saved = window.localStorage.getItem("shopease-order");
    if (saved) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setOrder(JSON.parse(saved) as Order);
      } catch {
        setOrder(null);
      }
    }
    setLoading(false);
  }, []);

  const orderId = searchParams.get("order") ?? order?.id ?? "";

  if (loading) {
    return (
      <main className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <h1 className="text-2xl font-semibold text-slate-900">Preparing your confirmation</h1>
          <p className="mt-3 text-slate-600">Please wait while we load your order details.</p>
        </div>
      </main>
    );
  }

  if (!order) {
    return (
      <main className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <h1 className="text-2xl font-semibold text-slate-900">We could not find your order</h1>
          <p className="mt-3 text-slate-600">Please try checking out again.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl rounded-3xl border border-emerald-200 bg-emerald-50 p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Order confirmed</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900">Thanks, {order.customer.firstName}!</h1>
        <p className="mt-3 text-slate-600">Your order <span className="font-semibold">{orderId}</span> has been received and is being prepared.</p>
        <div className="mt-6 rounded-2xl bg-white p-5 text-sm text-slate-600">
          <div className="flex justify-between"><span>Items</span><span>{order.items.reduce((sum, item) => sum + item.quantity, 0)}</span></div>
          <div className="mt-3 flex justify-between"><span>Total</span><span className="font-semibold text-slate-900">${order.total.toFixed(2)}</span></div>
        </div>
        <Link href="/" className="mt-6 inline-flex rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white">
          Continue shopping
        </Link>
      </div>
    </main>
  );
}
