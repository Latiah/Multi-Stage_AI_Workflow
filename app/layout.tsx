import type { Metadata } from "next";
import { CartProvider } from "@/components/cart-provider";
import { Header } from "@/components/header";
import "./globals.css";

// NOTE (CLI stage finding): the previous version loaded Geist/Geist Mono via
// next/font/google, which fetches font files from fonts.googleapis.com at
// build time. That works locally but breaks `next build` on any CI runner,
// sandbox, or corporate network without egress to Google Fonts. Using
// system font stacks keeps the same CSS variable names (so globals.css is
// untouched) while making the build fully offline-safe.
const fontVariableStyle = {
  "--font-geist-sans":
    "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  "--font-geist-mono":
    "ui-monospace, SFMono-Regular, Menlo, Monaco, 'Cascadia Code', 'Courier New', monospace",
} as React.CSSProperties;

export const metadata: Metadata = {
  title: "ShopEase",
  description: "A modern e-commerce storefront built with Next.js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" style={fontVariableStyle}>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        <CartProvider>
          <Header />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
