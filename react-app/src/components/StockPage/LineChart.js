import { useEffect } from "react"
import { fetchStockIntradayData } from "../../utils/FetchStockData"


function LineChart({ ticker }) {


  // fetch stock data from AlphaVantage
  useEffect(async () => {
    const data =await fetchStockIntradayData(ticker.toUpperCase())
    console.log(data)
  },[ticker])

  return (
    <h1>here comes the fancy line chart</h1>
  )
}

export default LineChart
