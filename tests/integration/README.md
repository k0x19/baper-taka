# Integration tests

No integration tests exist yet. Phase 01 deliberately implements no Supabase
queries, authentication flows, checkout, or admin operations.

In later phases, integration tests should cover:

- Supabase Auth session handling against a local Supabase instance.
- RLS behaviour for customer and admin roles.
- The atomic checkout RPC (price, stock and payment state).
- Storage access rules for product images.

These tests must use disposable local credentials only; real project keys must
never be committed or used in CI from a developer machine.
