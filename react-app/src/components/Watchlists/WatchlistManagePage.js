import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, Redirect } from "react-router-dom"
import { getAllWatchlistStocksThunk } from "../../store/watchlist"
import { removeStockFromWatchlistThunk } from "../../store/watchlist"
import Watchlists from "."
import WatchlistDetailsStockRow from "./WatchlistDetailsStockRow"
import './WatchlistManagePage.css'

// TO DO: need to add other stock info to each stock in stocksArr
function WatchlistManagePage() {
  const sessionUser = useSelector(state => state.session.user)
  const dispatch = useDispatch()
  let { watchlistId } = useParams()
  watchlistId = Number(watchlistId)
  const watchlist = useSelector(state => state.watchlists[+watchlistId])
  let stocksArr = useSelector(state => state.watchlists[+watchlistId]?.stocks)

  // hydrate redux store with watchlists info first
  useEffect(() => {
    dispatch(getAllWatchlistStocksThunk())
  }, [dispatch])

  // if user has not logged in, back to landing page
  if (!sessionUser) return <Redirect to="/" />;
  if (!watchlist) return null

  return (
    <div className="watchlist-manage-page-container">
      <div className="watchlist-manage-page-left-container">
        <div className="watchlist-manage-page-header-container">
          <div className='watchlist-manage-page-light-bulb-icon-container'>
            <img className='watchlist-manage-page-light-bulb-icon'
              src="https://cdn.robinhood.com/emoji/v0/128/1f4a1.png"
            />
          </div>
          <h2 className="watchlist-manage-page-header-list-name">
            {watchlist.list_name}
          </h2>
          <div className="watchlist-manage-page-header-stock-count">
            {watchlist.stocks.length < 2 ? `${watchlist.stocks.length} item` : `${watchlist.stocks.length} items`}
          </div>
        </div>
        <div className="watchlist-manage-page-table-container">
          <div className="watchlist-manage-page-table-header-container">
            <div className="watchlist-manage-page-table-header name">Name</div>
            <div className="watchlist-manage-page-table-header symbol">Symbol</div>
            <div className="watchlist-manage-page-table-header price">Price</div>
            <div className="watchlist-manage-page-table-header today">Today</div>
            <div className="watchlist-manage-page-table-header marketCap">Market Cap</div>
          </div>
          <div className="watchlist-manage-page-table-details-container">
            {stocksArr?.map(stock => (
              <WatchlistDetailsStockRow ticker={stock.ticker} watchlistId={watchlistId} />
            ))
            }
          </div>
        </div>
      </div>
      <div className="watchlist-manage-page-right-container">
        <Watchlists />
      </div>
    </div>
  )
}

export default WatchlistManagePage
