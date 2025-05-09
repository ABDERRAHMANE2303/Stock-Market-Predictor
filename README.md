# 🚀 STOCK MARKET PREDICTOR

A smart web app to help you decide whether to **buy** a stock — powered by AI models, live data, and clean UI.

---

## 🔧 Project Overview

An end-to-end system for stock recommendation using two different prediction models and a frontend dashboard.

---

## 🖥️ Frontend (React)

- Users can search for a stock by symbol.
- Displays predictions from both **LSTM** and **Prophet** models.
- Shows a **Buy/Don't Buy** decision along with **confidence levels**.
- Fetches related stock news via **NewsAPI** or **GNews** directly from the frontend.
- Provides a clean, modern UI with loading states and error handling.

---

## 🧠 Backend (Flask)

- Flask mini API that serves predictions from:
  - ✅ Trained LSTM model
  - ✅ Trained Prophet model
- Receives requests from the frontend and returns:
  - Predicted stock movement
  - Buy signal
  - Confidence score
- Backend does not handle news or frontend assets — only model inference.

---

## 📊 Machine Learning Models

### 📈 Prophet
- Model by Facebook for time-series forecasting.
- Requires columns `ds` (date) and `y` (value).
- Great for trend/seasonality but not very reactive.

### 🔁 LSTM
- Neural network-based approach using TensorFlow/Keras.
- Uses sequences of scaled prices for training.
- More sensitive to short-term variations.

---

## 📚 Workflow & Structure

- **Jupyter Notebooks** used for:
  - Data gathering & cleaning
  - Preprocessing for both models
  - Model training & saving
  - Benchmarking results
- **Shared cleaned dataset** stored as `stocks_cleaned.csv`
- Each model may have separate preprocessing based on requirements

---

## 🧪 Benchmarking

- Run on a historical test set
- Compare **LSTM vs Prophet** using:
  - RMSE, MAE, directional accuracy
  - Buy decision precision
  - Visual plots
- Final notebook displays a summary table + recommendation

---

## 🛠 Tech Stack

- **Frontend**: React, Axios, Tailwind
- **Backend**: Flask, Python 3.11+
- **ML Libraries**: TensorFlow, Keras, Prophet, scikit-learn, pandas
- **Data Source**: yfinance (Yahoo Finance API)
- **Optional News APIs**: NewsAPI / GNews / Dukascopy (scraping)
- **Sentiment** (optional): FinBERT via HuggingFace

---

## 📦 Setup

1. Clone the repo
2. Create Python 3.11 virtual environment
3. Install dependencies:
   ```bash
   pip install -r requirements.txt 
