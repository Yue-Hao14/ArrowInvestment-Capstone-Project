import { useSelector } from 'react-redux'
import { calculatePortfolioShareByTicker } from '../../utils/CalculationFunctions'
import WatchlistDetails from '../Watchlists/WatchlistDetailsSection'
import "./PortfolioStock.css"


function PortfolioStock() {
  const allTransactionsArr = Object.values(useSelector(state => state.transactions.allTransactions))
  const transactionsArr = Object.values(allTransactionsArr)

  // calculate # of shares for each stock in the portfolio
  const tickerShareObj = calculatePortfolioShareByTicker(transactionsArr)
  const tickerShareArr = Object.entries(tickerShareObj)

  return (
    <div className='stocks-in-portfolio-container'>
      <div className='stock-in-portfolio-title'>Stocks</div>
      <div className='stock-in-portfolio-stocks-container'>
        {tickerShareArr.map(tickerShare => (
          <WatchlistDetails ticker={tickerShare[0]} shares = {tickerShare[1]}/>
        ))
        }
      </div>
    </div>
  )
}

export default PortfolioStock
