# ShopEase — Technical Specification (Stage 1 output)

## 1. Tech stack
- Next.js (App Router) + TypeScript
- Tailwind CSS for styling
- No backend/database — static in-memory product catalog

## 2. Pages / routes
| Route | Purpose |
|---|---|
| `/` | Product catalog grid, search/filter |
| `/products/[slug]` | Single product detail + add to cart |
| `/cart` | Review cart, adjust quantities |
| `/checkout` | Customer info form, order summary |
| `/confirmation` | Order confirmation after checkout |

## 3. Core data models
```ts
interface Product {
  id: string; slug: string; name: string; price: number;
  image: string; description: string; category: string;
}
interface CartItem { product: Product; quantity: number; }
interface Customer {
  firstName: string; lastName: string; email: string;
  address: string; city: string; postalCode: string; note?: string;
}
interface Order {
  id: string; createdAt: string; customer: Customer;
  items: CartItem[]; subtotal: number; shipping: number;
  tax: number; total: number;
}
```

## 4. State management
- Cart must persist across page navigation and page refresh (client-side
  storage is sufficient — no backend required).
- Cart state must be available to any page via a shared provider/context.

## 5. Non-functional requirements
- `npm run build` and `npm run lint` must both complete with **zero errors**.
- The production build must not depend on reaching any external network host
  (so it can run in CI/sandboxed environments with restricted egress).
- Forms must be operable via keyboard and show inline validation errors.

## 6. Out of scope
- Real payment processing
- User accounts / authentication
- A real backend API or database
