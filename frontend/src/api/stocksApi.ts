import axios from 'axios';
import { Stock, PredictionData, Period, NewsArticle } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY || 'YOUR_NEWS_API_KEY';
const NEWS_API_URL = 'https://newsapi.org/v2/everything';

export const fetchStocks = async (): Promise<Stock[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/stocks`);
    return response.data;
  } catch (error) {
    console.error('Error fetching stocks:', error);
    throw error;
  }
};

export const fetchPrediction = async (
  stockSymbol: string, 
  period: Period
): Promise<PredictionData> => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/predict/${stockSymbol}/${period}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching prediction:', error);
    throw error;
  }
};

export const fetchNews = async (
  stockName: string,
  stockSymbol: string,
  language: string
): Promise<NewsArticle[]> => {
  if (NEWS_API_KEY === 'YOUR_NEWS_API_KEY') {
    console.warn("NewsAPI key not configured. Skipping news fetch.");
    return [];
  }

  try {
    const query = `${stockName} OR ${stockSymbol} stock`;
    const response = await axios.get(NEWS_API_URL, {
      params: {
        q: query,
        apiKey: NEWS_API_KEY,
        language: language.split('-')[0],
        pageSize: 5,
        sortBy: 'relevancy',
      },
    });
    return response.data.articles || [];
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
};