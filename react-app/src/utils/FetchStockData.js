// This file contains helper functions to fetch all kinds of stock data from alphaVantage API


export const fetchStockIntradayData = async (ticker, interval = '5min') => {
  const apiKey = process.env.ALPHAVANTAGE_API_KEY;
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=${interval}&adjusted=true&outputsize=compact&apikey=${apiKey}`
  const response = await fetch(url);
  const data = await response.json();
  return data
}
