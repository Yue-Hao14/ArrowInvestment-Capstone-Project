import { NavLink } from "react-router-dom";
// import OneDayChart from "../StockPage/AlphaVantageStockCharts/OneDayChart";
import { stockDoDChange } from "../../utils/FetchStockData";
import './WatchlistDetailsSection.css'
import { useEffect } from "react";
import WatchlistStockChart from "./WatchlistStockChart";
import { fetchAggStockData } from '../../utils/FetchStockData';
import { useState } from "react";

function WatchlistDetails({ ticker }) {
  const [labels, setLabels] = useState();
  const [prices, setPrices] = useState();

  // fetch stock data from polygon
  useEffect(()=> {
    async function fetchStockData() {
      const data = await fetchAggStockData(ticker, 1, "hour", 0);
      console.log(data)
      setLabels(data.results.map(result => new Date(result.t).toLocaleString()));
      setPrices(data.results.map(result => result.c));
    };
    fetchStockData()
  },[ticker])

  return (
    <div className="watchlist-details-container">
        <NavLink to={`/stocks/${ticker}`} className="watchlist-details-individual-container" key={ticker}>
          <div className="watchlist-details-ticker">{ticker}</div>
          <div className="watchlist-details-chart-container"><WatchlistStockChart labels={labels} prices={prices} /></div>
          {/* <div className="watchlist-details-stock-price-percentage">{stockDoDChange(stock.ticker)}</div> */}
        </NavLink>
    </div>
  )
}
export default WatchlistDetails
