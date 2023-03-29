import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import OpenModalButton from '../OpenModalButton'
import AddStockToWatchlistModal from './AddStockToWatchlistModal'
import OneDayChart from './OneDayChart'
import OneWeekChart from './OneWeekChart'
import OneMonthChart from './OneMonthChart'
import ThreeMonthChart from './ThreeMonthChart'
import OneYearChart from './OneYearChart'
import FiveYearChart from './FiveYearChart'
import './stockPage.css'
import { useDispatch, useSelector } from 'react-redux'
import { getAllTransactionsByTickerThunk } from '../../store/transaction'
import { dbDateToDisplay } from '../../utils/DateFunctions'
import StockBuySell from './StockBuySell'
import { fetchStockDailyAdjustedData } from '../../utils/FetchStockData'
import { getPortfolioThunk } from '../../store/portfolio'

function StockPage() {
  const { ticker } = useParams();
  const dispatch = useDispatch();
  let transactions = useSelector(state => state.transactions.tickerTransactions);
  transactions = Object.values(transactions);

  const [chart, setChart] = useState("1D")
  const [closePrice, setClosePrice] = useState(0)
  const [stockData, setStockData] = useState({})

  // hydrate redux store with tickerTransaction slice
  useEffect(() => {
    dispatch(getAllTransactionsByTickerThunk(ticker));
    // dispatch(getPortfolioThunk())
  }, [dispatch])

  // get latest closing price from AlphaVantage(daily_adjusted)
  useEffect(() => {
    async function fetchStockData() {
      const data = await fetchStockDailyAdjustedData(ticker.toUpperCase())
      setStockData(data)
      // console.log(data)

      if (data["Note"]) return
      let latestPrice = Object.values(data["Time Series (Daily)"])[0]["4. close"]
      latestPrice = parseFloat(latestPrice).toFixed(2)
      setClosePrice(latestPrice)
    };
    fetchStockData()
  }, [ticker])

  const chartObj = {
    "1D": <OneDayChart ticker={ticker} />,
    "1W": <OneWeekChart ticker={ticker} />,
    "1M": <OneMonthChart ticker={ticker} />,
    "3M": <ThreeMonthChart ticker={ticker} />,
    "1Y": <OneYearChart ticker={ticker} />,
    "5Y": <FiveYearChart ticker={ticker} />,
  }

  // function to calculate transaction cost
  const transactionCost = (price, quantity) => {
    return Math.abs(price * quantity).toFixed(2)
  }


  if (!stockData["Time Series (Daily)"]) return <div>Loading.....Please refresh in 1 minute</div>

  return (
    <div className="stock-page-container">
      <div className='stock-page-left-container'>
        <div className='stock-page-upper-left-container'>
          <h1>{ticker}</h1>
          <div className='stock-page-line-chart-container'>
            {chartObj[chart]}
          </div>
          <div className='stock-page-line-chart-navbar-container'>
            <button className='stock-page-line-chart-button' onClick={() => setChart("1D")}>1D</button>
            <button className='stock-page-line-chart-button' onClick={() => setChart("1W")}>1W</button>
            <button className='stock-page-line-chart-button' onClick={() => setChart("1M")}>1M</button>
            <button className='stock-page-line-chart-button' onClick={() => setChart("1Y")}>1Y</button>
            <button className='stock-page-line-chart-button' onClick={() => setChart("5Y")}>5Y</button>
          </div>
        </div>
        <div className='stock-page-transactions-container'>
          <h2>Transactions</h2>
          {transactions.map(transaction => (
            <div className='transaction-details-container' key={transaction.id}>
              <div className='transaction-details-1st-row'>
                <div className='transaction-details-tikcer-type'>{`${ticker} ${transaction.type}`}</div>
                <div className='transaction-details-cost'>
                  {transaction.type === "buy" ?
                    `$${transactionCost(transaction.settled_price, transaction.quantity)}`
                    : `-$${transactionCost(transaction.settled_price, transaction.quantity)}`}
                </div>
              </div>
              <div className='transaction-details-2nd-row'>
                <div className='transaction-details-date'>{dbDateToDisplay(transaction.date)}</div>
                <div className='transaction-details-quantity-price'>{`${Math.abs(transaction.quantity)} shares at $${transaction.settled_price}`}</div>
              </div>
            </div>
          ))
          }
        </div>
      </div>
      <div className="stock-page-right-container">
        <div className='stock-page-right-stock-buy-sell-container'>
          {/* stock buy/sell form goes here */}
          <StockBuySell closePrice={closePrice} ticker={ticker} />
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
