import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "@/lib/data";
import type { Product } from "@/lib/types";
import { ProductDetailClient } from "@/components/product-detail-client";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const product = products.find((item) => item.slug === params.slug);
  if (!product) return { title: "Product not found" };
  return { title: `${product.name} | ShopEase` };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = products.find((item) => item.slug === params.slug) as Product | undefined;
  if (!product) notFound();

  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-8 px-4 py-12 sm:px-6 lg:px-8">
      <Link href="/" className="text-sm font-medium text-slate-600 hover:text-slate-900">
        ← Back to catalog
      </Link>
      <ProductDetailClient product={product} />
    </main>
  );
}
