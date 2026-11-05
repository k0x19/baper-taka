# Database Schema (planned)

> **Status: descriptive only.** No production migrations, tables, triggers,
> RLS policies, seed data or generated database types exist in the repository
> yet. `supabase/migrations/` currently contains only a README. Phase 01 makes
> no database changes. This document is the design input for a later phase,
> not a claim of implementation.

## 1. Principles

- Every application table has Row Level Security enabled with default-deny
  policies.
- Prices and stock are authoritative in PostgreSQL; clients never submit
  trusted totals or stock levels.
- Checkout is one atomic transaction (a `SECURITY DEFINER` PostgreSQL function
  or an Edge Function calling one) with locked inventory rows.
- Admin identity comes from a backend-protected role, never from a client flag.
- All timestamps are `timestamptz`; money is integer minor units (poisha) or
  `numeric` with an explicit decision recorded in the migration.

## 2. Planned entities

| Entity                  | Purpose                                                          | Key fields (illustrative)                                                                                                                                          |
| ----------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `profiles`              | One row per auth user; holds customer profile and protected role | `id` (FK `auth.users`), `full_name`, `phone`, `role` (`customer` / `admin`), `created_at`                                                                          |
| `addresses`             | Customer delivery addresses                                      | `id`, `user_id`, `division`, `district`, `upazila`, `street`, `postal_code`, `is_default`                                                                          |
| `categories`            | Catalog grouping                                                 | `id`, `slug`, `name_bn`, `name_en`, `parent_id`, `sort_order`                                                                                                      |
| `products`              | Seller-owned catalog                                             | `id`, `category_id`, `slug`, `name_bn`, `name_en`, `description_bn`, `description_en`, `price`, `compare_at_price`, `stock_quantity`, `is_active`, timestamps      |
| `product_images`        | Ordered images per product                                       | `id`, `product_id`, `storage_path`, `alt_bn`, `alt_en`, `sort_order`                                                                                               |
| `carts` / `cart_items`  | Optional server-side cart for signed-in customers                | `id`, `user_id`, `product_id`, `quantity`, timestamps                                                                                                              |
| `orders`                | One order per checkout                                           | `id`, `order_number`, `user_id`, `status`, `subtotal`, `delivery_fee`, `discount`, `total`, `shipping_address_snapshot`, `payment_method`, `placed_at`, timestamps |
| `order_items`           | Immutable price snapshot per line                                | `id`, `order_id`, `product_id`, `name_snapshot`, `unit_price_snapshot`, `quantity`, `line_total`                                                                   |
| `payments`              | Payment state and manual references                              | `id`, `order_id`, `method` (`cod` / `bkash` / `nagad`), `status` (`pending` / `approved` / `rejected`), `amount`, `transaction_id`, `payer_number`, timestamps     |
| `payment_verifications` | Admin decision audit                                             | `id`, `payment_id`, `admin_id`, `decision`, `note`, `evidence_path`, `created_at`                                                                                  |
| `order_status_events`   | Customer-visible status history                                  | `id`, `order_id`, `from_status`, `to_status`, `changed_by`, `note`, `created_at`                                                                                   |
| `audit_logs`            | Sensitive admin/privileged actions                               | `id`, `actor_id`, `action`, `entity_type`, `entity_id`, `metadata`, `created_at`                                                                                   |

A Supabase Storage bucket (for example `product-images`) is planned for
product photography, with public read only for active product assets and
admin-only write.

## 3. Relationships

```
auth.users ──1:1── profiles ──1:N── addresses
                     │
                     └──1:N── orders ──1:N── order_items ──N:1── products
                                  │
                                  ├──1:1── payments ──1:N── payment_verifications
                                  └──1:N── order_status_events

categories ──1:N── products ──1:N── product_images
profiles ──1:N── carts ──1:N── cart_items ──N:1── products
```

`order_items` stores a price snapshot so later catalog price changes never
rewrite historical orders. `orders.shipping_address_snapshot` similarly keeps
the address used at checkout.

## 4. Planned constraints and integrity rules

- Unique `slug` for categories/products; unique `order_number`; unique
  `transaction_id` per payment method where applicable.
- Non-negative `price`, `stock_quantity`, `quantity`, `total`; `CHECK`
  constraints plus server-side validation.
- `order_items.line_total` computed server-side from the locked product price.
- Stock decrement and order creation occur in the same transaction; rows are
  locked (`FOR UPDATE`) to prevent overselling.
- Idempotency key on checkout to prevent duplicate orders on retry.
- Foreign keys use explicit `ON DELETE` behaviour; no cascade deletion of
  historical orders.

## 5. Planned RLS outline (not implemented)

- `profiles`: customer reads/updates only their own non-role columns; `role`
  is writable only by privileged backend code.
- `addresses`, `orders`, `order_items`, `order_status_events`: customer sees
  only their own rows; admin sees all via a backend-checked policy.
- `products`, `categories`, `product_images`: public read for active items;
  admin-only write.
- `payments`: customers may create a pending submission for their own order
  and read their own status; **only admins may approve/reject**.
- `payment_verifications`, `audit_logs`: admin-only inserts/reads.
- Storage: public read of product assets; admin-only upload/delete.

## 6. Work required before this becomes real

1. Write reviewable migrations in `supabase/migrations/`.
2. Enable RLS and add explicit default-deny policies.
3. Implement atomic checkout and payment-approval functions with server-side
   role checks.
4. Generate TypeScript database types and wire them into the Supabase client.
5. Add `supabase/tests/` policy tests against a local Supabase instance.
6. Update this document with the implemented schema and note any deviation.
