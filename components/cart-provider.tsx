"use client";

import { createContext, useContext, useEffect, useMemo, useReducer, useState } from "react";
import type { CartItem, Product } from "@/lib/types";

type CartState = {
  items: CartItem[];
};

type CartAction =
  | { type: "LOAD_CART"; payload: CartItem[] }
  | { type: "ADD_ITEM"; payload: Product }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "INCREASE_QUANTITY"; payload: string }
  | { type: "DECREASE_QUANTITY"; payload: string }
  | { type: "CLEAR_CART" };

type CartContextValue = {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
};

const initialState: CartState = { items: [] };

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "LOAD_CART":
      return { items: action.payload };
    case "ADD_ITEM": {
      const existingItem = state.items.find((item) => item.product.id === action.payload.id);
      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.product.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        };
      }
      return { items: [...state.items, { product: action.payload, quantity: 1 }] };
    }
    case "REMOVE_ITEM":
      return { items: state.items.filter((item) => item.product.id !== action.payload) };
    case "INCREASE_QUANTITY":
      return {
        items: state.items.map((item) =>
          item.product.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item,
        ),
      };
    case "DECREASE_QUANTITY": {
      return {
        items: state.items.flatMap((item) => {
          if (item.product.id !== action.payload) return [item];
          if (item.quantity <= 1) return [];
          return [{ ...item, quantity: item.quantity - 1 }];
        }),
      };
    }
    case "CLEAR_CART":
      return initialState;
    default:
      return state;
  }
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // One-time sync from localStorage on mount, guarded by `hydrated` below
    // so it never re-fires reactively. Intentional, not a render loop.
    const saved = window.localStorage.getItem("shopease-cart");
    if (saved) {
      try {
        dispatch({ type: "LOAD_CART", payload: JSON.parse(saved) as CartItem[] });
      } catch {
        window.localStorage.removeItem("shopease-cart");
      }
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem("shopease-cart", JSON.stringify(state.items));
  }, [hydrated, state.items]);

  const addToCart = (product: Product) => dispatch({ type: "ADD_ITEM", payload: product });
  const removeFromCart = (productId: string) => dispatch({ type: "REMOVE_ITEM", payload: productId });
  const updateQuantity = (productId: string, delta: number) => {
    if (delta > 0) dispatch({ type: "INCREASE_QUANTITY", payload: productId });
    if (delta < 0) dispatch({ type: "DECREASE_QUANTITY", payload: productId });
  };
  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  const cartCount = useMemo(() => state.items.reduce((sum, item) => sum + item.quantity, 0), [state.items]);
  const subtotal = useMemo(
    () => state.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [state.items],
  );
  const shipping = subtotal > 120 ? 0 : state.items.length > 0 ? 12 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const value = useMemo(
    () => ({
      items: state.items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartCount,
      subtotal,
      shipping,
      tax,
      total,
    }),
    [state.items, cartCount, subtotal, shipping, tax, total],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
