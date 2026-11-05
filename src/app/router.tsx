import { createBrowserRouter } from 'react-router';

import { NotFoundPage } from '@/components/common/NotFoundPage';
import { RouteErrorPage } from '@/components/common/RouteErrorPage';
import { RootLayout } from '@/components/layout/RootLayout';
import { LazyFoundationPage } from '@/app/lazy-foundation-page';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <RouteErrorPage />,
    children: [
      { index: true, element: <LazyFoundationPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
