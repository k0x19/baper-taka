import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

export function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <section className="mx-auto flex min-h-[50vh] max-w-xl flex-col items-center justify-center gap-4 text-center">
      <p className="font-mono text-5xl font-bold text-brand-700">{t('states.notFoundCode')}</p>
      <h1 className="text-2xl font-semibold">{t('states.notFoundTitle')}</h1>
      <p className="text-sm leading-6 text-muted-foreground">{t('states.notFoundDescription')}</p>
      <Link
        to="/"
        className="inline-flex h-10 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-brand-800"
      >
        {t('states.goHome')}
      </Link>
    </section>
  );
}
