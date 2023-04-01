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
  const today = new Date(); // set today as today in local time
  const dayOfWeek = today.getDay(); // 0 is Sunday
  // move to and from to Fri on weekends
  // if today is Sat, last business date should be Fri (-1)
  // if today is Sun, last business date should be Fri (-2)
  // the rest is good
  const daysToSubtract = dayOfWeek === 6 ? 1
    : dayOfWeek === 0 ? 2 : 0;
  const offset = today.getTimezoneOffset() // get time zone diff w/ UTC timezone
  today.setTime(today.getTime() - (offset*60*1000) - (daysToSubtract * 24 * 60 * 60 * 1000)) // align UTC time to local time, like 8pm EST show as 8pm UTC

  const dateFrom = new Date();
  dateFrom.setDate(dateFrom.getDate() - dateDuration); // set the starting date of stock data
  dateFrom.setTime(dateFrom.getTime() - (offset*60*1000) - (daysToSubtract * 24 * 60 * 60 * 1000)) // align UTC time to local time, like 8pm EST show as 8pm UTC
  const to = today.toISOString().slice(0,10); // takes just the "YYYY-MM-DD" portion
  const from = dateFrom.toISOString().slice(0,10); // takes just the "YYYY-MM-DD" portion
  // console.log("to and from", to, from)

  const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/${multiplier}/${timeSpan}/${from}/${to}?apiKey=${polygonApiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

// fetch current day's snapshots data for a specific stock, including one day dollar and percentage change
export const fetchSnapshotsTicker = async (ticker) => {
  const url = `https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers/${ticker}?apiKey=${polygonApiKey}`
  const response = await fetch(url);
  const data = await response.json();
  return data
}

// fetch all US tickers supported by polygon on T-1 business day to avoid market open/close data unavailability
export const fetchAllTickers = async () => {
  const today = new Date(); // set dateTo as today in local time
  const dayOfWeek = today.getDay(); // 0 is Sunday
  // if today is Mon, last business date should be Fri (-3)
  // if today is Sun, last business date should be Fri (-2)
  // if today is Sat, last business date should be Fri (-1)
  // the rest is simply -1
  const daysToSubtract = dayOfWeek === 1 ? 3
    : dayOfWeek === 0 ? 2 : dayOfWeek === 6 ? 1 : 1;
  const offset = today.getTimezoneOffset() // get time zone diff w/ UTC timezone
  // align UTC time to local time, like 8pm EST show as 8pm UTC and subtract to previous business day
  today.setTime(today.getTime() - (offset * 60 * 1000) - (daysToSubtract * 24 * 60 * 60 * 1000))
  const to = today.toISOString().slice(0,10); // takes just the "YYYY-MM-DD" portion

  const url = `https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/${to}?adjusted=true&apiKey=${polygonApiKey}`
  const response = await fetch(url);
  const data = await response.json();
  return data
}

// fetch company information
export const fetchTickerDetails = async (ticker) => {
  const url = `https://api.polygon.io/v3/reference/tickers/${ticker}?apiKey=${polygonApiKey}`
  const response = await fetch(url);
  const data = await response.json();
  return data
}


// fetch specific stock's news
export const fetchStockNews = async (ticker) => {
  const url = `https://api.polygon.io/v2/reference/news?ticker=AAPL&apiKey=${polygonApiKey}`
  const response = await fetch(url);
  const data = await response.json();
  return data
}


export const stockDoDChange = async (ticker) => {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 is Sunday
  // if today is Mon, fromDate should be Fri (-3)
  // if today is Sun, fromDate should be Thur (-3), so compare Fri vs. Thur
  // if today is Sat, fromDate should be Thur (-2), so compare Fri vs. Thur
  // the rest is simply comparing today vs. yeasterday
  const daysToSubtract = dayOfWeek === 1 ? 3
    : dayOfWeek === 0 ? 3 : dayOfWeek === 6 ? 2 : 2;
  console.log("daysToSubtract",daysToSubtract)
  const data = await fetchAggStockData(ticker, 1, "day", daysToSubtract)
  console.log("data in stockDoDChange", data)
  const todayPrice = data.results[0].c
  const priorDayPrice = data.results[1].c
  console.log("todayPrice",todayPrice)
  const DoD$Change = todayPrice - priorDayPrice
  const DoDPercChange = (todayPrice - priorDayPrice) / priorDayPrice
  console.log(DoD$Change, DoDPercChange)
  return DoD$Change
}
