import { lazy } from 'react';

/**
 * Route-level code splitting for the only heavy route in Phase 01.
 * FoundationPage pulls in the configuration notice and Zod-based env
 * validation; neither is needed to paint the app shell. Keeping the lazy
 * wrapper in its own file also avoids a mixed component/non-component export
 * in router.tsx (ESLint react-refresh rule).
 */
export const LazyFoundationPage = lazy(async () => {
  const module = await import('@/features/foundation/FoundationPage');
  return { default: module.FoundationPage };
});
