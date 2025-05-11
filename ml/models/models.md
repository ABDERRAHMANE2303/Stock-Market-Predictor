## 📊 Overview of Models for Stock Market Prediction

This project uses three distinct models—LSTM, Prophet, and XGBoost—each offering unique strengths in time-series forecasting. Below is a breakdown of each.

---

### 🔁 LSTM (Long Short-Term Memory)

- **Type**: Deep Learning, Recurrent Neural Network (RNN), Regression  
- **How it works**: LSTM is designed to remember long-term dependencies via memory cells, gates (input, forget, output), and recurrent connections. It uses backpropagation through time (BPTT) to update weights.  
- **Why good for stocks**: Captures sequential dependencies and patterns in historical price data, crucial for financial time series.  
- **Expected data**: Sequential numeric features, scaled, with a temporal order preserved.  
- **Data cleaning**: Focuses on scaling (MinMaxScaler), ensuring no NaNs, and crafting sequential samples of fixed window size.  
- **Training insights**: Needs reshaped input into 3D format (samples, timesteps, features).  
- **Split**: 80/20 or 90/10 (train/test).  
- **Data per time period**: 2D tabular format before reshaping, ~2500 rows per stock per period.

---

### 📈 Prophet (by Facebook)

- **Type**: Statistical time series model, Additive Regression  
- **How it works**: Models time series as a combination of trend, seasonality, and holidays using piecewise linear or logistic growth curves.  
- **Why good for stocks**: Handles missing data, seasonality, and abrupt trend changes well. Transparent and interpretable.  
- **Expected data**: Two columns: `ds` (datetime), `y` (target value).  
- **Data cleaning**: Minimal—only needs proper datetime format and cleaned price data (`close`), no scaling needed.  
- **Training insights**: Automatically handles date-based splits internally.  
- **Split**: No manual split needed—forecast horizon defined (e.g., 30, 90, 180 days).  
- **Data per time period**: Continuous daily data over the selected period.

---

### ⚡ XGBoost (Extreme Gradient Boosting)

- **Type**: Machine Learning, Ensemble Learning, Regression  
- **How it works**: Boosted decision trees minimize loss through gradient descent. Handles non-linearities, missing data, and interactions well.  
- **Why good for stocks**: Fast, robust to noise, and effective for tabular, engineered features.  
- **Expected data**: Tabular format, with engineered features (technical indicators, time-based).  
- **Data cleaning**: Focus on feature engineering, date decomposition, and scaling with MinMaxScaler.  
- **Training insights**: Can be trained on flat data with no reshaping.  
- **Split**: 80/20 or 70/30 (train/test), depending on horizon.  
- **Data per time period**: ~2500 rows per stock, rich feature set.

---

### 🧠 General Pipeline Insight

- Each model requires different levels of preprocessing.
- **LSTM** demands heavy sequence restructuring and scaling.
- **Prophet** is almost plug-and-play with minimal prep.
- **XGBoost** thrives with manual feature engineering and well-scaled input.
- **Per stock**: 3 models × 3 time spans (30/90/180d) ⇒ 9 CSVs × 20 stocks = 180 CSVs total.
- Each CSV ~2500 rows ⇒ ~450,000 total rows across the project.

This setup balances deep learning, statistical, and ML-based approaches, providing robustness and diversity in forecasting outcomes.
