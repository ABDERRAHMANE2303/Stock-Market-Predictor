# **STOCK MARKET PREDICTOR**

# **1. Historical Stock Data APIs**

- **Yahoo Finance (via `yfinance` in Python)**
    - Easy to use for stock data retrieval.
    - Example: `yfinance.download("AAPL", start="2023-01-01", end="2024-01-01")`
- **Alpha Vantage**
    - Free tier: 5 requests per minute, 500 per day.
    - [Website](https://www.alphavantage.co/)
- **Polygon.io (Free tier available)**
    - Real-time and historical stock data.
    - [Website](https://polygon.io/)

---

# **2. News & Sentiment Analysis APIs(optional)**

- **NewsAPI**
    - Free tier includes recent headlines from major sources.
    - [Website](https://newsapi.org/)
- **GNews API**
    - A solid alternative with fewer restrictions than NewsAPI.
    - [Website](https://gnews.io/)
- **FinBERT (Sentiment Analysis Model)**
    - A pretrained BERT model fine-tuned on financial text for sentiment analysis.
    - Can be used locally with HuggingFace Transformers.
    - [Website](https://huggingface.co/ProsusAI/finbert)
- **MeaningCloud**
    - Offers sentiment and topic extraction with a free tier.
    - [Website](https://www.meaningcloud.com/products/sentiment-analysis)
- scrapping informations from dukascopy (optional)

---

# **3. Prediction Logic**

- **Buying vs Selling**:
    - **Buying** is the focus of the prediction model.
    - If the model predicts a stock price might rise, the recommendation is **to buy**.
    - The system will also output a **confidence level** for the prediction.
- the model will predict wether u should BUY or not .

---

# **4. Tech Stack**

- **Language**: Python (best ecosystem for ML and data processing)
- **Libraries**:
    - `pandas`, `numpy`, `scikit-learn` – for data preprocessing and machine learning.
    - `yfinance`, `requests`, `newsapi` – for stock and news data fetching.
    - `transformers` – for NLP models like FinBERT.
    - `matplotlib`, `plotly` – for data visualization.

---

# **5. Models to Use**

- **Time Series Prediction**:
    - The stock price prediction will focus on time series data.
    - prophet facebook
    - hugging faces
    - **Long Short-Term Memory Networks (LSTM)** are ideal for this task. (bi)
    - Steps:
        - **Normalize** the data.
        - season
        - Use a **sliding window** to create sequences for LSTM input.
        - **Train** the model to predict future stock prices.

---

# **6. Key Terminology**

| Term | Meaning | Example (for TSLA on a Monday) |
| --- | --- | --- |
| 🟢 **Open** | The price the stock started trading at when the market opened. | `$195.00` |
| 🔴 **Close** | The price the stock ended trading at when the market closed. | `$198.30` |
| 🔼 **High** | The highest price the stock reached during the trading day. | `$199.50` |
| 🔽 **Low** | The lowest price the stock reached during the trading day. | `$194.75` |
| 📊 **Volume** | The total number of shares traded during the day. Indicates how active the stock was. | `5,200,000 shares` |

---

# **7. App Functionality**

- **Input**:
    - User inputs the stock symbol (e.g., `AAPL`).
- **Data Fetching**:
    - The app fetches the stock’s historical data via the chosen API (Yahoo Finance, Alpha Vantage, etc.).
- **Training**:
    - The app processes the data, normalizes it, and prepares sequences for training the model.
- **Prediction**:
    - The model predicts whether to **buy** the stock with a **confidence level and a reason**.
- **News Integration**:
    - The app fetches the latest news related to the stock via a news API (NewsAPI, GNews API).
    - This data is displayed alongside the prediction to assist the user in making a decision.
- **Pretrained Models**:
    - Some popular stocks can have pretrained models, allowing faster predictions without retraining each time.