export interface Stock {
  symbol: string;
  name: string;
  emoji: string;
  domain: string;
  justification: string;
}

export interface ModelPrediction {
  direction: 'up' | 'down';
  price: number;
}

export interface PredictionData {
  stock: string;
  period: Period;
  predictions: Record<string, ModelPrediction>;
}

export type Period = 'next_day' | 'next_week' | 'next_month';

export type PeriodOption = {
  value: Period;
  labelKey: string;
};

export type NewsArticle = {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  source: {
    name: string;
  };
};

export type RecommendationType = 'buy' | 'sell' | 'hold';