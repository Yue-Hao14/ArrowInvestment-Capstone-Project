import { NavLink } from "react-router-dom";
import './WatchlistDetailsSection.css'

function WatchlistDetails({ watchlist }) {
  const stocksArr = watchlist.stocks
  // console.log(stocksArr)
  return (
    <div className="watchlist-details-container">
      {stocksArr.map(stock => (
        <NavLink
         to={`/stocks/${stock.ticker}`}
         className="watchlist-details-ticker"
         key={stock.ticker}
         >
          {stock.ticker}
         </NavLink>
      ))
      }
    </div>
  )
}
export default WatchlistDetails
