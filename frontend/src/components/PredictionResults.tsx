import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, HelpCircle } from 'lucide-react';
import { PredictionData, RecommendationType, PeriodOption } from '../types';
import { Card } from './UI/Card';
import { Loading } from './UI/Loading';

interface PredictionResultsProps {
  prediction: PredictionData | null;
  isLoading: boolean;
  hasStockSelected: boolean;
  recommendation: RecommendationType | null;
  periodOptions: PeriodOption[];
  error: string | null;
}

export const PredictionResults = ({
  prediction,
  isLoading,
  hasStockSelected,
  recommendation,
  periodOptions,
  error
}: PredictionResultsProps) => {
  const { t } = useTranslation();

  const tableVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (isLoading) {
    return (
      <Card className="lg:col-span-2">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
          {t('predictions')}
        </h2>
        <Loading text={`${t('loading')} Predictions...`} size="lg" />
      </Card>
    );
  }

  const getRecommendationStyles = (type: RecommendationType) => {
    switch (type) {
      case 'buy':
        return 'bg-green-100 dark:bg-green-900/30 border-green-500 text-green-600 dark:text-green-300';
      case 'sell':
        return 'bg-red-100 dark:bg-red-900/30 border-red-500 text-red-600 dark:text-red-300';
      case 'hold':
        return 'bg-amber-100 dark:bg-amber-900/30 border-amber-500 text-amber-600 dark:text-amber-300';
      default:
        return '';
    }
  };

  return (
    <Card className="lg:col-span-2">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
        {prediction ? 
          t('predictionsFor', { 
            stock: prediction.stock, 
            periodName: t(periodOptions.find(p => p.value === prediction.period)?.labelKey || '')
          }) : 
          t('predictions')
        }
      </h2>

      {prediction ? (
        <div>
          <motion.table 
            className="w-full min-w-max text-left"
            variants={tableVariants}
            initial="hidden"
            animate="visible"
          >
            <thead className="border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="py-3 px-4 font-semibold text-gray-600 dark:text-gray-300">{t('model')}</th>
                <th className="py-3 px-4 font-semibold text-gray-600 dark:text-gray-300">{t('direction')}</th>
                <th className="py-3 px-4 font-semibold text-gray-600 dark:text-gray-300">{t('predictedPrice')}</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(prediction.predictions).map(([modelName, modelPred], index) => (
                <motion.tr 
                  key={modelName} 
                  className="border-b border-gray-100 dark:border-gray-750 last:border-b-0"
                  variants={rowVariants}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-200 font-medium">{modelName}</td>
                  <td className={`py-3 px-4 font-semibold ${modelPred.direction === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                    <motion.span 
                      className="flex items-center"
                      initial={{ y: 0 }}
                      animate={{ y: modelPred.direction === 'up' ? [-2, 0, -2] : [2, 0, 2] }}
                      transition={{ duration: 2, repeat: Infinity, repeatType: 'loop' }}
                    >
                      {modelPred.direction === 'up' ? 
                        <TrendingUp className="h-4 w-4 mr-1" /> : 
                        <TrendingDown className="h-4 w-4 mr-1" />
                      }
                      {t(modelPred.direction)}
                    </motion.span>
                  </td>
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-200">${modelPred.price.toFixed(2)}</td>
                </motion.tr>
              ))}
            </tbody>
          </motion.table>

          {recommendation && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className={`mt-8 p-6 rounded-lg text-center ${getRecommendationStyles(recommendation)} border-l-4`}
            >
              <motion.h3 
                className="text-xl font-semibold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {t('recommendation')}:
                <motion.span 
                  className="ml-2 font-bold"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  {t(recommendation)}
                </motion.span>
              </motion.h3>
            </motion.div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-10 text-gray-500 dark:text-gray-400">
          <HelpCircle className="h-12 w-12 mb-2" />
          <p className="text-center">
            {!hasStockSelected ? 
              t('chooseStockFirst') : 
              error || t('noPredictionData')
            }
          </p>
        </div>
      )}
    </Card>
  );
};