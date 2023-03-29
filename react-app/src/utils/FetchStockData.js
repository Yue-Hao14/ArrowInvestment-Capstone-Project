// This file contains helper functions to fetch all kinds of stock data from alphaVantage API

const apiKey = process.env.ALPHAVANTAGE_API_KEY;

// fetch Intraday stock data with default interval of 5min
export const fetchStockIntradayData = async (ticker, interval = '5min', outputsize = 'compact') => {
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=${interval}&adjusted=true&outputsize=${outputsize}&apikey=${apiKey}`
  const response = await fetch(url);
  const data = await response.json();
  return data
}

// fetch Daily Adjusted stock data with default outputsize of compact
export const fetchStockDailyAdjustedData = async (ticker, outputsize = 'compact') => {
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${ticker}&outputsize=${outputsize}&apikey=${apiKey}`
  const response = await fetch(url);
  const data = await response.json();
  return data
}

// fetch Weekly Adjusted stock data
export const fetchStockWeeklyAdjustedData = async (ticker) => {
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=${ticker}&apikey=${apiKey}`
  const response = await fetch(url);
  const data = await response.json();
  return data
}

//
export const stockOneDayChange = async (ticker) => {
  const data = await fetchStockDailyAdjustedData(ticker);
  // console.log("data in stockOneDayChange function", data)
  const stockDataArr = Object.values(data["Time Series (Daily)"]);
  const closeLatest = Number(stockDataArr[0]["4. close"])
  const closePre = Number(stockDataArr[1]["4. close"])
  const DoD$Change = closeLatest - closePre
  const DoDPercChange = (closeLatest - closePre) / closePre
  return {
    DoD$Change,
    DoDPercChange
  }
}
