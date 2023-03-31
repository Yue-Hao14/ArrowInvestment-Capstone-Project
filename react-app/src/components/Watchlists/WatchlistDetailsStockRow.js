import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getAllWatchlistStocksThunk } from "../../store/watchlist"
import { removeStockFromWatchlistThunk } from "../../store/watchlist"

function WatchlistDetailsStockRow({ ticker, watchlistId }) {
  const dispatch = useDispatch()
  const handleDeleteStockFromWatchlist = async (e, watchlistId, ticker) => {
    e.preventDefault();

    const data = await dispatch(removeStockFromWatchlistThunk(watchlistId, ticker))

  }

  return (
    <>
      <div className="watchlist-details-page-table-stock-symbol" key={ticker}>
        {ticker}
      </div>
      <button
        className="watchlist-details-page-table-stock-symbol-delete-button"
        key={ticker}
        onClick={e => handleDeleteStockFromWatchlist(e, watchlistId, ticker)}
      >
        <i className="fa-solid fa-xmark"></i>
      </button>
    </>
  )
}

export default WatchlistDetailsStockRow
