import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Separator } from '@/components/ui/separator';
import { ConfigurationNotice } from '@/components/common/ConfigurationNotice';
import { LanguageSwitcher } from '@/components/common/LanguageSwitcher';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function FoundationPage() {
  const { t } = useTranslation();

  return (
    <Container size="lg">
      <div className="space-y-8">
        <Card className="border-brand-200 shadow-sm">
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <Badge variant="default" className="mb-2">
                  {t('foundation.badge')}
                </Badge>
                <h2 className="text-h2 font-display text-brand-800">
                  {t('foundation.title')}
                </h2>
              </div>
              <Link to="/design-system">
                <Button variant="brand">{t('nav.designSystem', 'Design System')}</Button>
              </Link>
            </div>
            <p className="text-body text-muted-foreground mb-6">
              {t('foundation.description')}
            </p>
            <ConfigurationNotice />
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('foundation.facts.language')}</CardTitle>
            </CardHeader>
            <div className="p-6 text-body">
              {t('foundation.status.stack')}
            </div>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{t('foundation.facts.currency')}</CardTitle>
            </CardHeader>
            <div className="p-6 text-body">
              {t('foundation.status.styling')}
            </div>
          </Card>
        </div>

        <Separator className="my-8" />

        <div className="text-center">
          <LanguageSwitcher />
        </div>
      </div>
    </Container>
  );
}
