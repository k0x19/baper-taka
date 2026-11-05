import { act, render, screen } from '@testing-library/react';
import type { ReactElement } from 'react';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router';
import { afterEach, describe, expect, it } from 'vitest';

import { ConfigurationNotice } from '@/components/common/ConfigurationNotice';
import { NotFoundPage } from '@/components/common/NotFoundPage';
import { PageLoader } from '@/components/common/PageLoader';
import { FoundationPage } from '@/features/foundation/FoundationPage';
import i18n from '@/lib/i18n';

function withProviders(ui: ReactElement) {
  return render(
    <I18nextProvider i18n={i18n}>
      <MemoryRouter>{ui}</MemoryRouter>
    </I18nextProvider>,
  );
}

afterEach(async () => {
  await act(async () => {
    await i18n.changeLanguage('bn');
  });
});

describe('foundation UI', () => {
  it('renders the temporary development page without product data', () => {
    withProviders(<FoundationPage />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'প্রযুক্তিগত ভিত্তি প্রস্তুত',
    );
    expect(screen.getByRole('img', { name: /বাপের টাকা/ })).toBeInTheDocument();
    expect(screen.getByText('পরবর্তী পর্বে পরিকল্পিত')).toBeInTheDocument();
    expect(screen.queryByText(/add to cart/i)).not.toBeInTheDocument();
  });

  it('shows a secret-free configuration notice when issues are supplied', () => {
    withProviders(<ConfigurationNotice issues={['VITE_SUPABASE_URL is required.']} />);

    const notice = screen.getByRole('status');
    expect(notice).toHaveTextContent('Supabase কনফিগারেশন প্রয়োজন');
    expect(notice).toHaveTextContent('VITE_SUPABASE_URL');
    expect(notice).toHaveTextContent('service_role');
  });

  it('renders loading and not-found foundations', () => {
    const { unmount } = withProviders(<PageLoader />);
    expect(screen.getByRole('status')).toHaveTextContent('লোড হচ্ছে');
    unmount();

    withProviders(<NotFoundPage />);
    expect(screen.getByRole('heading', { name: 'পাতাটি পাওয়া যায়নি' })).toBeInTheDocument();
  });

  it('switches to English translations', async () => {
    await act(async () => {
      await i18n.changeLanguage('en');
    });
    withProviders(<NotFoundPage />);

    expect(screen.getByRole('heading', { name: 'Page not found' })).toBeInTheDocument();
  });
});
