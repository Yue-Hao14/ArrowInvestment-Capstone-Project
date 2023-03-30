import { NavLink } from "react-router-dom";
// import OneDayChart from "../StockPage/AlphaVantageStockCharts/OneDayChart";
import { stockOneDayChange } from "../../utils/FetchStockData";
import './WatchlistDetailsSection.css'
import { useEffect } from "react";
import WatchlistStockChart from "./WatchlistStockChart";

function WatchlistDetails({ watchlist }) {
  const stocksArr = watchlist.stocks
  useEffect(() => {

  })
  // console.log(stocksArr)
  return (
    <div className="watchlist-details-container">
      {stocksArr.map(stock => (
        <NavLink to={`/stocks/${stock.ticker}`} className="watchlist-details-individual-container" key={stock.ticker}>
          <div className="watchlist-details-ticker">{stock.ticker}</div>
          <div className="watchlist-details-chart-container"><WatchlistStockChart ticker={stock.ticker} /></div>
          {/* <div className="watchlist-details-stock-price-percentage">{const data = stockOneDayChange(stock.ticker) return data["DoDPercChange"]}  {stockOneDayChange(stock.ticker)["DoDPercChange"]}</div> */}
        </NavLink>
      ))
      }
    </div>
  )
}
export default WatchlistDetails
