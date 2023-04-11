import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useModal } from '../../context/Modal'
import { getPortfolioThunk } from '../../store/portfolio';
import { addCashTransfersThunk, getCashTransfers, getCashTransfersThunk } from '../../store/transfer';
import "./TransferPage.css"
import { calculateBuyingPower } from '../../utils/CalculationFunctions';

function AddTransferModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const sessionUserId = useSelector(state => state.session.user.id)
  const portfolioId = useSelector(state => state.portfolios.id)
  const transfersArr = Object.values(useSelector(state => state.transfers))
  const buyingPower = calculateBuyingPower(transfersArr)

  const [type, setType] = useState('deposit');
  let [amount, setAmount] = useState();
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // hydrate redux store as soon as user open modal
  useEffect(() => {
    dispatch(getPortfolioThunk());
    dispatch(getCashTransfersThunk());
  }, [dispatch])

  // error validations
  useEffect(() => {
    let e = {};
    if (amount <= 0) e.emptyAmount = 'Amount must be a positive number.'
    if (type === 'withdraw' && amount > buyingPower) e.notEnoughMoney = 'You cannot withdraw more than current buying power.'
    setErrors(e)
  }, [amount, type])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(errors).length === 0) {
      let formattedAmount = type === "deposit" ? amount : -amount
      const newTransfer = {
        userId: sessionUserId,
        portfolioId,
        type,
        amount: formattedAmount
      }
      console.log(newTransfer)
      const data = await dispatch(addCashTransfersThunk(newTransfer))
      console.log(data)
      if (data) closeModal()
    }

    return
  }

  return (
    <div className='add-transfer-container'>
      <div className='add-transfer-top-container'>
        <h4 className='add-transfer-title'>Transfer Money</h4>
        <button
          type="button"
          onClick={closeModal}
          className="add-stock-to-watchlist-modal-exit-button"
        >
          <i className="fa-solid fa-xmark" />
        </button>
      </div>

      <form className="add-transfer-form" onSubmit={handleSubmit}>
        <div className='add-transfer-type-row'>
          <label className='add-transfer-transfer-type'>Type</label>
          <select onChange={e => setType(e.target.value)}>
            <option value="deposit">Deposit</option>
            <option value="withdraw">Withdraw</option>
          </select>
        </div>

        <div className='add-transfer-amount-row'>
          <div>
          <label>Amount</label>
          <input
            type="number"
            required
            onChange={e => setAmount(Number(e.target.value).toFixed(2))}
          />
          </div>
          {errors.emptyAmount &&
          <div className='add-transfer-amount-error'>{errors.emptyAmount}</div>}
          {errors.notEnoughMoney &&
          <div className='add-transfer-amount-error'>{errors.notEnoughMoney}</div>}
        </div>

        <div className='add-transfer-buying-power-row'>
            Current buying power <span>${buyingPower}</span>
        </div>

        <div className='add-transfer-button-row'>
          <button type="submit" className='add-transfer-transfer-button'>
            Transfer {amount > 0? `$${amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}` : ""}
          </button>
        </div>
      </form>
    </div>

  )
}

export default AddTransferModal
