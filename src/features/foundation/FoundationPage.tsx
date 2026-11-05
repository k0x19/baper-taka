import { CheckCircle2, Construction, Globe2, ShieldCheck, Wallet } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { ConfigurationNotice } from '@/components/common/ConfigurationNotice';

const STATUS_KEYS = [
  'stack',
  'styling',
  'routing',
  'i18n',
  'data',
  'forms',
  'formatting',
  'testing',
] as const;

const PLANNED_KEYS = ['catalog', 'accounts', 'checkout', 'admin'] as const;

/**
 * Temporary Phase 01 development landing page. It exists to verify routing,
 * localization and rendering — it is deliberately not a storefront.
 */
export function FoundationPage() {
  const { t } = useTranslation();

  return (
    <>
      <section className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-start">
        <div className="space-y-6">
          <span className="inline-flex items-center rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-900">
            {t('foundation.badge')}
          </span>
          <h1 className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            {t('foundation.title')}
          </h1>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground">
            {t('foundation.description')}
          </p>
          <img
            src="/logo.svg"
            alt={`${t('brand.name')} — ${t('brand.nameEn')}`}
            width={320}
            height={72}
            className="h-16 w-auto"
          />
          <div className="flex flex-wrap gap-2 pt-2 text-xs font-medium text-muted-foreground">
            <span className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2">
              <Globe2 aria-hidden="true" className="h-4 w-4 text-brand-700" />
              {t('foundation.facts.language')}
            </span>
            <span className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2">
              <Wallet aria-hidden="true" className="h-4 w-4 text-brand-700" />
              {t('foundation.facts.currency')}
            </span>
            <span className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2">
              <ShieldCheck aria-hidden="true" className="h-4 w-4 text-brand-700" />
              {t('foundation.facts.hosting')}
            </span>
          </div>
        </div>

        <div className="space-y-6 rounded-xl border border-border bg-card p-6 shadow-sm">
          <div>
            <h2 className="text-lg font-semibold">{t('foundation.status.heading')}</h2>
            <ul className="mt-4 space-y-3">
              {STATUS_KEYS.map((key) => (
                <li key={key} className="flex items-start gap-3 text-sm leading-6">
                  <CheckCircle2
                    aria-hidden="true"
                    className="mt-1 h-4 w-4 shrink-0 text-brand-700"
                  />
                  <span>{t(`foundation.status.${key}`)}</span>
                </li>
              ))}
            </ul>
          </div>

          <hr className="border-border" />

          <div>
            <h2 className="text-lg font-semibold">{t('foundation.planned.heading')}</h2>
            <ul className="mt-4 space-y-3">
              {PLANNED_KEYS.map((key) => (
                <li
                  key={key}
                  className="flex items-start gap-3 text-sm leading-6 text-muted-foreground"
                >
                  <Construction aria-hidden="true" className="mt-1 h-4 w-4 shrink-0" />
                  <span>{t(`foundation.planned.${key}`)}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="rounded-md bg-muted p-3 text-xs leading-5 text-muted-foreground">
            {t('foundation.note')}
          </p>
        </div>
      </section>

      <ConfigurationNotice />
    </>
  );
}
