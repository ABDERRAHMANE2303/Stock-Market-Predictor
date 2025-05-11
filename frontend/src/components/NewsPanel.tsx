import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Newspaper, HelpCircle } from 'lucide-react';
import { NewsArticle } from '../types';
import { Card } from './UI/Card';
import { Loading } from './UI/Loading';

interface NewsPanelProps {
  news: NewsArticle[];
  isLoading: boolean;
  selectedStock: { symbol: string } | null;
  hasNewsApiKey: boolean;
}

export const NewsPanel = ({ 
  news, 
  isLoading, 
  selectedStock,
  hasNewsApiKey
}: NewsPanelProps) => {
  const { t, i18n } = useTranslation();

  // Animation variants
  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <Card>
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center">
        <Newspaper className="h-6 w-6 mr-2 text-purple-500 dark:text-purple-400" />
        {selectedStock ? 
          t('newsFeed', { stock: selectedStock.symbol }) : 
          t('newsFeed', { stock: '' })
        }
      </h2>

      {!hasNewsApiKey && (
        <div className="p-3 bg-yellow-100 dark:bg-yellow-800 border border-yellow-300 dark:border-yellow-600 rounded-md text-yellow-700 dark:text-yellow-200 text-sm mb-4">
          {t('poweredBy')}. Please set VITE_NEWS_API_KEY in your .env file to enable news.
        </div>
      )}

      {isLoading ? (
        <Loading text={`${t('loading')} News...`} />
      ) : news.length > 0 ? (
        <motion.ul 
          className="space-y-4 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600"
          variants={listVariants}
          initial="hidden"
          animate="visible"
        >
          {news.map((article, index) => (
            <motion.li 
              key={index} 
              className="pb-4 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
              variants={itemVariants}
              transition={{ duration: 0.3 }}
            >
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-md transition-colors"
              >
                <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-1 line-clamp-2">{article.title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{article.description}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  {new Date(article.publishedAt).toLocaleDateString(i18n.language)} - {article.source.name}
                </p>
              </a>
            </motion.li>
          ))}
        </motion.ul>
      ) : (
        <div className="text-center py-10 text-gray-500 dark:text-gray-400">
          <HelpCircle className="h-10 w-10 mx-auto mb-2" />
          {hasNewsApiKey ? (
            selectedStock ? t('noNews') : t('chooseStockFirst')
          ) : ""}
        </div>
      )}
    </Card>
  );
};