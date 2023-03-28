import { NavLink } from "react-router-dom";
import OneDayChart from "../StockPage/OneDayChart";
import './WatchlistDetailsSection.css'

function WatchlistDetails({ watchlist }) {
  const stocksArr = watchlist.stocks
  // console.log(stocksArr)
  return (
    <div className="watchlist-details-container">
      {stocksArr.map(stock => (
        <NavLink to={`/stocks/${stock.ticker}`} className="watchlist-details-individual-container" key={stock.ticker}>
          <div className="watchlist-details-ticker">{stock.ticker}</div>
          <div className="watchlist-details-chart-container"><OneDayChart ticker={stock.ticker} /></div>
          <div className="watchlist-details-stock-price-percentage">stock price here</div>
         </NavLink>
      ))
      }
    </div>
  )
}
export default WatchlistDetails
