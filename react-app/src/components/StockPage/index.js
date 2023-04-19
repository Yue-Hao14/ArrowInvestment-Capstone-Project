import { useEffect, useState } from 'react'
import { useParams, Redirect } from 'react-router-dom'
import OpenModalButton from '../OpenModalButton'
import AddStockToWatchlistModal from './AddStockToWatchlistModal'
import './stockPage.css'
import { useDispatch, useSelector } from 'react-redux'
import { getAllTransactionsByTickerThunk } from '../../store/transaction'
import { dbDateToDisplay } from '../../utils/DateFunctions'
import StockBuySell from './StockBuySell'
import StockChart from './StockChart'
import StockAbout from './StockAbout'
import News from '../Dashboard/News'

function StockPage() {
  const sessionUser = useSelector(state => state.session.user)
  let { ticker } = useParams();
  ticker = ticker.toUpperCase();
  const dispatch = useDispatch();
  let transactions = useSelector(state => state.transactions.tickerTransactions);
  transactions = Object.values(transactions);

  const [closePrice, setClosePrice] = useState(0)

  // hydrate redux store with tickerTransaction slice
  useEffect(() => {
    dispatch(getAllTransactionsByTickerThunk(ticker));
  }, [dispatch, ticker])

  // if user has not logged in, back to landing page
  if (!sessionUser) return <Redirect to="/" />;

  // function to get latest stock price data from child component (StockChart)
  function getLatestPriceCallBack(latestPrice) {
    setClosePrice(latestPrice)
  }

  // function to calculate transaction cost
  const transactionCost = (price, quantity) => {
    return Math.abs(price * quantity).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }


  // if (!stockData["Time Series (Daily)"]) return <div>Loading.....Please refresh in 1 minute</div>

  return (
    <div className="stock-page-container">
      <div className='stock-page-left-container'>
        <div className='stock-page-upper-left-container'>
          <h1>{ticker}</h1>

          {/* Stock Line Chart */}
          <div className='stock-page-line-chart-container'>
            <StockChart getLatestPriceCallBack={getLatestPriceCallBack} />
          </div>
        </div>

        {/* Stock about section */}
        <div className='stock-page-company-about-container'>
          <StockAbout />
        </div>

        {/* Stock transactions section */}
        <div className='stock-page-transactions-container'>
          <h2 className='transaction-title'>History</h2>
          {transactions.length > 0 ?
            transactions.map(transaction => (
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
                  <div className='transaction-details-quantity-price'>{`${Math.abs(transaction.quantity)} shares at $${transaction.settled_price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</div>
                </div>
              </div>
            ))
            :
            <div>You do not have transaction on current stock</div>
          }
        </div>

        {/* Stock news section */}
        <div className='stock-page-news-container'>
          <News ticker={ticker} />
        </div>
      </div>

      {/* Stock buy/sell section */}
      <div className="stock-page-right-container">
        <div className='stock-page-right-stock-buy-sell-container'>
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
