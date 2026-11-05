import { lazy, Suspense } from 'react';
import { PageLoader } from '@/components/common/PageLoader';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Separator } from '@/components/ui/separator';

const FoundationPage = lazy(async () => {
  const module = await import('@/features/foundation/FoundationPage');
  return { default: module.FoundationPage };
});

export function LazyFoundationPage() {
  const { t } = useTranslation();

  return (
    <Suspense fallback={<PageLoader />}>
      <Container size="lg" className="py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-h2 font-display">{t('foundation.title')}</h1>
          <Link to="/design-system">
            <Button variant="brand">{t('nav.designSystem', 'Design System')}</Button>
          </Link>
        </div>
        <FoundationPage />
        <Separator className="my-12" />
        <div className="text-center text-small text-muted-foreground">
          <p>{t('layout.footer')}</p>
          <p>{t('layout.footerMeta')}</p>
        </div>
      </Container>
    </Suspense>
  );
}
