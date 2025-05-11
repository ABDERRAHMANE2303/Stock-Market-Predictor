import { useTranslation } from 'react-i18next';

export const Footer = ({ hasNewsApiKey = false }) => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-6 transition-colors duration-300">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          © {currentYear} {t('appTitle')}. {t('tagline')}.
        </p>
        {hasNewsApiKey && (
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{t('poweredBy')}</p>
        )}
      </div>
    </footer>
  );
};