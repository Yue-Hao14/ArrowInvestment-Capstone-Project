import { useParams } from 'react-router-dom'
import OpenModalButton from '../OpenModalButton'
import AddStockToWatchlistModal from './AddStockToWatchlistModal'
import OneDayChart from './OneDayChart'
import OneWeekChart from './OneWeekChart'


function StockPage() {
  const { ticker } = useParams()

  return (
    <div className="stock-page-container">
      <h1>{ticker}</h1>
      <div className='stock-page-line-chart-container'>
        <OneWeekChart ticker={ticker} />
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
