// This file contains helper functions to fetch all kinds of stock data from alphaVantage API

const apiKey = process.env.ALPHAVANTAGE_API_KEY;

// fetch Intraday stock data with default interval of 5min
export const fetchStockIntradayData = async (ticker, interval = '5min') => {
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=${interval}&adjusted=true&outputsize=compact&apikey=${apiKey}`
  const response = await fetch(url);
  const data = await response.json();
  return data
}
