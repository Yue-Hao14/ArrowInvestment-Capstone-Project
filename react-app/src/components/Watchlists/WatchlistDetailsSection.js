import { NavLink } from "react-router-dom";
// import OneDayChart from "../StockPage/AlphaVantageStockCharts/OneDayChart";
import { stockDoDChange } from "../../utils/FetchStockData";
import './WatchlistDetailsSection.css'
import { useEffect } from "react";
import WatchlistStockChart from "./WatchlistStockChart";
import { fetchAggStockData, fetchSnapshotsTicker } from '../../utils/FetchStockData';
import { useState } from "react";

function WatchlistDetails({ ticker, shares }) {
  const [labels, setLabels] = useState();
  const [prices, setPrices] = useState();
  const [latestPrice, setLatestPrice] = useState(0)
  const [priceChange, setPriceChange] = useState(0)


  // fetch stock data from polygon
  useEffect(()=> {
    async function fetchStockDataForChart() {
      const data = await fetchAggStockData(ticker, 1, "hour", 0);
      // console.log(data)
      setLabels(data.results.map(result => new Date(result.t).toLocaleString()));
      setPrices(data.results.map(result => result.c));
      setLatestPrice(data.results[data.results.length - 1].c) // latest closing price
    };
    async function fetchSnapshotData() {
      const data = await fetchSnapshotsTicker(ticker);
      setPriceChange(data.ticker.todaysChangePerc.toFixed(2))
    };
    fetchStockDataForChart();
    fetchSnapshotData();
  },[ticker])

  return (
    <div className="watchlist-details-individual-container">
        <NavLink to={`/stocks/${ticker}`} className="watchlist-details-navlink" key={ticker}>
          <div className="watchlist-details-ticker-share-container">
          <div className="watchlist-details-ticker">{ticker}</div>
          {shares &&
          <div className="stock-in-portfolio-shares"> {shares === 1 ? `${shares} share` : `${shares} shares`}</div>
          }
          </div>
          <div className="watchlist-details-chart-container"><WatchlistStockChart labels={labels} prices={prices} priceChange={priceChange} /></div>
          <div className="watchlist-details-stock-price-percentage">
            <div className="watchlist-details-stock-price">${latestPrice.toFixed(2)}</div>
            <div className={"watchlist-details-stock-price-change" + (priceChange >=0 ? " green": " red")}>{priceChange}%</div>
          </div>
        </NavLink>
    </div>
  )
}
export default WatchlistDetails
