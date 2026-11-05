import { AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, useRouteError } from 'react-router';

import { Button } from '@/components/ui/button';

export function RouteErrorPage() {
  const { t } = useTranslation();
  const error = useRouteError();
  const detail = error instanceof Error ? error.message : null;

  return (
    <main className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center gap-4 px-4 text-center">
      <AlertCircle aria-hidden="true" className="h-10 w-10 text-destructive" />
      <h1 className="text-2xl font-semibold">{t('states.errorTitle')}</h1>
      <p className="text-sm leading-6 text-muted-foreground">{t('states.errorDescription')}</p>
      {detail !== null && (
        <p className="max-w-full break-words rounded-md bg-muted px-3 py-2 font-mono text-xs text-muted-foreground">
          {detail}
        </p>
      )}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button onClick={() => window.location.reload()}>{t('states.retry')}</Button>
        <Link
          to="/"
          className="inline-flex h-10 items-center rounded-md border border-border bg-card px-4 text-sm font-medium text-foreground hover:bg-muted"
        >
          {t('states.goHome')}
        </Link>
      </div>
    </main>
  );
}
