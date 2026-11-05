# Supabase database tests

**Status: no database tests exist yet.** There is no schema or RLS policy to
test in Phase 01.

Future tests should verify that customers cannot read or mutate other users'
data, cannot change their own role, cannot approve payments, and that checkout
revalidates prices and stock atomically inside a transaction. Run them against
a local Supabase instance with disposable data.
