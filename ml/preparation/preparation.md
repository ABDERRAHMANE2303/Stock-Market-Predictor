# 📦 Data Preparation

- This section is dedicated to data preparation, cleaning, and feature engineering to prepare the dataset for training models.
- There are multiple phases: a general data fetching and cleaning phase, followed by model-specific preparation phases.

---

## 📥 Fetching and Cleaning the Data

- Fetched 10 years of data (2015–2025) for each stock. This range captures various market conditions: pre-COVID, during COVID, post-COVID, and recent global events.
- Initial preparation in this phase includes:
  - Fetching raw stock data using `yfinance`
  - Cleaning and standardizing the dataset

### 🧹 Cleaning Steps

- `reset_index()`  
  ➤ Makes the `Date` a column instead of an index, which simplifies access and manipulation.

- `pd.to_datetime(df['Date'])`  
  ➤ Ensures the date column is in datetime format, which is necessary for time-series models.

- `rename(columns={...})`  
  ➤ Renames all columns to lowercase (e.g., `Open` → `open`) to maintain consistency and avoid case-sensitivity issues later.

- `fillna(method='ffill')` on `open`, `high`, `low`, `close`  
  ➤ Fills missing price values by carrying the last known value forward. This is standard in time-series data to preserve trend continuity when markets are closed or data is missing.

- `fillna(0)` on `volume`, `dividends`, and `splits`  
  ➤ If these values are missing, we assume:
    - No trading happened → `volume = 0`
    - No dividend was issued → `dividends = 0`
    - No stock split occurred → `splits = 0`

This results in a clean and consistent dataset, ready for model-specific feature engineering in the next phases.


## preparing the data for facebook prophet 

## preparing the data for lstm 