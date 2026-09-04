export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  category: string;
  rating: number;
  badge: string;
  stock: number;
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Customer {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  note?: string;
}

export interface Order {
  id: string;
  createdAt: string;
  customer: Customer;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}
