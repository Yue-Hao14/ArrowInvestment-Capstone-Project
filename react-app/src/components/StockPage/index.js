import { useParams } from 'react-router-dom'
import OpenModalButton from '../OpenModalButton'
import AddStockToWatchlistModal from './AddStockToWatchlistModal'
import OneDayChart from './OneDayChart'


function StockPage() {
  const { ticker } = useParams()

  return (
    <div className="stock-page-container">
      <h1>Welcome to {ticker} Page</h1>
      <div className='stock-page-line-chart-container'>
        <OneDayChart ticker={ticker} />
      </div>
      <div className="stock-page-right-container">
        <div className='stock-page-right-stock-buy-sell-container'>
          {/* stock buy/sell form goes here */}
        </div>
        <div className="stock-page-right-watchlist-container">
          <OpenModalButton
            modalComponent={<AddStockToWatchlistModal ticker={ticker} />}
            buttonText={
              <div className="stock-page-right-watchlist-button">
                <i className="fa-solid fa-check" />
                Add to Watchlist
              </div>
            }
          />
        </div>
      </div>
    </div>
  )
}

export default StockPage
