import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { NavLink } from "react-router-dom"
import { removeStockFromWatchlistThunk } from "../../store/watchlist"
import { fetchSnapshotsTicker, fetchTickerDetails } from "../../utils/FetchStockData"

function WatchlistDetailsStockRow({ ticker, watchlistId }) {
  const dispatch = useDispatch();
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [today, setToday] = useState();
  const [marketCap, setMarketCap] = useState();

  // fetch ticker details and snapshots/ticker query from polygon
  useEffect(() => {
    async function fetchData() {
      const tickerDetailsData = await fetchTickerDetails(ticker)
      const snapshotsTickerdata = await fetchSnapshotsTicker(ticker)
      setName(tickerDetailsData.results.name)
      let formattedMarketCap;
      const marketCapData = tickerDetailsData.results.market_cap
      // console.log(ticker, marketCapData)
      if (marketCapData) {
        if (marketCapData >= 10 ** 12) {
          formattedMarketCap = (marketCapData / (10 ** 12)).toFixed(2) + "T"
        } else if (marketCapData >= 10 ** 9) {
          formattedMarketCap = (marketCapData / (10 ** 9)).toFixed(2) + "B"
        } else if (marketCapData >= 10 ** 6) {
          formattedMarketCap = (marketCapData / (10 ** 6)).toFixed(2) + "M"
        } else if (marketCapData >= 10 ** 3) {
          formattedMarketCap = (marketCapData / (10 ** 3)).toFixed(2) + "K"
        } else {
          formattedMarketCap = marketCapData.toFixed(2)
        }
      } else {
        formattedMarketCap = "N/A"
      }
      setMarketCap(formattedMarketCap);
      setPrice(snapshotsTickerdata.ticker.min.c);
      setToday(snapshotsTickerdata.ticker.todaysChangePerc.toFixed(2))
    };
    fetchData()
  }, [ticker])


  // function to remove stock from watchlist
  const handleDeleteStockFromWatchlist = async (e, watchlistId, ticker) => {
    e.preventDefault();
    // remove stock from watchlist
    await dispatch(removeStockFromWatchlistThunk(watchlistId, ticker))
  }

  const arrowClassName = "fa-solid" + (today > 0 ? " fa-caret-up green" : " fa-caret-down red")
  return (
    <div className="watchlist-manage-page-stock-container">
      <NavLink
        to={`/stocks/${ticker}`}
        className="watchlist-manage-page-stock-navlink">

        <div className="watchlist-manage-page-table-stock name">{name}</div>
        <div className="watchlist-manage-page-table-stock symbol">{ticker}</div>
        <div className={"watchlist-manage-page-table-stock price"}>{price}</div>
        <div className="watchlist-manage-page-table-stock today">
          <i className={arrowClassName} />
          {today}%
        </div>
        <div className="watchlist-manage-page-table-stock market-cap">{marketCap}</div>
      </NavLink>
      <button
        className="watchlist-manage-page-table-stock-symbol-delete-button"
        key={ticker}
        onClick={e => handleDeleteStockFromWatchlist(e, watchlistId, ticker)}
      >
        <i className="fa-solid fa-xmark"></i>
      </button>
    </div>
  )
}

export default WatchlistDetailsStockRow
