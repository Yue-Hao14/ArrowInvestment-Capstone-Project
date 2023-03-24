import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getAllWatchlistStocksThunk } from "../../store/watchlist"
import './WatchlistDetailsPage.css'

// TO DO: need to add other stock info to each stock in stocksArr
function WatchlistDetailsPage() {
  const dispatch = useDispatch()
  let { watchlistId } = useParams()
  watchlistId = Number(watchlistId)
  const watchlist = useSelector(state => state.watchlists[+watchlistId])
  let stocksArr = useSelector(state => state.watchlists[+watchlistId]?.stocks)
  // console.log(stocksArr[0].ticker)


  // hydrate redux store with watchlists info first
  useEffect(() => {
    dispatch(getAllWatchlistStocksThunk())
  }, [dispatch])

  if (!watchlist) return null

  const handleDeleteStockFromWatchlist = async (e) => {
    e.preventDefualt();

    
  }

  return (
    <div className="watchlist-details-page-container">
      <div className="watchlist-details-page-header-container">
        <div className="watchlist-details-page-header-list-name">
          {watchlist.list_name}
        </div>
        <div className="watchlist-details-page-header-stock-count">
          {watchlist.stocks.length < 2 ? `${watchlist.stocks.length} item` : `${watchlist.stocks.length} items`}
        </div>
      </div>
      <div className="watchlist-details-page-table-container">
        <div className="watchlist-details-page-table-header-container">
          <div className="watchlist-details-page-table-header-name">Name</div>
          <div className="watchlist-details-page-table-header-symbol">Symbol</div>
          <div className="watchlist-details-page-table-header-price">Price</div>
          <div className="watchlist-details-page-table-header-marketCap">Market Cap</div>
        </div>

        <div className="watchlist-details-page-table-details-container">
          {stocksArr?.map(stock => (
            <div className="watchlist-details-page-table-details-stock-container">
              <div className="watchlist-details-page-table-stock-symbol" key={stock.ticker}>
                {stock.ticker}
              </div>
              <button
              className="watchlist-details-page-table-stock-symbol-delete-button"
              key={stock.ticker}
              onClick={e => handleDeleteStockFromWatchlist(e, watchlistId, stock.ticker)}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
          ))
          }
        </div>
      </div>
    </div>
  )
}

export default WatchlistDetailsPage
