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
  const [latestPrice, setLatestPrice] = useState(0)
  const [priceChange, setPriceChange] = useState(0)


  // fetch stock data from polygon
  useEffect(()=> {
    async function fetchStockData() {
      const data = await fetchAggStockData(ticker, 1, "hour", 0);
      console.log(data)
      setLabels(data.results.map(result => new Date(result.t).toLocaleString()));
      setPrices(data.results.map(result => result.c));
      setLatestPrice(data.results[data.results.length - 1].c) // latest closing price
      const curPrice = data.results[data.results.length - 1].c
      const priorPrice = data.results[data.results.length - 1].o // latest opening price
      console.log(latestPrice, priorPrice)
      setPriceChange((((curPrice - priorPrice) / priorPrice)*100).toFixed(2))
    };
    fetchStockData()
  },[ticker])

  return (
    <div className="watchlist-details-container">
        <NavLink to={`/stocks/${ticker}`} className="watchlist-details-individual-container" key={ticker}>
          <div className="watchlist-details-ticker">{ticker}</div>
          <div className="watchlist-details-chart-container"><WatchlistStockChart labels={labels} prices={prices} /></div>
          <div className="watchlist-details-stock-price-percentage">
            <div className="watchlist-details-stock-price">${latestPrice}</div>
            <div className={"watchlist-details-stock-price-change" + (priceChange >=0 ? " green": " red")}>{priceChange}%</div>
          </div>
        </NavLink>
    </div>
  )
}
export default WatchlistDetails
