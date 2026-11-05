import { createBrowserRouter } from 'react-router';

import { NotFoundPage } from '@/components/common/NotFoundPage';
import { RouteErrorPage } from '@/components/common/RouteErrorPage';
import { RootLayout } from '@/components/layout/RootLayout';
import { LazyFoundationPage } from '@/app/lazy-foundation-page';
import { LazyDesignSystemPage } from '@/features/design-system/lazy-design-system-page';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout children={undefined} />,
    errorElement: <RouteErrorPage />,
    children: [
      { index: true, element: <LazyFoundationPage /> },
      { path: 'design-system', element: <LazyDesignSystemPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
