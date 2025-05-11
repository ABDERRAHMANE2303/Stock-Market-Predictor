import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { TrendingUp, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { Stock, Period, PeriodOption } from '../types';
import { Select } from './UI/Select';
import { Button } from './UI/Button';
import { Card } from './UI/Card';

interface StockSelectorProps {
  stocks: Stock[];
  selectedStock: Stock | null;
  selectedPeriod: Period;
  onStockChange: (stock: Stock | null) => void;
  onPeriodChange: (period: Period) => void;
  onGetPrediction: () => void;
  isLoading: boolean;
}

export const StockSelector = ({
  stocks,
  selectedStock,
  selectedPeriod,
  onStockChange,
  onPeriodChange,
  onGetPrediction,
  isLoading
}: StockSelectorProps) => {
  const { t } = useTranslation();
  const [showStockInfo, setShowStockInfo] = useState(false);

  const periodOptions: PeriodOption[] = [
    { value: 'next_day', labelKey: 'tomorrow' },
    { value: 'next_week', labelKey: 'nextWeek' },
    { value: 'next_month', labelKey: 'nextMonth' },
  ];

  const stockOptions = stocks.map(stock => ({
    value: stock.symbol,
    label: (
      <div className="flex items-center">
        <span className="mr-2">{stock.emoji}</span>
        <span>{stock.name}</span>
        <span className="ml-2 text-gray-500 dark:text-gray-400">({stock.symbol})</span>
      </div>
    )
  }));

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stock Selector */}
        <Card>
          <Select
            label={t('selectStock')}
            options={stockOptions}
            value={selectedStock?.symbol || ''}
            onChange={(value) => {
              const stock = stocks.find(s => s.symbol === value);
              onStockChange(stock || null);
              setShowStockInfo(false);
            }}
            placeholder={t('selectStock')}
          />
        </Card>

        {/* Period Selector */}
        <Card>
          <p className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('selectPeriod')}
          </p>
          <div className="flex space-x-2">
            {periodOptions.map(option => (
              <Button
                key={option.value}
                onClick={() => onPeriodChange(option.value as Period)}
                variant={selectedPeriod === option.value ? 'primary' : 'outline'}
                size="md"
                fullWidth
              >
                {t(option.labelKey)}
              </Button>
            ))}
          </div>
        </Card>

        {/* Get Prediction Button */}
        <Card className="flex items-center justify-center">
          <Button
            onClick={onGetPrediction}
            disabled={!selectedStock || isLoading}
            variant="primary"
            size="lg"
            fullWidth
            icon={isLoading ? <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}><TrendingUp className="h-5 w-5" /></motion.div> : <TrendingUp className="h-5 w-5" />}
          >
            {t('getPrediction')}
          </Button>
        </Card>
      </div>

      {/* Stock Info Section */}
      {selectedStock && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <button
            onClick={() => setShowStockInfo(!showStockInfo)}
            className="flex items-center justify-between w-full text-left px-4 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
          >
            <div className="flex items-center">
              <Info className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
              <span className="font-semibold text-gray-700 dark:text-gray-200">
                {t('stockInfo')} for {selectedStock.name}
              </span>
            </div>
            {showStockInfo ? 
              <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400" /> : 
              <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            }
          </button>
          
          {showStockInfo && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-2"
            >
              <Card className="border border-gray-200 dark:border-gray-700">
                <div className="space-y-3">
                  <div>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{t('domain')}:</span>
                    <span className="ml-2 text-gray-600 dark:text-gray-400">{selectedStock.domain}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{t('justification')}:</span>
                    <p className="mt-1 text-gray-600 dark:text-gray-400">{selectedStock.justification}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
};