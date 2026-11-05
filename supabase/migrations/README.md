# Supabase migrations

**Status: no migrations have been written.** Phase 01 is tooling and
foundation only. The repository contains no production database objects,
policies, triggers, or seed data.

When the database phase begins, every schema change must live here as a
reviewable migration and must include:

- Tables, constraints, indexes and relationships described in
  `docs/DATABASE_SCHEMA.md`.
- `ENABLE ROW LEVEL SECURITY` for every application table.
- Explicit, default-deny policies; admin checks must be enforced in the
  backend (never by hiding UI elements).
- Privileged operations (checkout, payment approval, role changes) inside
  `SECURITY DEFINER` functions or Edge Functions with server-side checks.

Never commit database connection strings or `service_role` keys here.
