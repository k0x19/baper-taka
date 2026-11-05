import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { Button } from '@/components/ui/button';

export function Header() {
  const { t } = useTranslation();

  return (
    <header className="border-b bg-card text-foreground shadow-sm">
      <div className="flex h-16 items-center justify-between px-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <img src="/assets/logo/mark.svg" alt="বাপের টাকা" className="h-8 w-8" />
          <span className="text-h5 font-display font-bold text-brand-800">
            {t('brand.name')}
          </span>
        </div>
        <nav className="flex items-center gap-6">
          <Link to="/" className="text-body text-muted-foreground hover:text-foreground transition-colors">
            {t('foundation.title')}
          </Link>
          <Link to="/design-system" className="text-body text-muted-foreground hover:text-foreground transition-colors">
            {t('nav.designSystem', 'Design System')}
          </Link>
          <Button variant="ghost" size="sm">
            {t('language.bn')} / {t('language.en')}
          </Button>
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t bg-card text-foreground py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-small text-muted-foreground">
            {t('layout.footer', '© {{year}} বাপের টাকা · পর্ব ০২: Dominicana & ডিজাইন সিস্টেম')}
          </p>
          <p className="text-small text-muted-foreground">
            {t('layout.footerMeta', 'বাংলাদেশ · bn / en · ৳ BDT')}
          </p>
        </div>
      </div>
    </footer>
  );
}

export function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
