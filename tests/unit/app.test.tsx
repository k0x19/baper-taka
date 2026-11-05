import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { App } from '@/app/App';
import { Providers } from '@/app/providers';

describe('App', () => {
  it('renders the root route through the router and providers', () => {
    window.history.pushState({}, '', '/');

    render(
      <Providers>
        <App />
      </Providers>,
    );

    expect(screen.getByRole('link', { name: /বাপের টাকা/ })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'প্রযুক্তিগত ভিত্তি প্রস্তুত',
    );
  });
});
