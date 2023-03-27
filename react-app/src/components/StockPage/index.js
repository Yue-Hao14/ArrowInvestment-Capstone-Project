import { useState } from 'react'
import { useParams } from 'react-router-dom'
import OpenModalButton from '../OpenModalButton'
import AddStockToWatchlistModal from './AddStockToWatchlistModal'
import OneDayChart from './OneDayChart'
import OneWeekChart from './OneWeekChart'
import OneMonthChart from './OneMonthChart'
import ThreeMonthChart from './ThreeMonthChart'
import './stockPage.css'


function StockPage() {
  const { ticker } = useParams()
  const [chart, setChart] = useState("1D")

  const chartObj = {
    "1D": <OneDayChart ticker={ticker} />,
    "1W": <OneWeekChart ticker={ticker} />,
    "1M": <OneMonthChart ticker={ticker} />,
    "3M": <ThreeMonthChart ticker={ticker} />,
  }

  return (
    <div className="stock-page-container">
      <div className='stock-page-upper-left-container'>
        <h1>{ticker}</h1>
        <div className='stock-page-line-chart-container'>
          {chartObj[chart]}
        </div>
        <div className='stock-page-line-chart-navbar-container'>
          <button className='stock-page-line-chart-button' onClick={() => setChart("1D")}>1D</button>
          <button className='stock-page-line-chart-button' onClick={() => setChart("1W")}>1W</button>
          <button className='stock-page-line-chart-button' onClick={() => setChart("1M")}>1M</button>
          <button className='stock-page-line-chart-button' onClick={() => setChart("3M")}>3M</button>
        </div>
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
