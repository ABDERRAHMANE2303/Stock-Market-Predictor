import os
from flask import Flask, jsonify, request, abort
from flask_cors import CORS

# Import your custom model prediction function
# Ensure this file and function exist
from predict import get_predictions_from_my_models

# --- Configuration ---
app = Flask(__name__)
CORS(app)  # Allows all origins for development.
# For production, restrict origins: CORS(app, resources={r"/api/*": {"origins": "YOUR_FRONTEND_URL"}})

# --- Stock Data (as provided by you) ---
STOCKS_DATA = [
    {"symbol": "AAPL", "name": "Apple Inc.", "emoji": "📱", "domain": "Technology",
        "justification": "One of the most valuable tech companies, a leader in consumer electronics."},
    {"symbol": "MSFT", "name": "Microsoft Corporation", "emoji": "💻", "domain": "Technology",
        "justification": "Major player in cloud computing, software, and enterprise solutions."},
    {"symbol": "GOOG", "name": "Alphabet Inc. (Google)", "emoji": "🌐", "domain": "Technology",
     "justification": "A key company in digital advertising, cloud computing, and AI."},
    {"symbol": "AMZN", "name": "Amazon.com, Inc.", "emoji": "🛒", "domain": "E-Commerce & Cloud Computing",
        "justification": "Global leader in e-commerce and cloud services."},
    {"symbol": "TSLA", "name": "Tesla, Inc.", "emoji": "🚗", "domain": "Electric Vehicles",
        "justification": "Pioneer in electric vehicles and clean energy, highly volatile stock."},
    {"symbol": "META", "name": "Meta Platforms, Inc.", "emoji": "📱", "domain": "Social Media & Technology",
        "justification": "Dominant social media company, leader in virtual reality and AI initiatives."},
    {"symbol": "NVDA", "name": "NVIDIA Corporation", "emoji": "🎮", "domain": "Semiconductors & Technology",
        "justification": "Leader in graphics processing units (GPUs), AI, and gaming."},
    {"symbol": "SPY", "name": "SPDR S&P 500 ETF Trust", "emoji": "📈",
        "domain": "Exchange-Traded Fund (ETF)", "justification": "Tracks the S&P 500 index, great for comparing individual stock performance."},
    {"symbol": "V", "name": "Visa Inc.", "emoji": "💳", "domain": "Financial Services",
        "justification": "Major player in global payments, highly correlated with economic health."},
    {"symbol": "DIS", "name": "The Walt Disney Company", "emoji": "🎥", "domain": "Entertainment",
        "justification": "Leader in entertainment and media, large portfolio of brands."},
    {"symbol": "NFLX", "name": "Netflix, Inc.", "emoji": "📺", "domain": "Streaming & Entertainment",
        "justification": "Dominates global streaming services, highly sensitive to user growth."},
    {"symbol": "PYPL", "name": "PayPal Holdings, Inc.", "emoji": "💵", "domain": "Financial Technology",
        "justification": "Leader in online payment solutions, growing rapidly in digital wallets."},
    {"symbol": "BABA", "name": "Alibaba Group", "emoji": "🏬", "domain": "E-Commerce & Technology",
        "justification": "China’s e-commerce giant, widely used in global markets."},
    {"symbol": "IBM", "name": "International Business Machines Corporation", "emoji": "🖥️", "domain": "Technology & Consulting",
        "justification": "Traditional tech company focusing on cloud computing, AI, and consulting."},
    {"symbol": "AMD", "name": "Advanced Micro Devices, Inc.", "emoji": "💻", "domain": "Semiconductors",
        "justification": "Strong competitor to Intel in processors and GPUs."},
    {"symbol": "BA", "name": "The Boeing Company", "emoji": "✈️", "domain": "Aerospace & Defense",
        "justification": "One of the biggest aerospace manufacturers, highly influenced by global trade and defense budgets."},
    {"symbol": "INTC", "name": "Intel Corporation", "emoji": "🖥️", "domain": "Semiconductors",
        "justification": "Major semiconductor company, key player in computer processing."},
    {"symbol": "T", "name": "AT&T Inc.", "emoji": "📞", "domain": "Telecommunications",
        "justification": "Key player in telecom and media, large scale in the US market."},
    {"symbol": "GS", "name": "Goldman Sachs Group, Inc.", "emoji": "💹", "domain": "Financial Services",
        "justification": "A leading global investment bank and financial services company."},
    {"symbol": "NKE", "name": "Nike, Inc.", "emoji": "👟", "domain": "Retail & Sportswear",
        "justification": "A dominant global player in sportswear, highly driven by consumer trends and global events."}
]
VALID_STOCK_SYMBOLS = [s["symbol"] for s in STOCKS_DATA]
VALID_PERIODS = ["next_day", "next_week", "next_month"]

# --- API Endpoints ---


@app.route('/api/stocks', methods=['GET'])
def get_available_stocks():
    """Returns the list of available stocks with their details."""
    return jsonify(STOCKS_DATA)


@app.route('/api/predict/<stock_symbol>/<period>', methods=['GET'])
def get_stock_prediction(stock_symbol, period):
    """
    Fetches predictions for a given stock and period.
    Calls your model prediction logic from model_predictor.py.
    """
    stock_symbol_upper = stock_symbol.upper()
    period_lower = period.lower()

    if stock_symbol_upper not in VALID_STOCK_SYMBOLS:
        abort(
            404, description=f"Stock symbol '{stock_symbol_upper}' not supported.")
    if period_lower not in VALID_PERIODS:
        abort(
            400, description=f"Period '{period_lower}' not valid. Choose from {VALID_PERIODS}.")

    try:
        # This calls your function from model_predictor.py
        prediction_results = get_predictions_from_my_models(
            stock_symbol_upper, period_lower)

        if not prediction_results or "predictions" not in prediction_results:
            app.logger.error(
                f"Invalid prediction format from model for {stock_symbol_upper}/{period_lower}")
            abort(500, description="Model returned an invalid prediction format.")

        return jsonify(prediction_results)

    except Exception as e:
        app.logger.error(
            f"Error during model prediction for {stock_symbol_upper}/{period_lower}: {e}")
        abort(500, description="An error occurred while processing your request for predictions.")


# --- Error Handlers ---
@app.errorhandler(400)
def bad_request(error):
    return jsonify(error=str(error.description), code=400), 400


@app.errorhandler(404)
def not_found(error):
    return jsonify(error=str(error.description), code=404), 404


@app.errorhandler(500)
def internal_server_error(error):
    return jsonify(error=str(error.description), code=500), 500


if __name__ == '__main__':
    # Consider loading models here if they are large and `get_predictions_from_my_models` doesn't handle it
    # For example, by calling a function in model_predictor like `model_predictor.load_all_models()`
    port = int(os.environ.get('PORT', 5001))  # Default to 5001 if PORT not set
    app.run(debug=os.environ.get('FLASK_DEBUG', '1')
            == '1', host='0.0.0.0', port=port)
