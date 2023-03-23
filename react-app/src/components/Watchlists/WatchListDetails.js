



function WatchlistDetails({ watchlist }) {
  const stocksArr = watchlist.stocks
  console.log(stocksArr)
  return (
    <div className="watchlist-details-container">
      {stocksArr.map(stock => (
        <div className="watchlist-details-ticker">{stock.ticker}</div>
      ))
      }
    </div>
  )
}

export default WatchlistDetails
