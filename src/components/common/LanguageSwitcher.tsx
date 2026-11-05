import { Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/use-language';
import { SUPPORTED_LANGUAGES, type Language } from '@/types/app';

const LANGUAGE_LABELS: Record<Language, string> = {
  bn: 'বাংলা',
  en: 'English',
};

export function LanguageSwitcher() {
  const { t } = useTranslation();
  const { language, changeLanguage } = useLanguage();

  return (
    <div
      role="group"
      aria-label={t('nav.language')}
      className="inline-flex items-center gap-1 rounded-md border border-border bg-card p-1"
    >
      <Languages aria-hidden="true" className="mx-1 h-4 w-4 text-muted-foreground" />
      {SUPPORTED_LANGUAGES.map((option) => (
        <Button
          key={option}
          size="sm"
          variant={language === option ? 'default' : 'ghost'}
          aria-pressed={language === option}
          onClick={() => void changeLanguage(option)}
        >
          {LANGUAGE_LABELS[option]}
        </Button>
      ))}
    </div>
  );
}
