import { useDispatch, useSelector } from 'react-redux'
import { getCashTransfersThunk } from '../../store/transfer';
import { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { capitalizeFirstLetter } from '../../utils/StringFunctions';
import { dbDateToDisplay } from '../../utils/DateFunctions'
import OpenModalButton from '../OpenModalButton'
import AddTransferModal from './AddTransferModal';
import "./TransferPage.css"

function TransferPage() {
  const sessionUser = useSelector(state => state.session.user)
  const transfers = Object.values(useSelector(state => state.transfers))

  const dispatch = useDispatch()

  // hydrate redux store with transfers slice
  useEffect(() => {
    dispatch(getCashTransfersThunk());
  }, [dispatch])

  // if user has not logged in, back to landing page
  if (!sessionUser) return <Redirect to="/" />;

  return (
    <div className='transfer-page-container'>
      <div className='transfer-header-container'>
        <h3 className='transfer-header-user'>{capitalizeFirstLetter(sessionUser.first_name)} {capitalizeFirstLetter(sessionUser.last_name)}</h3>
        <OpenModalButton
          modalComponent={<AddTransferModal />}
          buttonText="Start a transfer"
          className="transfer-button"
        />
      </div>
      <div className='transfer-history-container'>
        {transfers.length > 0 &&
          transfers.map(transfer => (
            <div className='individual-transfer-container'>
              <div className='individual-transfer-left container'>
                <div className='individual-transfer-text'>
                  {transfer.type === "deposit" ? `${capitalizeFirstLetter(transfer.type)} to brokerage account` : `${capitalizeFirstLetter(transfer.type)} from brokerage account`}
                </div>
                <div className='individual-transfer-date'>{dbDateToDisplay(transfer.date)}</div>
              </div>
              <div className={transfer.amount >0 ? "individual-transfer-amount green": "individual-transfer-amount red"}>
                {transfer.amount > 0 ? `$${transfer.amount.toFixed(2)}` : `-$${Math.abs(transfer.amount).toFixed(2)}`}
                </div>
            </div>
          ))

        }
      </div>
    </div>
  )
}

export default TransferPage
