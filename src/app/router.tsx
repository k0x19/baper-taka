import { createBrowserRouter } from 'react-router';

import { NotFoundPage } from '@/components/common/NotFoundPage';
import { RouteErrorPage } from '@/components/common/RouteErrorPage';
import { RootLayout } from '@/components/layout/RootLayout';
import { FoundationPage } from '@/features/foundation/FoundationPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <RouteErrorPage />,
    children: [
      { index: true, element: <FoundationPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
