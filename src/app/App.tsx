import { Suspense } from 'react';
import { RouterProvider } from 'react-router';

import { PageLoader } from '@/components/common/PageLoader';
import { router } from '@/app/router';

export function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
