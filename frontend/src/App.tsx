import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';
import { Stock, PredictionData, Period, NewsArticle, PeriodOption, RecommendationType } from './types';
import { fetchStocks, fetchPrediction, fetchNews } from './api/stocksApi';
import { Header } from './components/Header';
import { StockSelector } from './components/StockSelector';
import { PredictionResults } from './components/PredictionResults';
import { NewsPanel } from './components/NewsPanel';
import { Footer } from './components/Footer';
import { Alert } from './components/UI/Alert';
import { Loading } from './components/UI/Loading';

// Constants
const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY || 'YOUR_NEWS_API_KEY';

function App() {
  const { t, i18n } = useTranslation();
  
  // State
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('next_day');
  const [prediction, setPrediction] = useState<PredictionData | null>(null);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loadingStocks, setLoadingStocks] = useState(true);
  const [loadingPrediction, setLoadingPrediction] = useState(false);
  const [loadingNews, setLoadingNews] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Period options for reuse
  const periodOptions: PeriodOption[] = [
    { value: 'next_day', labelKey: 'tomorrow' },
    { value: 'next_week', labelKey: 'nextWeek' },
    { value: 'next_month', labelKey: 'nextMonth' },
  ];

  // Fetch stocks on mount
  useEffect(() => {
    const getStocks = async () => {
      try {
        setLoadingStocks(true);
        const stocksData = await fetchStocks();
        setStocks(stocksData);
      } catch (err) {
        console.error("Error fetching stocks:", err);
        setError(t('errorFetchingStocks'));
      } finally {
        setLoadingStocks(false);
      }
    };
    
    getStocks();
  }, [t]);

  // Fetch news when stock changes
  useEffect(() => {
    const getNews = async () => {
      if (!selectedStock) {
        setNews([]);
        return;
      }
      
      try {
        setLoadingNews(true);
        const newsData = await fetchNews(
          selectedStock.name,
          selectedStock.symbol,
          i18n.language
        );
        setNews(newsData);
      } catch (err) {
        console.error("Error fetching news:", err);
      } finally {
        setLoadingNews(false);
      }
    };
    
    getNews();
  }, [selectedStock, i18n.language]);

  // Handle stock selection
  const handleStockChange = (stock: Stock | null) => {
    setSelectedStock(stock);
    setPrediction(null);
    setNews([]);
    setError(null);
  };

  // Handle period selection
  const handlePeriodChange = (period: Period) => {
    setSelectedPeriod(period);
    setPrediction(null);
  };

  // Handle prediction request
  const handleGetPrediction = async () => {
    if (!selectedStock) {
      setError(t('chooseStockFirst'));
      return;
    }
    
    try {
      setLoadingPrediction(true);
      setError(null);
      setPrediction(null);
      
      const predictionData = await fetchPrediction(
        selectedStock.symbol,
        selectedPeriod
      );
      
      setPrediction(predictionData);
    } catch (err) {
      console.error("Error fetching prediction:", err);
      setError(t('errorFetchingPrediction'));
    } finally {
      setLoadingPrediction(false);
    }
  };

  // Calculate recommendation based on predictions
  const overallRecommendation = useMemo<RecommendationType | null>(() => {
    if (!prediction) return null;
    
    const directions = Object.values(prediction.predictions).map(p => p.direction);
    const upVotes = directions.filter(d => d === 'up').length;
    const downVotes = directions.filter(d => d === 'down').length;

    if (upVotes > downVotes) return 'buy';
    if (downVotes > upVotes) return 'sell';
    return 'hold';
  }, [prediction]);

  // Show loading screen during initial load
  if (loadingStocks) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-900 p-4">
        <Loading className="text-white" size="lg" />
        <p className="text-white text-2xl font-semibold mt-4">{t('loading')} {t('appTitle')}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center text-lg text-gray-600 dark:text-gray-400 mb-10 italic"
        >
          {t('tagline')}
        </motion.p>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-6"
            >
              <Alert type="error" message={error} />
            </motion.div>
          )}
        </AnimatePresence>

        <StockSelector
          stocks={stocks}
          selectedStock={selectedStock}
          selectedPeriod={selectedPeriod}
          onStockChange={handleStockChange}
          onPeriodChange={handlePeriodChange}
          onGetPrediction={handleGetPrediction}
          isLoading={loadingPrediction}
        />

        {(loadingPrediction || prediction || loadingNews || news.length > 0 || selectedStock) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10"
          >
            <PredictionResults
              prediction={prediction}
              isLoading={loadingPrediction}
              hasStockSelected={!!selectedStock}
              recommendation={overallRecommendation}
              periodOptions={periodOptions}
              error={error}
            />
            
            <NewsPanel
              news={news}
              isLoading={loadingNews}
              selectedStock={selectedStock}
              hasNewsApiKey={NEWS_API_KEY !== 'YOUR_NEWS_API_KEY'}
            />
          </motion.div>
        )}
      </main>
      
      <Footer hasNewsApiKey={NEWS_API_KEY !== 'YOUR_NEWS_API_KEY'} />
    </div>
  );
}

export default App;