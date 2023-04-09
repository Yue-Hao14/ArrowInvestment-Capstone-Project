import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useModal } from '../../context/Modal'
import { getPortfolioThunk } from '../../store/portfolio';
import { addCashTransfersThunk } from '../../store/transfer';

function AddTransferModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const sessionUserId = useSelector(state => state.session.user.id)
  const portfolioId = useSelector(state => state.portfolios.id)

  const [type, setType] = useState('deposit');
  let [amount, setAmount] = useState();
  const [errors, setErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // hydrate redux store as soon as user open modal
  useEffect(() => {
    dispatch(getPortfolioThunk());
  }, [dispatch])

  // error validations
  useEffect(() => {
    let e = [];
    if (amount <= 0) e.push('Amount must be a positive number.')
    setErrors(e)
  }, [amount])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (errors.length === 0) {
      const newTransfer = {
        userId: sessionUserId,
        portfolioId,
        type,
        amount
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

      <form onSubmit={handleSubmit}>
        <div className='add-transfer-type-row'>
          <label className='add-transfer-transfer-type'>Type</label>
          <select onChange={e => setType(e.target.value)}>
            <option value="deposit">Deposit</option>
            <option value="withdraw">Withdraw</option>
          </select>
        </div>

        <div className='add-transfer-amount-row'>
          <label>Amount</label>
          <input
            type="number"
            required
            onChange={e => setAmount(Number(e.target.value).toFixed(2))}
          />
          {errors.length > 0 &&
          <div className='add-transfer-amount-error'>{errors[0]}</div>}
        </div>

        <div className='add-transfer-button-row'>
          <button type="submit" className='add-transfer-transfer-button'>
            Transfer {amount > 0? `$${amount}` : ""}
          </button>
        </div>
      </form>
    </div>

  )
}

export default AddTransferModal
