import { lazy, Suspense } from 'react';
import { PageLoader } from '@/components/common/PageLoader';

const DesignSystemPage = lazy(() => import('@/features/design-system/DesignSystemPage').then(m => ({ default: m.DesignSystemPage })));

export function LazyDesignSystemPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <DesignSystemPage />
    </Suspense>
  );
}
