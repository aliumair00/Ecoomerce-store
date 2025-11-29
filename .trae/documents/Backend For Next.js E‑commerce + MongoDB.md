## Overview
- Build a Node.js + Express REST API that backs the existing Next.js app.
- Persist data with MongoDB via Mongoose; secure auth with JWT + bcrypt.
- Replace mock front‑end data with API calls, keeping current UI intact.
- Configure environment via `.env` containing your MongoDB URI and keys.

## Key Front‑End Integration Points
- Replace `mockProducts` with API calls in `app/products/page.tsx:8`, `app/product/[id]/page.tsx:6`, `app/page.tsx:10`.
- Replace cart state that uses `mockCartItems` in `app/cart/page.tsx:6` with user‑specific cart endpoints.
- Populate orders list from the backend instead of static data in `app/orders/page.tsx:7`.
- Add a small `lib/api.ts` helper for typed fetch requests and error handling.

## Project Structure (server)
- `server/src/index.ts` – Express app bootstrap, routes, error handling.
- `server/src/config/db.ts` – Mongo connection using `MONGODB_URI`.
- `server/src/middleware/auth.ts` – JWT auth guard.
- `server/src/middleware/error.ts` – centralized error handler.
- `server/src/utils/asyncHandler.ts` – promise wrapper for controllers.
- `server/src/models/` – Mongoose models:
  - `Product.ts` – aligns to current `Product` shape in `lib/mock-data.ts:1`.
  - `User.ts` – name, email, passwordHash, roles, addresses, wishlist.
  - `Cart.ts` – per‑user cart or embedded in `User` (items: productId, qty, price).
  - `Order.ts` – items, totals, status, timestamps, user reference.
  - `Review.ts` – product reviews (rating, comment, user).
- `server/src/controllers/` – business logic per resource.
- `server/src/routes/` – route modules: `auth`, `products`, `cart`, `orders`, `profile`, `wishlist`, `addresses`.

## Environment (.env)
- `PORT=5000`
- `MONGODB_URI=<your MongoDB connection string>`
- `JWT_SECRET=<random long secret>`
- `NODE_ENV=development`
- `CORS_ORIGIN=http://localhost:3000`

## Data Models
- Product
  - Fields mirror `lib/mock-data.ts:1–32` (id, name, price, originalPrice, image, rating, reviews, sold, category, description, material, design, customization, protection, warranty, stock, supplier, specifications, features).
  - Indexes: `name`, `category`, text search over `name`/`description`.
- User
  - `name`, `email` (unique), `passwordHash`, `roles` (`user`, `admin`), `addresses[]`, `wishlist[]`.
- Cart
  - Per user: `items[]` `{ productId, quantity, priceSnapshot }`; `subtotal`, `discount`, `tax`, `total`.
- Order
  - `user`, `items[]`, `amounts` (subtotal/discount/tax/total), `status` (`processing|shipped|delivered|cancelled`), `placedAt`.
- Review
  - `product`, `user`, `rating`, `comment`, `createdAt`; aggregate rating stored on product.

## REST API Endpoints
- Auth
  - `POST /api/auth/register` – register user.
  - `POST /api/auth/login` – login, returns JWT.
  - `GET /api/auth/me` – current user profile.
- Products
  - `GET /api/products?search=&category=&minPrice=&maxPrice=&page=&limit=` – list with filters + pagination.
  - `GET /api/products/:id` – product by id.
  - Admin: `POST /api/products`, `PUT /api/products/:id`, `DELETE /api/products/:id`.
- Cart (auth required)
  - `GET /api/cart` – get current cart.
  - `POST /api/cart` – add item `{ productId, quantity }`.
  - `PUT /api/cart/:itemId` – update quantity.
  - `DELETE /api/cart/:itemId` – remove item.
- Orders (auth required)
  - `POST /api/orders` – place order from cart.
  - `GET /api/orders` – list user orders.
  - `GET /api/orders/:id` – order detail.
- Profile (auth required)
  - `GET /api/profile` – user details.
  - `PATCH /api/profile` – update name, phone, etc.
- Wishlist & Addresses (auth required)
  - `GET/POST/DELETE /api/wishlist`
  - `GET/POST/PATCH/DELETE /api/addresses`
- Reviews
  - `POST /api/products/:id/reviews` – add review.
  - `GET /api/products/:id/reviews`

## Middleware & Infrastructure
- CORS: allow `CORS_ORIGIN` frontend.
- Security: `helmet`, JWT auth, password hashing with `bcrypt`.
- Validation: `zod` or `express-validator` on request bodies.
- Logging: `morgan` in dev, structured error responses.
- Rate limiting: basic limiter on auth and review endpoints.

## Front‑End Changes (minimal)
- Create `lib/api.ts` with helpers: `getJSON`, `postJSON`, typed responses.
- `app/products/page.tsx:8` – fetch products from `/api/products` (server‑side or client‑side). Keep pagination UI.
- `app/product/[id]/page.tsx:10` – fetch one product `/api/products/:id` and related list.
- `app/cart/page.tsx:11` – load cart from `/api/cart`, wire quantity and remove actions.
- `app/orders/page.tsx:7` – fetch orders `/api/orders`.
- Add login/register pages and JWT storage; gate profile/orders/cart behind auth.

## Implementation Phases
- Phase 1: Skeleton & Products
  - Set up Express app, Mongo connection, `Product` model, product list/detail endpoints.
  - Front‑end: switch product pages from mock to API.
- Phase 2: Auth & Users
  - Implement register/login/me, JWT middleware.
  - Front‑end: add auth pages and guard protected routes.
- Phase 3: Cart
  - Cart model/endpoints; UI wiring in cart page.
- Phase 4: Orders
  - Order creation from cart, list/detail; status mapping used in `app/orders/page.tsx`.
- Phase 5: Profile, Wishlist, Addresses
  - CRUD endpoints and UI connections in profile page.
- Phase 6: Reviews & Ratings
  - Review model/endpoints, compute product rating aggregates.
- Phase 7: Hardening & Deployment
  - Validation, rate limiting, logging, production builds.

## Commands (for later when implementing)
- Server dev: `npm run dev` (frontend), `npm run dev` in `server` or `tsx src/index.ts`.
- Environment: put your MongoDB URI in `.env` (`MONGODB_URI=...`).

## Deliverables
- `server/` folder with Express app, models, controllers, routes.
- `.env` template with keys listed above.
- Front‑end wired to call API with types preserved; mock data removed.

## Notes & Assumptions
- We’ll keep product images as URLs; uploads can be added later.
- Admin routes require `admin` role; front‑end currently has no admin UI.
- If you prefer Next.js API routes instead of a dedicated server, we can adapt this plan to `/app/api/*` while keeping models and controllers the same.
