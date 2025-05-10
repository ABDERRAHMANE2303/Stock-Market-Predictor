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


## 📥 Preparing the Data for Prophet

- In this phase, we prepare the stock data to be used by the Prophet model, which requires a specific format and the inclusion of additional features for better predictions.
- The main steps include:
  - Renaming columns to match Prophet's requirements
  - Selecting relevant columns for the basic model and adding additional regressors for improved forecasting
  - Adding prediction targets for future price forecasting
  
### 🔄 Data Transformation Steps

- **Renaming columns**  
  ➤ Prophet requires specific column names: `ds` for the date and `y` for the target variable (close price). Thus, we rename the columns accordingly:  
  - `date` → `ds`  
  - `close` → `y`

- **Selecting necessary columns**  
  ➤ For the basic Prophet model, we select only the `ds` (date) and `y` (close price) columns, but we can also add extra regressors (e.g., moving averages, volatility, and other stock indicators) to help improve the model's accuracy. This is done by checking if the additional columns exist in the dataframe and including them in the final dataset.

- **Adding additional regressors**  
  ➤ Regressors such as `open`, `high`, `low`, `volume`, `ma5`, `ma20`, `ma50`, `volatility`, `volume_ma20`, and `return` are added, as they may contribute to the prediction by providing context beyond just the closing price.

- **Prediction target for future prices**  
  ➤ We optionally add columns for predicting the next day's close price (`next_day_y`) and whether the price went up (`price_up`). These columns can be used for longer-term forecasts.

### 📊 Saving Processed Data

- **Input file**  
  ➤ Each stock's cleaned data (CSV file) is read into a DataFrame.

- **Output file**  
  ➤ The processed data is saved to a new CSV file, ready for Prophet.

- **Summary statistics**  
  ➤ After processing, statistics about each stock's data (such as the number of rows, price range, and file size) are collected for reference.

### 📝 Final Output

- The data is saved in the `data/prophet` folder, with each stock having its own corresponding file in CSV format (e.g., `AAPL_prophet.csv`).
- A summary table is created to track the processed stocks and their associated statistics, making it easy to track progress and assess the dataset's characteristics.

By following these steps, the data is now ready to be fed into the Prophet model for time-series forecasting.
 

## 📥 Preparing Data for LSTM

- The data for the LSTM model is prepared by transforming and scaling the features to ensure they are on the same scale, making the model training more efficient. This process includes additional feature engineering, scaling, and creating target variables.

### 🧹 Data Preparation Steps

- **Copy the dataframe**  
  ➤ A copy of the dataframe is made to avoid modifying the original data during the process.

- **Convert the 'date' column to datetime**  
  ➤ Ensures the `date` column is in the proper datetime format for time-series processing.

- **Feature selection**  
  ➤ A set of features relevant to stock price prediction is selected, including:
  - `open`, `high`, `low`, `close`, `volume` (basic stock data)
  - Technical indicators like `ma5`, `ma20`, `ma50` (moving averages), `volatility`, `volume_ma20`, `return` (price return)
  - Time-based features: `day_of_week`, `month`
  
  These features are filtered to keep only the ones present in the dataset.

- **Scaling the features**  
  ➤ The selected features are scaled using the **MinMaxScaler** to ensure they are normalized and on the same scale (between 0 and 1), which improves the performance of the LSTM model. This step is applied to the following:
  - Basic stock data (`open`, `high`, `low`, `close`, `volume`)
  - Technical indicators (`ma5`, `ma20`, `ma50`, `volatility`, `volume_ma20`, `return`)
  - Time-based features (`day_of_week`, `month`)
  
  Each feature is scaled independently to avoid one feature dominating others due to its magnitude.

- **Add target variables**  
  ➤ If present, additional columns are added for the model's target:
  - `next_day_close`: The closing price of the next day, scaled.
  - `price_up`: A binary classification target indicating whether the stock price went up or down.

- **Add scaler parameters as metadata**  
  ➤ Min and max values for each feature are stored as metadata in the dataset (`_min`, `_max`). These values are essential for **inverse scaling** when interpreting the model's predictions.

- **Scaling for specific targets**  
  ➤ A separate **scaler** is used for the closing price (`next_day_close`) to ensure proper scaling and inverse transformation. This is crucial when predicting actual price values after the model's output is decoded.

### 📝 Output

- The final dataset includes:
  - Scaled features (e.g., `open_scaled`, `close_scaled`, `ma5_scaled`, etc.)
  - Target variables (`next_day_close_scaled`, `price_up`)
  - Metadata for inverse scaling (`_min`, `_max` for each feature)
  
This prepared data is now ready for training the LSTM model, where the model will learn patterns from the scaled input features to predict the next day's stock price and classify the price direction (up or down).
