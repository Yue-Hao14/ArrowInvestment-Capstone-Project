import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import OpenModalButton from '../OpenModalButton'
import AddStockToWatchlistModal from './AddStockToWatchlistModal'
import './stockPage.css'
import { useDispatch, useSelector } from 'react-redux'
import { getAllTransactionsByTickerThunk } from '../../store/transaction'
import { dbDateToDisplay } from '../../utils/DateFunctions'
import StockBuySell from './StockBuySell'
import StockChart from './StockChart'
import { fetchStockNews, fetchTickerDetails } from '../../utils/FetchStockData'
import StockAbout from './StockAbout'

function StockPage() {
  let { ticker } = useParams();
  ticker = ticker.toUpperCase();
  const dispatch = useDispatch();
  let transactions = useSelector(state => state.transactions.tickerTransactions);
  transactions = Object.values(transactions);

  const [chart, setChart] = useState("1D")
  const [closePrice, setClosePrice] = useState(0)
  const [stockData, setStockData] = useState({})

  // hydrate redux store with tickerTransaction slice
  useEffect(() => {
    dispatch(getAllTransactionsByTickerThunk(ticker));
  }, [dispatch,ticker])

  // function to get latest stock price data from child component (StockChart)
  function getLatestPriceCallBack(latestPrice) {
    setClosePrice(latestPrice)
  }

  // function to calculate transaction cost
  const transactionCost = (price, quantity) => {
    return Math.abs(price * quantity).toFixed(2)
  }


  // if (!stockData["Time Series (Daily)"]) return <div>Loading.....Please refresh in 1 minute</div>

  return (
    <div className="stock-page-container">
      <div className='stock-page-left-container'>
        <div className='stock-page-upper-left-container'>
          <h1>{ticker}</h1>
          <div className='stock-page-line-chart-container'>
            <StockChart getLatestPriceCallBack={getLatestPriceCallBack}/>
          </div>
        </div>
        <div className='stock-page-company-about-container'>
          <StockAbout />
        </div>
        <div className='stock-page-transactions-container'>
          <h2 className='transaction-title'>History</h2>
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
