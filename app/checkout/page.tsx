"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/cart-provider";
import type { Customer } from "@/lib/types";

function generateOrderId() {
  return `SO-${Math.floor(Math.random() * 9000 + 1000)}`;
}

const initialValues: Customer = {
  firstName: "",
  lastName: "",
  email: "",
  address: "",
  city: "",
  postalCode: "",
  note: "",
};

function validate(values: Customer) {
  const errors: Partial<Record<keyof Customer, string>> = {};
  if (!values.firstName.trim()) errors.firstName = "First name is required";
  if (!values.lastName.trim()) errors.lastName = "Last name is required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = "Enter a valid email";
  if (!values.address.trim()) errors.address = "Address is required";
  if (!values.city.trim()) errors.city = "City is required";
  if (!/^[0-9]{5}$/.test(values.postalCode)) errors.postalCode = "Postal code must be 5 digits";
  return errors;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, shipping, tax, total, clearCart } = useCart();
  const [values, setValues] = useState<Customer>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof Customer, string>>>({});

  const handleChange = (field: keyof Customer, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const orderId = generateOrderId();
    const payload = {
      id: orderId,
      createdAt: new Date().toISOString(),
      customer: values,
      items,
      subtotal,
      shipping,
      tax,
      total,
    };

    window.localStorage.setItem("shopease-order", JSON.stringify(payload));
    clearCart();
    router.push(`/confirmation?order=${orderId}`);
  };

  if (items.length === 0) {
    return (
      <main className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <h1 className="text-2xl font-semibold text-slate-900">Nothing to checkout</h1>
          <p className="mt-3 text-slate-600">Add items to your cart before placing an order.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto grid min-h-screen max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">Checkout</h1>
        <p className="mt-2 text-sm text-slate-600">Please complete your information to confirm the order.</p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">First name</label>
              <input value={values.firstName} onChange={(e) => handleChange("firstName", e.target.value)} className="w-full rounded-xl border border-slate-300 px-3 py-2" />
              {errors.firstName && <p className="mt-1 text-sm text-rose-600">{errors.firstName}</p>}
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Last name</label>
              <input value={values.lastName} onChange={(e) => handleChange("lastName", e.target.value)} className="w-full rounded-xl border border-slate-300 px-3 py-2" />
              {errors.lastName && <p className="mt-1 text-sm text-rose-600">{errors.lastName}</p>}
            </div>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
            <input type="email" value={values.email} onChange={(e) => handleChange("email", e.target.value)} className="w-full rounded-xl border border-slate-300 px-3 py-2" />
            {errors.email && <p className="mt-1 text-sm text-rose-600">{errors.email}</p>}
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Address</label>
            <input value={values.address} onChange={(e) => handleChange("address", e.target.value)} className="w-full rounded-xl border border-slate-300 px-3 py-2" />
            {errors.address && <p className="mt-1 text-sm text-rose-600">{errors.address}</p>}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">City</label>
              <input value={values.city} onChange={(e) => handleChange("city", e.target.value)} className="w-full rounded-xl border border-slate-300 px-3 py-2" />
              {errors.city && <p className="mt-1 text-sm text-rose-600">{errors.city}</p>}
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Postal code</label>
              <input value={values.postalCode} onChange={(e) => handleChange("postalCode", e.target.value)} className="w-full rounded-xl border border-slate-300 px-3 py-2" />
              {errors.postalCode && <p className="mt-1 text-sm text-rose-600">{errors.postalCode}</p>}
            </div>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Delivery note</label>
            <textarea value={values.note ?? ""} onChange={(e) => handleChange("note", e.target.value)} className="min-h-24 w-full rounded-xl border border-slate-300 px-3 py-2" />
          </div>
          <button type="submit" className="w-full rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white">
            Place order
          </button>
        </form>
      </section>

      <aside className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Order total</h2>
        <div className="mt-6 space-y-3 text-sm text-slate-600">
          <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
          <div className="flex justify-between"><span>Shipping</span><span>${shipping.toFixed(2)}</span></div>
          <div className="flex justify-between"><span>Tax</span><span>${tax.toFixed(2)}</span></div>
          <div className="mt-4 flex justify-between border-t border-slate-200 pt-4 text-base font-semibold text-slate-900">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </aside>
    </main>
  );
}
