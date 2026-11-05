# Supabase Edge Functions

**Status: no Edge Functions have been written.** Phase 01 makes no network
calls to Supabase from the SPA beyond creating a validated, unauthenticated
client.

Future privileged operations (manual payment approval, role assignment,
atomic checkout with server-side price and inventory validation) belong here
or in PostgreSQL functions with `SECURITY DEFINER`, using server-side secrets.
The browser must never hold a `service_role` key.
