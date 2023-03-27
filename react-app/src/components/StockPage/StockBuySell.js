import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'


function StockBuySell({ closePrice, ticker }) {
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(0);
  const [errors, setErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [buySelected, setBuySelected] = useState(true)
  const [estimatedCost, setEstimatedCost] = useState(0)
  


  return (
    <>
    <div>Welcome to stock {ticker} buy/sell component {closePrice}</div>
    <div className='stock-buy/sell-container'>
      <div className='stock-buy/sell-toggle'>
        <div className={'buy-div' + (buySelected ? 'active-type' : '')}>Buy {ticker}</div>
        <div className={'sell-div' + (buySelected ? '' : 'active-type') + }>Sell {ticker}</div>
      </div>

    </div>
    </>
  )
}

export default StockBuySell
