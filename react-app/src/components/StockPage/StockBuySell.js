import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTransactionThunk } from '../../store/transaction'
import './StockBuySell.css'
import { getPortfolioThunk } from '../../store/portfolio'
import { getCashTransfersThunk } from '../../store/transfer'
import { calculateBuyingPower, calculateExistingShares } from '../../utils/CalculationFunctions'
import { getAllTransactionsThunk } from '../../store/transaction'

function StockBuySell({ closePrice, ticker }) {
  const dispatch = useDispatch();
  const portfolioId = useSelector(state => state.portfolios.id)
  const transfersArr = Object.values(useSelector(state => state.transfers))
  const tickerTransactionsArr = Object.values(useSelector(state => state.transactions.tickerTransactions))
  const allTransactionsArr = Object.values(useSelector(state => state.transactions.allTransactions))

  const [share, setShare] = useState(" ");
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [buySelected, setBuySelected] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)

  // hydrate portfolio, cash transfer, all transactions slice of redux store
  useEffect(() => {
    dispatch(getPortfolioThunk())
    .then(() => dispatch(getAllTransactionsThunk()))
    .then(() => dispatch(getCashTransfersThunk()))
    .then(() => setIsLoaded(true))
    .then(() => setShare("  "))
  }, [dispatch, ticker])

  // calculate buying power and existing shares when page first rendered and when buy/sell transaction completed
  let buyingPower = calculateBuyingPower(transfersArr, allTransactionsArr)
  let existingShares = calculateExistingShares(tickerTransactionsArr)
  useEffect(() => {
    buyingPower = calculateBuyingPower(transfersArr, allTransactionsArr)
    existingShares = calculateExistingShares(tickerTransactionsArr)
  },[hasSubmitted, allTransactionsArr])

  // error handling
  useEffect(() => {
    let e = {}
    console.log(share.length)
    if (share.length === 1 && share <= 0 ) e.invalidShare = 'You must enter a positive number of shares.'
    if (buySelected && (closePrice * share) > Number(buyingPower)) e.notEnoughMoney = "You don't have enough buying power to complete this transaction"
    if (!buySelected && share > existingShares) e.notEnoughStock = "You don't have enough stock to complete this transaction"
    setErrors(e)
  },[share, buySelected, buyingPower, existingShares, closePrice])

  const handleSubmit = async (e) => {
    e.preventDefault();

    // only when there is no error, buy/sell stock can happen
    if (Object.values(errors).length === 0 && share.length !== 2) {
      let type, quantity
      buySelected ? type = 'buy' : type = 'sell'
      buySelected ? quantity=Number(share) : quantity=Number(share)*-1

      // pass info as a request to backend
      const request = {
        ticker,
        portfolioId,
        quantity,
        price: closePrice,
        type
      }
      setHasSubmitted(true)
      setShare(0)
      await dispatch(addTransactionThunk(request))
    }
  }

  return (
    <>
      <div className='stock-buy-sell-container'>
        <div className='stock-buy-sell-toggle'>
          <div className={'buy-div' + (buySelected ? ' active-type' : '')} onClick={() => setBuySelected(true)}>Buy {ticker}</div>
          {existingShares ?
          <div className={'sell-div' + (buySelected ? '' : ' active-type')} onClick={() => setBuySelected(false)}>Sell {ticker}</div>
            : ""
        }
        </div>
        <div className='stock-buy-sell-form-container'>
            {Object.values(errors).length > 0 && Object.values(errors).map(error=>(
              <div className='shares-error-message'>{error}</div>
            ))

            }
          <div className='stock-buy-sell-form-1st-row'>
            <div className='stock-buy-sell-form-order-type-label'>Order Type</div>
            <div className='stock-buy-sell-form-order-type'>{buySelected ? "Buy Market Order" : "Sell Market Order"}</div>
          </div>
          <div className='stock-buy-sell-form-2nd-row'>
            <div className='stock-buy-sell-form-quantity-label'>Shares</div>
            <input className='stock-buy-sell-form-quantity' value={share} required type="number" onChange={e => setShare(e.target.value)} />
          </div>
          <div className='stock-buy-sell-form-3rd-row'>
            <div className='stock-buy-sell-form-price-label'>Price</div>
            <div className='stock-buy-sell-form-price'>${closePrice}</div>
          </div>
          <div className='stock-buy-sell-form-4th-row'>
            <div className='stock-buy-sell-form-estimated-cost-label'>Estimated Cost</div>
            <div className='stock-buy-sell-form-estimated-cost'>${((share? share : 0) * closePrice).toFixed(2)}</div>
          </div>
          <button type='submit' onClick={handleSubmit} className="stock-buy-sell-form-button">
            {buySelected ? "Purchase Stock" : "Sell Stock"}
          </button>
        </div>
        <div className='stock-buy-sell-bottom-container'>
              {buySelected? `$${buyingPower.toLocaleString(undefined, { maximumFractionDigits: 2 })} buying power available` : `${existingShares} shares available`}
        </div>
      </div>
    </>
  )
}

export default StockBuySell
