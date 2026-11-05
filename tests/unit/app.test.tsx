import { act, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { App } from '@/app/App';
import { Providers } from '@/app/providers';
import { router } from '@/app/router';

function renderApp() {
  return render(
    <Providers>
      <App />
    </Providers>,
  );
}

afterEach(async () => {
  await act(async () => {
    await router.navigate('/');
  });
});

describe('App', () => {
  it('renders the lazy root route through the router and providers', async () => {
    window.history.pushState({}, '', '/');

    renderApp();

    expect(
      await screen.findByRole('heading', { level: 1, name: 'প্রযুক্তিগত ভিত্তি প্রস্তুত' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /বাপের টাকা/ })).toBeInTheDocument();
  });

  it('preserves the not-found route for unknown paths', async () => {
    await act(async () => {
      await router.navigate('/not-a-real-page');
    });

    renderApp();

    expect(
      await screen.findByRole('heading', { name: 'পাতাটি পাওয়া যায়নি' }),
    ).toBeInTheDocument();
  });
});
