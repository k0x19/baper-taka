import { LoaderCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function PageLoader() {
  const { t } = useTranslation();

  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-[40vh] items-center justify-center gap-3 text-sm text-muted-foreground"
    >
      <LoaderCircle aria-hidden="true" className="h-5 w-5 animate-spin" />
      <span>{t('states.loading')}</span>
    </div>
  );
}
