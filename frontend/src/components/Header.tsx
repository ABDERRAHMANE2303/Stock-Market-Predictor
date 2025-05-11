import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { TrendingUp, Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export const Header = () => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  
  const handleLanguageChange = () => {
    const newLang = i18n.language.startsWith('en') ? 'fr' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50 transition-colors duration-300"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <TrendingUp className="h-10 w-10 text-blue-600 dark:text-blue-400 mr-3" />
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              {t('appTitle')}
            </h1>
          </motion.div>
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Language Selector */}
            <motion.button 
              onClick={handleLanguageChange}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {i18n.language.startsWith('en') ? 'FR' : 'EN'}
              </span>
            </motion.button>
            
            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label={theme === 'light' ? t('darkMode') : t('lightMode')}
            >
              {theme === 'light' ? 
                <Moon className="h-5 w-5 sm:h-6 sm:w-6" /> : 
                <Sun className="h-5 w-5 sm:h-6 sm:w-6" />
              }
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};