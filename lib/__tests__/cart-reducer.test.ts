import { describe, expect, it } from "vitest";
import { cartReducer } from "@/components/cart-provider";
import type { Product } from "@/lib/types";

const sampleProduct: Product = {
  id: "test-product",
  slug: "test-product",
  name: "Test Product",
  description: "A product used only in tests.",
  price: 25,
  category: "Test",
  rating: 5,
  badge: "New",
  stock: 10,
  image: "https://example.com/image.jpg",
};

describe("cartReducer", () => {
  it("adds a new item to an empty cart", () => {
    const result = cartReducer({ items: [] }, { type: "ADD_ITEM", payload: sampleProduct });
    expect(result.items).toHaveLength(1);
    expect(result.items[0].quantity).toBe(1);
  });

  it("increments quantity when adding an item already in the cart", () => {
    const state = { items: [{ product: sampleProduct, quantity: 1 }] };
    const result = cartReducer(state, { type: "ADD_ITEM", payload: sampleProduct });
    expect(result.items).toHaveLength(1);
    expect(result.items[0].quantity).toBe(2);
  });

  it("removes an item entirely", () => {
    const state = { items: [{ product: sampleProduct, quantity: 2 }] };
    const result = cartReducer(state, { type: "REMOVE_ITEM", payload: sampleProduct.id });
    expect(result.items).toHaveLength(0);
  });

  it("decreasing quantity below 1 removes the item instead of going negative", () => {
    const state = { items: [{ product: sampleProduct, quantity: 1 }] };
    const result = cartReducer(state, { type: "DECREASE_QUANTITY", payload: sampleProduct.id });
    expect(result.items).toHaveLength(0);
  });

  it("clears the cart", () => {
    const state = { items: [{ product: sampleProduct, quantity: 3 }] };
    const result = cartReducer(state, { type: "CLEAR_CART" });
    expect(result.items).toHaveLength(0);
  });
});
