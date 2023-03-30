// This file contains helper functions to fetch all kinds of stock data from external API


// from alphaVantage API ---------------------------------------------------

const alphaVantageApiKey = process.env.ALPHAVANTAGE_API_KEY;

// fetch Intraday stock data with default interval of 5min
export const fetchStockIntradayData = async (ticker, interval = '5min', outputsize = 'compact') => {
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=${interval}&adjusted=true&outputsize=${outputsize}&apikey=${alphaVantageApiKey}`
  const response = await fetch(url);
  const data = await response.json();
  return data
}

// fetch Daily Adjusted stock data with default outputsize of compact
export const fetchStockDailyAdjustedData = async (ticker, outputsize = 'compact') => {
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${ticker}&outputsize=${outputsize}&apikey=${alphaVantageApiKey}`
  const response = await fetch(url);
  const data = await response.json();
  return data
}

// fetch Weekly Adjusted stock data
export const fetchStockWeeklyAdjustedData = async (ticker) => {
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=${ticker}&apikey=${alphaVantageApiKey}`
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


// from Polygon API ---------------------------------------------------
const polygonApiKey = process.env.REACT_APP_POLYGON_API_KEY;

// multiplier = 1, timeSpan = "minute" means each data point is 1 min difference
// dateDuration = 0, today's data; dateDuration = 1, last 2 day's data
export const fetchAggStockData = async (ticker, multiplier, timeSpan, dateDuration) => {
  const dateTo = new Date(); // set dateTo as today in local time
  const offset = dateTo.getTimezoneOffset() // get time zone diff w/ UTC timezone
  dateTo.setTime(dateTo.getTime() - (offset*60*1000)) // align UTC time to local time, like 8pm EST show as 8pm UTC

  const dateFrom = new Date();
  dateFrom.setDate(dateFrom.getDate() - dateDuration); // set the starting date of stock data
  dateFrom.setTime(dateFrom.getTime() - (offset*60*1000)) // align UTC time to local time, like 8pm EST show as 8pm UTC
  const to = dateTo.toISOString().slice(0,10); // takes just the "YYYY-MM-DD" portion
  const from = dateFrom.toISOString().slice(0,10); // takes just the "YYYY-MM-DD" portion

  const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/${multiplier}/${timeSpan}/${from}/${to}?apiKey=${polygonApiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
