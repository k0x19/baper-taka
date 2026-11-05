import { AlertTriangle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { getSupabaseConfigurationIssues, SUPABASE_ENV_VARIABLES } from '@/lib/env';

interface ConfigurationNoticeProps {
  /** Injectable for tests; production uses the validated, non-secret env issues. */
  issues?: readonly string[];
}

export function ConfigurationNotice({
  issues = getSupabaseConfigurationIssues(),
}: ConfigurationNoticeProps) {
  const { t } = useTranslation();

  if (issues.length === 0) {
    return null;
  }

  return (
    <section
      role="status"
      aria-labelledby="configuration-title"
      className="mt-10 rounded-xl border border-amber-300 bg-amber-50 p-5 text-amber-950 sm:p-6"
    >
      <div className="flex items-start gap-3">
        <AlertTriangle aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />
        <div className="space-y-3">
          <h2 id="configuration-title" className="text-base font-semibold">
            {t('config.title')}
          </h2>
          <p className="text-sm leading-6">{t('config.description')}</p>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-amber-800">
              {t('config.variablesTitle')}
            </h3>
            <ul className="mt-1 space-y-1 font-mono text-xs">
              {SUPABASE_ENV_VARIABLES.map((variable) => (
                <li key={variable}>{variable}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-amber-800">
              {t('config.issuesTitle')}
            </h3>
            <ul className="mt-1 list-inside list-disc space-y-1 text-xs leading-5">
              {issues.map((issue) => (
                <li key={issue}>{issue}</li>
              ))}
            </ul>
          </div>

          <p className="text-xs leading-5">{t('config.hint')}</p>
          <p className="text-xs font-semibold leading-5">{t('config.warning')}</p>
        </div>
      </div>
    </section>
  );
}
