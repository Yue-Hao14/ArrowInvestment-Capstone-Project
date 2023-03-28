import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addTransactionThunk } from '../../store/transaction'
import './StockBuySell.css'

function StockBuySell({ closePrice, ticker }) {
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(0);
  const [errors, setErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [buySelected, setBuySelected] = useState(true)
  const [estimatedCost, setEstimatedCost] = useState(0)

  const handleSubmit = async (e) => {
    e.preventDefault();

    let type
    buySelected ? type='buy' :type='sell'
    buySelected ? setQuantity(quantity) : setQuantity(-Number(quantity))
    // pass info as a request to backend
    const request = {
      ticker,
      portfolioId: 1,
      quantity,
      price: closePrice,
      type
    }
    console.log('request',request)
    setHasSubmitted(true)

    await dispatch(addTransactionThunk(request))
  }

  return (
    <>
    <div className='stock-buy-sell-container'>
      <div className='stock-buy-sell-toggle'>
        <div className={'buy-div' + (buySelected ? ' active-type' : '')} onClick={() => setBuySelected(true)}>Buy {ticker}</div>
        <div className={'sell-div' + (buySelected ? '' : ' active-type')} onClick={() => setBuySelected(false)}>Sell {ticker}</div>
      </div>
      <div className='stock-buy-sell-form-container'>
        <div className='stock-buy-sell-form-1st-row'>
          <div className='stock-buy-sell-form-order-type-label'>Order Type</div>
          <div className='stock-buy-sell-form-order-type'>{buySelected ? "Buy Market Order" : "Sell Market Order"}</div>
        </div>
        <div className='stock-buy-sell-form-2nd-row'>
          <div className='stock-buy-sell-form-quantity-label'>Shares</div>
          <input className='stock-buy-sell-form-quantity' type="number" value={quantity} onChange={e => setQuantity(e.target.value)} />
        </div>
        <div className='stock-buy-sell-form-3rd-row'>
          <div className='stock-buy-sell-form-price-label'>Price</div>
          <div className='stock-buy-sell-form-price'>${closePrice}</div>
        </div>
        <div className='stock-buy-sell-form-4th-row'>
          <div className='stock-buy-sell-form-estimated-cost-label'>Estimated Cost</div>
          <div className='stock-buy-sell-form-estimated-cost'>${(quantity*closePrice).toFixed(2)}</div>
        </div>
        <button type='submit' onClick={handleSubmit} className="stock-buy-sell-form-button">
          {buySelected ? "Purchase Stock" : "Sell Stock"}
        </button>
      </div>
    </div>
    </>
  )
}

export default StockBuySell
