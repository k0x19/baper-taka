import { ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, Outlet } from 'react-router';

import { LanguageSwitcher } from '@/components/common/LanguageSwitcher';

export function RootLayout() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <a
        href="#main-content"
        className="sr-only rounded-md bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50"
      >
        {t('layout.skipLink')}
      </a>

      <header className="border-b border-border bg-card">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Link to="/" className="flex items-center gap-3 rounded-md">
            <img src="/favicon.svg" alt="" width={40} height={40} className="h-10 w-10" />
            <span className="flex flex-col">
              <span className="text-lg font-semibold leading-tight">{t('brand.name')}</span>
              <span className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                {t('brand.nameEn')}
              </span>
            </span>
          </Link>
          <LanguageSwitcher />
        </div>
      </header>

      <main
        id="main-content"
        className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 sm:py-14"
      >
        <Outlet />
      </main>

      <footer className="border-t border-border bg-card">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>{t('layout.footer', { year: new Date().getFullYear() })}</p>
          <p className="inline-flex items-center gap-2">
            <ShieldCheck aria-hidden="true" className="h-4 w-4" />
            {t('layout.footerMeta')}
          </p>
        </div>
      </footer>
    </div>
  );
}
